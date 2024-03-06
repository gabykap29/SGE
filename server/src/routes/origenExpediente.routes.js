import express from 'express';
const routerOrigenExpediente = express.Router();
import { getOrigenesExpediente,crearOrigenExpediente,eliminarOrigenExpediente } from "../controllers/origenExpediente.controllers.js";

//apis

routerOrigenExpediente.get("/api/origenesExpediente/listar", getOrigenesExpediente);
routerOrigenExpediente.post("/api/origenesExpediente/crear", crearOrigenExpediente);
routerOrigenExpediente.delete("/api/origenesExpediente/eliminar/:id", eliminarOrigenExpediente);


export default routerOrigenExpediente;