import express from 'express';
import { getTipoExpedientes } from '../controllers/tipoExpediente.controllers.js';
import { expedientesCtrl } from '../controllers/expedientes.controllers.js';
const routerExpedientes = express.Router();

routerExpedientes.get('/home', (req, res) => {
    return res.render('home/index',{page: 'home'});
});
routerExpedientes.get('/crearNuevo', (req, res) => {
    return res.render('records/create',{page: 'Nuevo Expediente'});
});


//apis

routerExpedientes.get('/api/tipoExpedientes',getTipoExpedientes);
routerExpedientes.post('/api/expedientes/nuevo',expedientesCtrl.crearExpediente);
export default routerExpedientes;