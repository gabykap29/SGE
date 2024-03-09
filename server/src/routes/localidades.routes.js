import express from "express";
import { crearLocalidad, eliminarLocalidad, getLocalidades } from "../controllers/localidad.controllers.js";
import { isAutenticate } from "../middlewares/isAutenticate.js";
const routerLocalidad = express.Router();

routerLocalidad.get("/api/localidades/:id", isAutenticate, getLocalidades);
routerLocalidad.post("/api/localidades", isAutenticate, crearLocalidad);
routerLocalidad.delete("/api/localidades/:id", isAutenticate, eliminarLocalidad);
export default routerLocalidad;
