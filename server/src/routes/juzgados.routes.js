import express from "express";
import { crearJuzgado, eliminarJuzgado, getJuzgados } from "../controllers/juzgados.controllers.js";
import { isAutenticate } from "../middlewares/isAutenticate.js";
const routerJuzgados = express.Router();

//apis
routerJuzgados.get("/api/juzgados/:id", isAutenticate, getJuzgados);
routerJuzgados.post("/api/juzgados", isAutenticate, crearJuzgado);
routerJuzgados.delete("/api/juzgados/:id", isAutenticate, eliminarJuzgado);
export default routerJuzgados;
