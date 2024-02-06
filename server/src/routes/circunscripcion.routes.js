import express from 'express';
import { getCircuscripciones } from '../controllers/circunscripcion.controllers.js';
const routerCircuns = express.Router();

routerCircuns.get('/api/circunscripciones', getCircuscripciones);

export default routerCircuns;