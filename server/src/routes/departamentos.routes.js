import express from 'express';
import { getDepart } from '../controllers/departamentos.controllers.js';
const routerDepart = express.Router();

routerDepart.get('/api/departamentos', getDepart);

export default routerDepart;