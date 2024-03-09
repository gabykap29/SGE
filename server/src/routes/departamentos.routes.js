import express from "express";
import { crearDepart, eliminarDepart, getDepart } from "../controllers/departamentos.controllers.js";
import { isAutenticate } from "../middlewares/isAutenticate.js";
const routerDepart = express.Router();

routerDepart.get("/api/departamentos", isAutenticate, getDepart);
routerDepart.post("/api/departamentos", isAutenticate, crearDepart);
routerDepart.delete("/api/departamentos/:id", isAutenticate, eliminarDepart);
export default routerDepart;
