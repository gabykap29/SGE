import express from 'express';
import { isAutenticate } from '../middlewares/isAutenticate.js';
const routerTools = express.Router();

routerTools.get('/tools', isAutenticate,(req, res) => {
    res.render('tools/tools',{page:'Ajustes'})
});

export default routerTools;