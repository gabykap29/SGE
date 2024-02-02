import Expediente from "../models/Expediente.js";
import Usuario from "../models/usuarios/Usuarios.js";
import Localidad from "../models/Localidad.js";
import jwt from "jsonwebtoken";
import Circunscripcion from "../models/Circunscripcion.js";
import Juzgado from "../models/Juzgados.js";
import Departamento from "../models/Departamento.js";
import TipoExpediente from "../models/TipoExpediente.js";
export const expedientesCtrl = {};

expedientesCtrl.getExpedientes = async (req, res) => {
  const {page=0, size=10} = req.query;
  try {
    const expedientes = await Expediente.findAll(
      {
        include:[
          {
            model:Localidad,
            as:'localidad',
            attributes:['nombre'],
            include:[{
              model:Departamento,
              as:'departamento',
              attributes:['nombre']
            }]
          },{
            model:Juzgado,
            as:'juzgado',
            attributes:['nombre'],
            include:[{
              model:Circunscripcion,
              as:'circunscripcion',
              attributes:['nombre']
            }],
          },{
            model:TipoExpediente,
            as:'tipo_expediente',
            attributes:['nombre']
          }
        ],
        limit: size,
        offset: page * size,
        order:[['id', 'DESC']]
      });
    if (!expedientes) {
      res.status(404).json({
        message: "No se encontraron expedientes",
      });
    }
    return res.status(200).json({ data: expedientes });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error interno del servidor al obtener expedientes",
    });
  }
};

expedientesCtrl.getExpediente = async (req, res) => {
  const { id } = req.params;
  try {
    const expediente = await Expediente.findOne(
      {
        where: {
          id,
        },
        include:[
          {
            model:Localidad,
            as:'localidad',
            attributes:['nombre'],
            include:[{
              model:Departamento,
              as:'departamento',
              attributes:['nombre']
            }]
          },{
            model:Juzgado,
            as:'juzgado',
            attributes:['nombre'],
            include:[{
              model:Circunscripcion,
              as:'circunscripcion',
              attributes:['nombre']
            }],
          },{
            model:TipoExpediente,
            as:'tipo_expediente',
            attributes:['nombre']
          }
        ]
      }
    );
    if (!expediente) {
      return res.status(404).json({
        message: "No se encontro el expediente",
      });
    };
    return res.status(200).json({ data: expediente });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor al obtener expediente",
    });
  };
};

expedientesCtrl.crearExpediente = async (req, res) => {
  const {
    circunscripcion_id,
    tipo_expediente_id,
    orden,
    localidad_id,
    juzgado_id,
    fecha_inicio,
    fecha_origen,
    resumen,
    estado=3,
    secretario,
  } = req.body;
  const userSession = req.cookies.userSession;
  try {
    const tokenDecode = await jwt.verify(userSession, process.env.SECRET_KEY);
    const { id } = tokenDecode;
    const usuario = await Usuario.findOne({
      where: {
        id,
      },
    });
    const nuevoExpediente = await Expediente.create({
      tipo_expediente_id,
      orden,
      localidad_id,
      circunscripcion_id,
      juzgado_id,
      fecha_inicio,
      fecha_origen,
      resumen,
      estado,
      secretario,
      creador: usuario.id,
    });
    if (nuevoExpediente) {
      return res.status(200).json({
        message: "Expediente creado correctamente",
        data: nuevoExpediente,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor al crear expediente",
    });
  }
};

expedientesCtrl.eliminarExpediente = async (req, res) => {
  const { id } = req.params;
  try {
    const expediente = await Expediente.findByPk(id);

    if (expediente.state === 0) {
      return res.status(404).json({
        message: "No se encontro el expediente",
      });
    }
    await expediente.update({ state: 0 });
    return res.status(201).json({
      message: "Expediente eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor al eliminar expediente",
    });
  }
};

expedientesCtrl.destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const expediente = await Expediente.findByPk(id);
    if (!expediente) {
      return res.status(404).json({
        message: "No se encontro el expediente",
      });
    }
    await expediente.destroy();
    return res.status(201).json({
      message: "Expediente eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor al eliminar expediente",
    });
  };
};
