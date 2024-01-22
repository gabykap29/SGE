import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerAuth from "./server/src/routes/auth.routes.js";
import routerExpedientes from "./server/src/routes/expedientes.routes.js";
import { connectDB } from "./server/src/database/database.js";
import Departamento, { comprobacionesDB } from './server/src/models/Asosiaciones.js'
import routerDepart from "./server/src/routes/departamentos.routes.js";
import routerLocalidad from "./server/src/routes/localidades.routes.js";
import routerCircuns from "./server/src/routes/circunscripcion.routes.js";
import routerJuzgados from "./server/src/routes/juzgados.routes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './server/src/views');
app.use(express.static('./server/src/public'));
app.use(cookieParser())
// routes
app.use(routerAuth);
app.use(routerExpedientes);
app.use(routerDepart);
app.use(routerLocalidad);
app.use(routerCircuns);
app.use(routerJuzgados);
// server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  //comprobaciones de la base de datos
  await connectDB();
  await comprobacionesDB();
  console.log(`http://localhost:${port}/`);
});
