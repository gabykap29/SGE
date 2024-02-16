import express from "express";
import { getDepart } from "../controllers/departamentos.controllers.js";
import { isAutenticate } from "../middlewares/isAutenticate.js";
const routerDepart = express.Router();

routerDepart.get("/api/departamentos", isAutenticate, getDepart);

export default routerDepart;
