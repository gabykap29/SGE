import express from 'express';
import { getCircuscripciones } from '../controllers/circunscripción.controllers.js';
const routerCircuns = express.Router();

routerCircuns.get('/api/circunscripciones', getCircuscripciones);

export default routerCircuns;