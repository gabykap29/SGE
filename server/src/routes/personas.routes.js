import express from "express";
const routerPersonas = express.Router();
import { buscarPersona, crearPersona } from "../controllers/personas.controller.js";





//apis
routerPersonas.post("/api/personas/create", crearPersona);
routerPersonas.get('/api/personas', buscarPersona);
export default routerPersonas;