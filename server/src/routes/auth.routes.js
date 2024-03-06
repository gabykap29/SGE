import express from 'express';
import { login } from '../controllers/auth.controllers.js';
const routerAuth = express.Router();

routerAuth.get('/',(req,res)=>{
    res.render('auth/login',{page: 'login'});
});

//apis
routerAuth.post('/login', login);

routerAuth.get('/logout',(req,res)=>{
    res.clearCookie('userSession');
    return res.status(200).json({
        message:'Sesion cerrada'
    });
});
export default routerAuth;