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
routerExpedientes.get('/expedientes/:id', (req, res) => {
    return res.render('records/show',{page: 'Vista de Expediente', id: req.params.id});
});

//apis

routerExpedientes.get('/api/tipoExpedientes',getTipoExpedientes);
routerExpedientes.get('/api/expedientes',expedientesCtrl.getExpedientes);
routerExpedientes.put('/api/expedientes/secuestros/:id',expedientesCtrl.agregarSecuestros);
routerExpedientes.put('/api/expedientes/observaciones/:id',expedientesCtrl.agregarObservaciones);
routerExpedientes.get('/api/expedientes/:id',expedientesCtrl.getExpediente);
routerExpedientes.post('/api/expedientes/nuevo',expedientesCtrl.crearExpediente);
export default routerExpedientes;