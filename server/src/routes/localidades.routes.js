import express from 'express';
import { getLocalidades } from '../controllers/localidad.controllers.js';
const routerLocalidad = express.Router();

routerLocalidad.get('/api/localidades/:id', getLocalidades);

export default routerLocalidad;