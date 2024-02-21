import express from "express";
const routerPersonas = express.Router();
import { isAutenticate } from "../middlewares/isAutenticate.js";
import {
  buscarPersona,
  crearPersona,
  getPersonaById,
} from "../controllers/personas.controller.js";

routerPersonas.get("/personas/buscar", (req, res) => {
  res.render("person/index", {
    page: "Personas",
  });
});
routerPersonas.get("/personas/ver/:id", isAutenticate,(req, res) => {
  res.render("person/showDetails", {
    id: req.params.id,
    page: "Personas",
  });
});

//apis
routerPersonas.post("/api/personas/create", isAutenticate, crearPersona);
routerPersonas.get("/api/personas", isAutenticate, buscarPersona);
routerPersonas.get("/api/personas/show/:id", isAutenticate, getPersonaById);
export default routerPersonas;
