import express from 'express';
import { getTipoExpedientes } from '../controllers/tipoExpediente.controllers.js';
import { expedientesCtrl } from '../controllers/expedientes.controllers.js';
import { uploadFile } from '../controllers/files.controllers.js';
import  upload from '../utils/multerConfig.js';
const routerExpedientes = express.Router();

routerExpedientes.get('/home', (req, res) => {
    return res.render('home/index',{page: 'home'});
});
routerExpedientes.get('/crearNuevo', (req, res) => {
    return res.render('records/create',{page: 'Nuevo Expediente'});
});
routerExpedientes.get('/expedientes/buscar/:id', (req, res) => {
    return res.render('records/show',{page: 'Vista de Expediente', id: req.params.id});
});
routerExpedientes.get('/expedientes/filtros',(req,res)=>{
    return res.render('records/filters',{page:'filtros'});
});

//apis
routerExpedientes.get('/api/tipoExpedientes',getTipoExpedientes);
routerExpedientes.get('/api/expedientes',expedientesCtrl.getExpedientes);
routerExpedientes.put('/api/expedientes/secuestros/:id',expedientesCtrl.agregarSecuestros);
routerExpedientes.put('/api/expedientes/observaciones/:id',expedientesCtrl.agregarObservaciones);
routerExpedientes.put('/api/expedientes/elevartExpediente/:id',expedientesCtrl.elevarExpediente);
routerExpedientes.get('/api/expedientes/:id',expedientesCtrl.getExpediente);
routerExpedientes.post('/api/expedientes/nuevo',expedientesCtrl.crearExpediente);
routerExpedientes.post('/api/expedientes/upload/:id',upload.single('pdf'),uploadFile);
export default routerExpedientes;