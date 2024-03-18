import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerAuth from "./server/src/routes/auth.routes.js";
import routerExpedientes from "./server/src/routes/expedientes.routes.js";
import { connectDB } from "./server/src/database/database.js";
import { comprobacionesDB } from "./server/src/models/Asosiaciones.js";
import routerDepart from "./server/src/routes/departamentos.routes.js";
import routerLocalidad from "./server/src/routes/localidades.routes.js";
import routerCircuns from "./server/src/routes/circunscripcion.routes.js";
import routerJuzgados from "./server/src/routes/juzgados.routes.js";
import routerPersonas from "./server/src/routes/personas.routes.js";
import routerUsuarios from "./server/src/routes/usuarios.routes.js";
import routerTools from "./server/src/routes/tools.routes.js";
import routerOrigenExpediente from "./server/src/routes/origenExpediente.routes.js";
import routerLogs from "./server/src/routes/logs.routes.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import winston from "winston";
import useragent from "express-useragent";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(useragent.express());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "server", "src", "public")));
app.set("views", path.join(__dirname, "server", "src", "views"));

// Función para obtener el nombre del archivo de registro actualizado
function getCurrentLogFileName() {
  return `log-${getCurrentDate()}.log`;
}

// Función para obtener la ruta del archivo de registro actualizado
function getCurrentLogFilePath() {
  return path.join(__dirname, "server", "src", "logs", getCurrentLogFileName());
}

// Verificar si el archivo de registro actual existe y corresponde a la fecha actual
function checkAndCreateLogFile() {
  const logFilePath = getCurrentLogFilePath();
  if (!fs.existsSync(logFilePath)) {
    const logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: logFilePath,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          ),
        }),
      ],
    });
  }
  return logFilePath;
}

// Middleware para registrar solicitudes HTTP
app.use((req, res, next) => {
  const staticExtensions = [".css", ".js", ".png", ".jpg", ".jpeg", ".gif"];
  const isStaticRequest = staticExtensions.some((ext) => req.url.endsWith(ext));

  if (isStaticRequest) {
    return next("route");
  }

  // Obtener la ruta actualizada del archivo de registro
  const logFilePath = checkAndCreateLogFile();

  // Crear el objeto logger aquí
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: logFilePath,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
    ],
  });

  // Registrar la solicitud si no es para un archivo estático
  logger.info({
    timestamp: new Date(),
    method: req.method,
    url: req.url,
    ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    status: res.statusCode,
    userAgent: req.useragent.source,
    os: req.useragent.os,
  });

  next();
});

app.use(cookieParser());
app.use(routerAuth);
app.use(routerExpedientes);
app.use(routerDepart);
app.use(routerLocalidad);
app.use(routerCircuns);
app.use(routerJuzgados);
app.use(routerPersonas);
app.use(routerUsuarios);
app.use(routerTools);
app.use(routerOrigenExpediente);
app.use(routerLogs);

app.use((req, res) => {
  res.render('error/404');
});

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const port = process.env.PORT || 3000;
const host = "0.0.0.0";

app.listen(port, host, () => {
  connectDB();
  comprobacionesDB();
  console.log(`Server running at http://${host}:${port}/`);
});
