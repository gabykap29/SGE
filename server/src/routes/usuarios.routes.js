import express from 'express';
import {isAutenticate} from '../middlewares/isAutenticate.js'
const routerUsuarios = express.Router();

import crtlUsuarios from '../controllers/usuarios.controllers.js';

routerUsuarios.get('/usuarios/crear',isAutenticate,(req,res)=>{
    res.render('users/create',{page: 'Crear Usuario'});
});
routerUsuarios.get('/usuarios',isAutenticate,(req,res)=>{
    res.render('users/list',{page: 'Listar Usuarios'});
});
routerUsuarios.get('/usuarios/editar/:id',isAutenticate,(req,res)=>{
    res.render('users/edit',{page: 'Editar Usuario', id: req.params.id});
});
//apis
routerUsuarios.post('/usuarios/crear',crtlUsuarios.crearUsuario);
routerUsuarios.get('/api/usuarios/listar',crtlUsuarios.getUsuarios);
routerUsuarios.get('/api/usuarios/:id',crtlUsuarios.getUsuario);
routerUsuarios.put('/api/usuarios/:id',crtlUsuarios.editarUsuario);
routerUsuarios.put('/api/usuarios/bloquear/:id',crtlUsuarios.eliminarUsuario);
routerUsuarios.put('/api/usuarios/desbloquear/:id',crtlUsuarios.desbloquearUsuario);
export default routerUsuarios;