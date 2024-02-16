import express from "express";
import { getTipoExpedientes } from "../controllers/tipoExpediente.controllers.js";
import { expedientesCtrl } from "../controllers/expedientes.controllers.js";
import { uploadFile } from "../controllers/files.controllers.js";
import upload from "../utils/multerConfig.js";
import { isAutenticate } from "../middlewares/isAutenticate.js";
const routerExpedientes = express.Router();

routerExpedientes.get("/home", isAutenticate, (req, res) => {
  return res.render("home/index", { page: "home" });
});
routerExpedientes.get("/crearNuevo", isAutenticate, (req, res) => {
  return res.render("records/create", { page: "Nuevo Expediente" });
});
routerExpedientes.get("/expedientes/buscar/:id", isAutenticate, (req, res) => {
  return res.render("records/show", {
    page: "Vista de Expediente",
    id: req.params.id,
  });
});
routerExpedientes.get("/expedientes/filtros", isAutenticate, (req, res) => {
  return res.render("records/filters", { page: "filtros" });
});

//apis
routerExpedientes.get(
  "/api/tipoExpedientes",
  isAutenticate,
  getTipoExpedientes
);
routerExpedientes.get(
  "/api/expedientes",
  isAutenticate,
  expedientesCtrl.getExpedientes
);
routerExpedientes.put(
  "/api/expedientes/secuestros/:id",
  isAutenticate,
  expedientesCtrl.agregarSecuestros
);
routerExpedientes.put(
  "/api/expedientes/observaciones/:id",
  isAutenticate,
  expedientesCtrl.agregarObservaciones
);
routerExpedientes.put(
  "/api/expedientes/elevartExpediente/:id",
  isAutenticate,
  expedientesCtrl.elevarExpediente
);
routerExpedientes.get(
  "/api/expedientes/:id",
  isAutenticate,
  expedientesCtrl.getExpediente
);
routerExpedientes.post(
  "/api/expedientes/nuevo",
  isAutenticate,
  expedientesCtrl.crearExpediente
);
routerExpedientes.post(
  "/api/expedientes/upload/:id",
  isAutenticate,
  upload.single("pdf"),
  uploadFile
);
export default routerExpedientes;
