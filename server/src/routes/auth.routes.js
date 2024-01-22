import express from 'express';
import { login } from '../controllers/auth.controllers.js';
const routerAuth = express.Router();
let page;
routerAuth.get('/',(req,res)=>{
    res.render('auth/login',{page: 'login'});
});

//apis
routerAuth.post('/login', login);
export default routerAuth;