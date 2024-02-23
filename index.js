import express from "express";
import morgan from "morgan";
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
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'server', 'src', 'public')));
app.set('views', path.join(__dirname,'server', 'src', 'views'));

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
// server
const port = process.env.PORT || 3000;
const host = '0.0.0.0'; // Escucha en todas las interfaces de red

app.listen(port, host, () => {
  //comprobaciones de la base de datos
  connectDB();
  comprobacionesDB();
  console.log(`Server running at http://${host}:${port}/`);
});
