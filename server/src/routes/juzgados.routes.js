import express from "express";
import { getJuzgados } from "../controllers/juzgados.controllers.js";
import { isAutenticate } from "../middlewares/isAutenticate.js";
const routerJuzgados = express.Router();

//apis
routerJuzgados.get("/api/juzgados/:id", isAutenticate, getJuzgados);

export default routerJuzgados;
