import express from 'express';
const routerOrigenExpediente = express.Router();
import { getOrigenesExpediente,crearOrigenExpediente,eliminarOrigenExpediente } from "../controllers/origenExpediente.controllers.js";
import { isAutenticate } from '../middlewares/isAutenticate.js';

//apis

routerOrigenExpediente.get("/api/origenesExpediente/listar",isAutenticate, getOrigenesExpediente);
routerOrigenExpediente.post("/api/origenesExpediente",isAutenticate, crearOrigenExpediente);
routerOrigenExpediente.delete("/api/origenesExpediente/:id",isAutenticate, eliminarOrigenExpediente);


export default routerOrigenExpediente;