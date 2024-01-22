import express from 'express';
import { getJuzgados } from '../controllers/juzgados.controllers.js';
const routerJuzgados = express.Router();



//apis
routerJuzgados.get('/api/juzgados/:id', getJuzgados);

export default routerJuzgados;