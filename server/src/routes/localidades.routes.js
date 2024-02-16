import express from "express";
import { getLocalidades } from "../controllers/localidad.controllers.js";
import { isAutenticate } from "../middlewares/isAutenticate.js";
const routerLocalidad = express.Router();

routerLocalidad.get("/api/localidades/:id", isAutenticate, getLocalidades);

export default routerLocalidad;
