import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerAuth from "./server/src/routes/auth.routes.js";
import routerExpedientes from "./server/src/routes/expedientes.routes.js";
import { connectDB } from "./server/src/database/database.js";
import { comprobacionesDB } from './server/src/models/Asosiaciones.js'
import routerDepart from "./server/src/routes/departamentos.routes.js";
import routerLocalidad from "./server/src/routes/localidades.routes.js";
import routerCircuns from "./server/src/routes/circunscripcion.routes.js";
import routerJuzgados from "./server/src/routes/juzgados.routes.js";
import routerPersonas from "./server/src/routes/personas.routes.js";
import routerUsuarios from "./server/src/routes/usuarios.routes.js";
import routerTools from "./server/src/routes/tools.routes.js";
import routerOrigenExpediente from "./server/src/routes/origenExpediente.routes.js";
import routerLogs from "./server/src/routes/logs.routes.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken';
import winston from 'winston';
import expressWinston from 'express-winston';
import useragent from 'express-useragent';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(useragent.express()); 
// Middleware para registrar solicitudes HTTP
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'server', 'src', 'public')));
app.set('views', path.join(__dirname,'server', 'src', 'views'));

// Directorio donde se guardarán los archivos de registro
const logsDir = path.join(__dirname, 'server', 'src', 'logs');

// Verificar si la carpeta logs existe, si no, crearla
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
};

const logFileName =  `log-${getCurrentDate()}.log`;
const logFilePath =  path.join(__dirname, 'server', 'src', 'logs', logFileName);

// Crear el objeto logger aquí
const logger = winston.createLogger({
  level: 'info',
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
      )
    })
  ]
});

// Middleware para registrar solicitudes HTTP
app.use((req, res, next) => {
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif']; 
  const isStaticRequest = staticExtensions.some(ext => req.url.endsWith(ext));
  
  // Verificar si la solicitud es para un archivo estático
  if (isStaticRequest) {
    return next('route');
  }

  // Registrar la solicitud si no es para un archivo estático
  logger.info({
    timestamp: new Date(),
    method: req.method,
    url: req.url,
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    status: res.statusCode,
    userAgent: req.useragent.source,
    os: req.useragent.os
  });

  next();
});

// Middleware de registro de solicitudes HTTP con Express Winston
app.use(expressWinston.logger({ 
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: logFilePath })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) { return false; }
}));





app.use(cookieParser())
// routes
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
  res.status(404).json({ message: "Not found" });
});

// Función para obtener la fecha actual en formato 'YYYY-MM-DD'
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// server
const port = process.env.PORT || 3000;
const host = '0.0.0.0'; // Escucha en todas las interfaces de red

app.listen(port, host, () => {
  //comprobaciones de la base de datos
  connectDB();
  comprobacionesDB();
  console.log(`Server running at http://${host}:${port}/`);
});
