import express from "express";
import { crearCircunscripcion, eliminarCircunscripcion, getCircuscripciones } from "../controllers/circunscripcion.controllers.js";
import { isAutenticate } from "../middlewares/isAutenticate.js";
const routerCircuns = express.Router();

routerCircuns.get("/api/circunscripciones", isAutenticate, getCircuscripciones);
routerCircuns.post("/api/circunscripciones", isAutenticate, crearCircunscripcion);
routerCircuns.delete("/api/circunscripciones/:id", isAutenticate, eliminarCircunscripcion);
export default routerCircuns;
