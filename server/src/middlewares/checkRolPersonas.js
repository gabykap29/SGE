import jwt from "jsonwebtoken";
import Usuario from "../models/usuarios/Usuarios.js";
import Permisos from "../models/usuarios/Permisos.js";
import Rol from "../models/usuarios/Roles.js";

export const permisoCrearPersona = async (req, res, next) => {
  const token = req.cookies.userSession;
  if (!token) {
    return res.redirect("/login");
  }

  const { id } = jwt.verify(token, process.env.SECRET_KEY);
  const usuario = await Usuario.findOne({
    where: { id },
    include: {
      model: Rol,
      attributes: ["nombre"],
      as: "rol",
      include: {
        model: Permisos,
        through: "permisos_roles",
        as: "permisos",
        attributes: ["nombre"],
      },
    },
  });
  const permisos = usuario.rol.permisos.map((permiso) => permiso.nombre);
  if (permisos.includes("Crear Persona")) {
    next();
  } else {
    return res.redirect("/home");
  }
};

export const permisoVerPersonas = async (req, res, next) => {
  const token = req.cookies.userSession;
  if (!token) {
    return res.redirect("/login");
  }
  const { id } = jwt.verify(token, process.env.SECRET_KEY);
  const usuario = await Usuario.findOne({
    where: {
      id,
    },
    include: {
      model: Rol,
      attributes: ["nombre"],
      as: "rol",
      include: {
        model: Permisos,
        through: "permisos_roles",
        as: "permisos",
        attributes: ["nombre"],
      },
    },
  });
  const permisos = usuario.rol.permisos.map((permiso) => permiso.nombre);
  if (permisos.includes("Ver Persona")) {
    next();
  } else {
    return res.redirect("/home");
  }
};

