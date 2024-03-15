import router from 'express';
import { isAutenticate } from '../middlewares/isAutenticate.js';
import { LeerLogsPorFecha } from '../controllers/logs.controllers.js';
const routerLogs = router.Router();


routerLogs.get("/logs", isAutenticate, (req, res) => {
    res.render("tools/logs", { page: "Logs" });
});


//apis
routerLogs.get("/api/logs/:fecha", isAutenticate, LeerLogsPorFecha);

export default routerLogs;