import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarios/Usuarios.js';
import Permisos from '../models/usuarios/Permisos.js';
import Rol from '../models/usuarios/Roles.js';
const permisoCrearExpediente = async (req, res, next) => {
    const token = req.cookies.userSession;
    if (!token) {
        return res.redirect("/login");
    };

    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const usuario = await Usuario.findOne({ where: { id },
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
    if (permisos.includes("Crear Expediente")) {
        next();
    } else {
        return res.redirect("/home");
    };
};

export const permisoEditarExpediente = async (req,res,next)=>{
    const token = req.cookies.userSession;
    if (!token) {
        return res.redirect("/login");
    };
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const usuario = await Usuario.findOne({
        where:{
            id,
        },
        include:{
            model:Rol,
            attributes:['nombre'],
            as:'rol',
            include:{
                model: Permisos,
                through: "permisos_roles",
                as: "permisos",
                attributes: ["nombre"],
            }
        }
    });
    const permisos = usuario.rol.permisos.map((permiso) => permiso.nombre);
    if (permisos.includes("Editar Expediente")) {
        next();
    } else {
        return res.redirect("/home");
    };
};

export const permisoVerExpediente = async (req,res,next)=>{
    const token = req.cookies.userSession;
    if (!token) {
        return res.redirect("/login");
    };
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const usuario = await Usuario.findOne({
        where:{
            id,
        },
        include:{
            model:Rol,
            attributes:['nombre'],
            as:'rol',
            include:{
                model: Permisos,
                through: "permisos_roles",
                as: "permisos",
                attributes: ["nombre"],
            }
        }
    });
    const permisos = usuario.rol.permisos.map((permiso) => permiso.nombre);
    if (permisos.includes("Ver Expediente")) {
        next();
    } else {
        return res.redirect("/home");
    };
};



export default permisoCrearExpediente;


