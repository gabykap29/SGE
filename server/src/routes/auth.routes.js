import express from 'express';
import { login } from '../controllers/auth.controllers.js';
const router = express.Router();
let page;
router.get('/',(req,res)=>{
    res.render('auth/login',{page: 'login'});
});

//apis
router.post('/login', login);
export default router;