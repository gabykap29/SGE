import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import router from "./server/src/routes/auth.routes.js";
import { connectDB } from "./server/src/database/database.js";
import Departamento, { comprobacionesDB } from './server/src/models/Asosiaciones.js'

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configurar Content-Security-Policy
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' https://cdn.jsdelivr.net"
  );
  next();
});
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './server/src/views');
app.use(express.static('./server/src/public'));
// routes

app.use(router);

// server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await connectDB();
  await comprobacionesDB();
  console.log(`http://localhost:${port}/`);
});
