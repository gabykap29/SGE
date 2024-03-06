import express from "express";
import { isAutenticate } from "../middlewares/isAutenticate.js";
const routerUsuarios = express.Router();

import crtlUsuarios from "../controllers/usuarios.controllers.js";
import { bloquearDesbloquearUsuarios, permisoUsuarios, verUsuarios } from "../middlewares/checkRolUsuarios.js";

routerUsuarios.get("/usuarios/crear", isAutenticate,permisoUsuarios, (req, res) => {
  res.render("users/create", { page: "Crear Usuario" });
});
routerUsuarios.get("/usuarios", isAutenticate,verUsuarios,(req, res) => {
  res.render("users/list", { page: "Listar Usuarios" });
});
routerUsuarios.get("/usuarios/editar/:id", isAutenticate, permisoUsuarios,(req, res) => {
  res.render("users/edit", { page: "Editar Usuario", id: req.params.id });
});
//apis
routerUsuarios.post("/usuarios/crear", isAutenticate,permisoUsuarios,crtlUsuarios.crearUsuario);
routerUsuarios.get("/api/usuarios/listar", isAutenticate,verUsuarios,crtlUsuarios.getUsuarios);
routerUsuarios.get("/api/usuarios/:id", isAutenticate,permisoUsuarios,crtlUsuarios.getUsuario);
routerUsuarios.put("/api/usuarios/:id", isAutenticate,permisoUsuarios,crtlUsuarios.editarUsuario);
routerUsuarios.put("/api/usuarios/bloquear/:id", isAutenticate,bloquearDesbloquearUsuarios,crtlUsuarios.eliminarUsuario);
routerUsuarios.put(
  "/api/usuarios/desbloquear/:id",isAutenticate,bloquearDesbloquearUsuarios,
  crtlUsuarios.desbloquearUsuario
);
routerUsuarios.get("/api/usuarios/roles", isAutenticate,crtlUsuarios.getRoles);
export default routerUsuarios;
