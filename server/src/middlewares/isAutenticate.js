import Usuario from "../models/usuarios/Usuarios.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

export const isAutenticate = async (req, res, next) => {
  if (req.cookies.userSession) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.userSession,
        process.env.SECRET_KEY
      );
      const usuario = await Usuario.findOne({ where: { id: decodificada.id } });
      if (!usuario) {
        return next();
      }
      req.usuario = usuario;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "No autorizado" });
    }
  } else {
    res.redirect("/");
  }
};
