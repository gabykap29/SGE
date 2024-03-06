import Usuario from "../models/usuarios/Usuarios.js";
import bcrypt from "bcryptjs";
import Permisos from "../models/usuarios/Permisos.js";
import Rol from "../models/usuarios/Roles.js";
const crtlUsuarios = {};

crtlUsuarios.crearUsuario = async (req, res) => {
  const { username, password, role, firstname, lastname } = req.body;
  console.log(req.body);
  try {
    const usuario = await Usuario.findOne({
      where: {
        username,
      },
    });
    if (usuario) {
      return res.status(400).json({
        message: "El usuario ya existe!",
      });
    }
    const fechaActual = new Date();
    // Ajustar la zona horaria a UTC -3
    fechaActual.setUTCHours(fechaActual.getUTCHours() - 3);
    // Utilizar la fecha ajustada
    const fechaCreacion = fechaActual;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const nuevoUsuario = Usuario.create({
      username,
      password: passwordHash,
      rol_id: role,
      nombre:firstname,
      apellido:lastname,
      fechaCreacion: fechaCreacion,

    });

    if (!nuevoUsuario) {
      return res.status(400).json({
        message: "Error al crear el usuario!",
      });
    }
    return res.status(200).json({
      message: "Usuario creado con éxito!",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor al crear el usuario!" });
  }
};

crtlUsuarios.editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { username, password, rol_id, nombre, apellido } = req.body;
  console.log(req.body);
  try {
    const usuario = await Usuario.findOne({
      where: {
        id,
      },
    });
    if (!usuario) {
      return res.status(400).json({
        message: "El usuario no existe!",
      });
    }
    const fechaActual = new Date();
    // Ajustar la zona horaria a UTC -3
    fechaActual.setUTCHours(fechaActual.getUTCHours() - 3);
    // Utilizar la fecha ajustada
    const fechaModificacion = fechaActual;

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const usuarioEditado = await Usuario.update(
      {
        username,
        password: passwordHash,
        rol_id,
        nombre,
        apellido,
        fechaModificacion: fechaModificacion,
      },
      {
        where: {
          id,
        },
      }
    );
    if (!usuarioEditado) {
      return res.status(400).json({
        message: "Error al editar el usuario!",
      });
    }
    return res.status(200).json({
      message: "Usuario editado con éxito!",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor al editar el usuario!" });
  }
};

crtlUsuarios.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes:["id","username","rol_id","nombre","apellido","fechaCreacion","fechaModificacion","estado"],
      order: [["id", "ASC"]],
    });
    if (!usuarios) {
      return res.status(400).json({
        message: "No se encontraron usuarios!",
      });
    }
    return res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor al obtener los usuarios!" });
  }
};

crtlUsuarios.getUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findOne({
      where: {
        id,
      },
      attributes:["id","username","rol_id","nombre","apellido","fechaCreacion","fechaModificacion","estado"]
    });
    if (!usuario) {
      return res.status(400).json({
        message: "El usuario no existe!",
      });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor al obtener el usuario!" });
  }
};

crtlUsuarios.eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findOne({
      where: {
        id,
      },
    });
    if (!usuario) {
      return res.status(400).json({
        message: "El usuario no existe!",
      });
    }

    const fechaActual = new Date();

    // Ajustar la zona horaria a UTC -3
    fechaActual.setUTCHours(fechaActual.getUTCHours() - 3);

    // Utilizar la fecha ajustada
    const fechaModificacion = fechaActual;

    const usuarioEliminado = await Usuario.update(
      { estado: false, fechaModificacion: fechaModificacion },
      {
        where: {
          id: id
        }
      }
    );
    
    if (!usuarioEliminado) {
      return res.status(400).json({
        message: "Error al eliminar el usuario!",
      });
    }
    return res.status(200).json({
      message: "Usuario bloqueado con éxito!",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor al eliminar el usuario!" });
  }
};

crtlUsuarios.desbloquearUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findOne({
      where: {
        id,
      },
    });
    if (!usuario) {
      return res.status(400).json({
        message: "El usuario no existe!",
      });
    };
    
    if(usuario.estado === true){
      return res.status(400).json({
        message: "El usuario ya se encuentra desbloqueado!",
      });
    };

    const fechaActual = new Date();

    // Ajustar la zona horaria a UTC -3
    fechaActual.setUTCHours(fechaActual.getUTCHours() - 3);

    // Utilizar la fecha ajustada
    const fechaModificacion = fechaActual;

    const usuarioEliminado = await Usuario.update(
      { estado: true, fechaModificacion: fechaModificacion },
      {
        where: {
          id: id
        }
      }
    );
    
    if (!usuarioEliminado) {
      return res.status(400).json({
        message: "Error al desbloquear el usuario!",
      });
    }
    return res.status(200).json({
      message: "Usuario desbloqueado con éxito!",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor al desbloquear el usuario!" });
  }
};

crtlUsuarios.getRoles = async(req,res)=>{
  const id = req.params.id;
  try {
    const usuario = await Usuario.findOne({
      where: {
        id,
      },
      include:{
        model: Rol,
        attributes:['nombre'],
        include:{
          model:Permisos,
          throw: "permisos_roles",
          as: "permisos",
        },
      },
    });
    if (!usuario) {
      return res.status(400).json({
        message: "El usuario no existe!",
      });
    };

    const permisos = usuario.rol.permisos.map((permiso) => permiso.nombre);
    return res.status(200).json(permisos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor al obtener los roles!" });
  };
};


export default crtlUsuarios;