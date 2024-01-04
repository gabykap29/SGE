import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import router from "./server/src/routes/router.js";
import { connectDB } from "./server/src/database/database.js";
import Departamento from './server/src/models/Asosiaciones.js'

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// routes

app.use(router);

// server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await connectDB();
  console.log(`http://localhost:${port}/`);
});
