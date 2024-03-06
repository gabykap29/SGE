import express from "express";
const routerPersonas = express.Router();
import { isAutenticate } from "../middlewares/isAutenticate.js";
import {
  buscarPersona,
  crearPersona,
  getPersonaById,
} from "../controllers/personas.controller.js";
import {
  validatePerson,
  validationsPersons,
} from "../models/schemas/personas.schema.js";
import {
  permisoCrearPersona,
  permisoVerPersonas,
} from "../middlewares/checkRolPersonas.js";

routerPersonas.get(
  "/personas/buscar",
  isAutenticate,
  permisoVerPersonas,
  (req, res) => {
    res.render("person/index", {
      page: "Personas",
    });
  }
);
routerPersonas.get(
  "/personas/ver/:id",
  isAutenticate,
  permisoVerPersonas,
  (req, res) => {
    res.render("person/showDetails", {
      id: req.params.id,
      page: "Personas",
    });
  }
);

//apis
routerPersonas.post(
  "/api/personas/create",
  isAutenticate,
  permisoCrearPersona,
  validationsPersons,
  validatePerson,
  crearPersona
);
routerPersonas.get(
  "/api/personas",
  isAutenticate,
  permisoVerPersonas,
  buscarPersona
);
routerPersonas.get(
  "/api/personas/show/:id",
  isAutenticate,
  permisoVerPersonas,
  getPersonaById
);
export default routerPersonas;
