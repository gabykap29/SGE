import express from "express";
import { getCircuscripciones } from "../controllers/circunscripcion.controllers.js";
import { isAutenticate } from "../middlewares/isAutenticate.js";
const routerCircuns = express.Router();

routerCircuns.get("/api/circunscripciones", isAutenticate, getCircuscripciones);

export default routerCircuns;
