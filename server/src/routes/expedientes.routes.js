import express from "express";
import { getTipoExpedientes } from "../controllers/tipoExpediente.controllers.js";
import verificarExpedientesVencidos, {
  expedientesCtrl,
} from "../controllers/expedientes.controllers.js";
import { uploadFile } from "../controllers/files.controllers.js";
import upload from "../utils/multerConfig.js";
import { isAutenticate } from "../middlewares/isAutenticate.js";
import {
  validateRecord,
  validationsRecords,
} from "../models/schemas/expediente.schema.js";
import permisoCrearExpediente, {
  permisoEditarExpediente, permisoVerExpediente,
} from "../middlewares/checkRolExpediente.js";
const routerExpedientes = express.Router();

routerExpedientes.get("/home", isAutenticate, (req, res) => {
  return res.render("home/index", { page: "Home" });
});
routerExpedientes.get(
  "/crearNuevo",
  isAutenticate,
  permisoCrearExpediente,
  (req, res) => {
    return res.render("records/create", { page: "Nuevo Expediente" });
  }
);
routerExpedientes.get("/expedientes/buscar/:id", isAutenticate, permisoVerExpediente,(req, res) => {
  return res.render("records/show", {
    page: "Vista de Expediente",
    id: req.params.id,
  });
});
routerExpedientes.get("/expedientes/filtros", isAutenticate, permisoVerExpediente,(req, res) => {
  return res.render("records/filters", { page: "filtros" });
});
routerExpedientes.get(
  "/expedientes/editar/:id",
  isAutenticate,
  permisoEditarExpediente,
  (req, res) => {
    res.render("records/edit", {
      page: "Editar Expediente",
      id: req.params.id,
    });
  }
);
//apis
routerExpedientes.get(
  "/api/tipoExpedientes",
  isAutenticate,
  permisoVerExpediente,
  getTipoExpedientes
);
routerExpedientes.get(
  "/api/expedientes",
  verificarExpedientesVencidos,
  isAutenticate,
  permisoVerExpediente,
  expedientesCtrl.getExpedientes
);
routerExpedientes.put(
  "/api/expedientes/secuestros/:id",
  isAutenticate,permisoEditarExpediente,
  expedientesCtrl.agregarSecuestros
);
routerExpedientes.put(
  "/api/expedientes/observaciones/:id",
  isAutenticate,permisoEditarExpediente,
  expedientesCtrl.agregarObservaciones
);
routerExpedientes.put(
  "/api/expedientes/elevartExpediente/:id",
  isAutenticate,permisoEditarExpediente,
  expedientesCtrl.elevarExpediente
);
routerExpedientes.get(
  "/api/expedientes/:id",
  verificarExpedientesVencidos,
  isAutenticate,
  permisoVerExpediente,
  expedientesCtrl.getExpediente
);
routerExpedientes.post(
  "/api/expedientes/nuevo",
  isAutenticate,permisoCrearExpediente,
  validationsRecords,
  validateRecord,
  expedientesCtrl.crearExpediente
);
routerExpedientes.post(
  "/api/expedientes/upload/:id",
  isAutenticate,
  upload.single("pdf"),
  uploadFile
);
routerExpedientes.get("/api/countEstado",isAutenticate, expedientesCtrl.getCountExpedientes);
routerExpedientes.get("/api/countVencimiento",isAutenticate,verificarExpedientesVencidos);
routerExpedientes.put(
  "/api/editar/expediente/:id",
  isAutenticate,
  permisoEditarExpediente,
  validationsRecords,
  validateRecord,
  expedientesCtrl.editarExpediente
);
export default routerExpedientes;
