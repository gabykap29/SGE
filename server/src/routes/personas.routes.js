import express from "express";
const routerPersonas = express.Router();
import { isAutenticate } from "../middlewares/isAutenticate.js";
import {
  buscarPersona,
  crearPersona,
} from "../controllers/personas.controller.js";

//apis
routerPersonas.post("/api/personas/create", isAutenticate, crearPersona);
routerPersonas.get("/api/personas", isAutenticate, buscarPersona);
export default routerPersonas;
