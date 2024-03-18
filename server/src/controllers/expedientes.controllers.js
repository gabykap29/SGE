import Expediente from "../models/Expediente.js";
import Usuario from "../models/usuarios/Usuarios.js";
import Localidad from "../models/Localidad.js";
import jwt from "jsonwebtoken";
import Circunscripcion from "../models/Circunscripcion.js";
import Juzgado from "../models/Juzgados.js";
import Departamento from "../models/Departamento.js";
import TipoExpediente from "../models/TipoExpediente.js";
import ExpedientePersona from "../models/ExpedientePersona.js";
import Persona from "../models/Personas.js";
import OrigenExpediente from "../models/OrigenExpediente.js";
import File from "../models/Files.js";
export const expedientesCtrl = {};
import sequelize from 'sequelize';
import {Op} from 'sequelize';

expedientesCtrl.getExpedientes = async (req, res) => {
  const {
    page = 0,
    size = 10,
    orden,
    localidad ,
    juzgado ,
    fechaInicio ,
    fechaFin ,
    estado ,
    origenExpediente ,
    palabrasClave ,
  } = req.query;
  try {
    const filtros = {};
    if (orden !== undefined && orden !== "") {
      filtros.orden = orden;
    };
    if (localidad !== undefined && localidad !== "") {
      filtros.localidad_id = localidad;
    };
    if (juzgado !== undefined && juzgado !== "") {
      filtros.juzgado_id = juzgado;
    };
    if (fechaInicio !== undefined && fechaFin !== undefined && fechaInicio !== "" && fechaFin !== "") {
      filtros.fecha_inicio = {
        [Op.between]: [fechaInicio, fechaFin],
      };
    };
    if (estado !== undefined && estado !== "") {
      filtros.estado = estado;
    };
    if (origenExpediente !== undefined && origenExpediente !== "") {
      filtros.origen_expediente_id = origenExpediente;  
    };
    if (palabrasClave !== undefined && palabrasClave !== "") {
      filtros.resumen = {
        [Op.like]: `%${palabrasClave}%`,
      };
    };
    console.log('Filtros:', filtros);

    const expedientes = await Expediente.findAll({
      where:{...filtros},
      
      include: [
        {
          model: Localidad,
          as: "localidad",
          attributes: ["nombre"],
          include: [
            {
              model: Departamento,
              as: "departamento",
              attributes: ["nombre"],
            },
          ],
        },
        {
          model: Juzgado,
          as: "juzgado",
          attributes: ["nombre"],
          include: [
            {
              model: Circunscripcion,
              as: "circunscripcion",
              attributes: ["nombre"],
            },
          ],
        },
        {
          model: TipoExpediente,
          as: "tipo_expediente",
          attributes: ["nombre"],
        },
      ],
      limit: size,
      offset: page * size,
      order: [["id", "DESC"]],
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
    const expediente = await Expediente.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Localidad,
          as: "localidad",
          attributes: ["nombre"],
          include: [
            {
              model: Departamento,
              as: "departamento",
              attributes: ["nombre"],
            },
          ],
        },
        {
          model: Juzgado,
          as: "juzgado",
          attributes: ["nombre"],
          include: [
            {
              model: Circunscripcion,
              as: "circunscripcion",
              attributes: ["nombre"],
            },
          ],
        },
        {
          model: TipoExpediente,
          as: "tipo_expediente",
          attributes: ["nombre"],
        },
        {
          model: Persona,
          as: "personasEnExpediente",
          through: ExpedientePersona,
        },
        {
          model: OrigenExpediente,
          as: "origen_expediente",
          attributes: ["nombre"],
        },
        {
          model: File,
          as: "files",
        },
      ],
    });
    if (!expediente) {
      return res.status(404).json({
        message: "No se encontro el expediente",
      });
    }
    return res.status(200).json({ data: expediente });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor al obtener expediente",
    });
  }
};

expedientesCtrl.getCountExpedientes = async (req, res) => {
  try {
    const expedientes = await Expediente.findAll({
      attributes: [
        'estado',
        [sequelize.fn('COUNT', sequelize.col('estado')), 'expedientes_por_estado']
      ],
      group: ['estado'],
    });
    
    const cantExpedientes = await Expediente.count();

    if (!expedientes || expedientes.length === 0 || !cantExpedientes) {
      return res.status(404).json({
        message: "No se encontraron expedientes",
      });
    }

    return res.status(200).json({ status: 200, data: expedientes, count: cantExpedientes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor al obtener expedientes",
    });
  }
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
    estado = 3,
    secretario,
    origenExpediente,
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
      origen_expediente_id: origenExpediente,
    });
    if (nuevoExpediente) {
      return res.status(200).json({
        status: 200,
        message: "Expediente creado correctamente",
        data: nuevoExpediente,
      })
      }else{
        return res.status(400).json({
          status: 400,
          message: "Error al crear expediente",
        });
    };
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor al crear expediente",
    });
  }
};

expedientesCtrl.agregarSecuestros = async (req, res) => {
  try {
    const { id } = req.params;
    const { secuestros } = req.body;
    const expediente = await Expediente.findByPk(id);
    if (!expediente) {
      return res.status(404).json({
        message: "No se encontro el expediente",
      });
    }
    await expediente.update({ secuestros: secuestros });
    return res
      .status(201)
      .json({ message: "Secuestros agregados correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor al agregar secuestros",
    });
  }
};

expedientesCtrl.editarExpediente = async (req, res) => {
  const { id } = req.params;
  const {
    tipo_expediente_id,
      orden,
      localidad_id,
      circunscripcion_id,
      juzgado_id,
      fecha_inicio,
      fecha_origen,
      resumen,
      secretario,
      origen_expediente_id: origenExpediente,
} = req.body;
try {
  
  const expediente = await Expediente.findByPk(id);
  if (!expediente) {
    return res.status(404).json({
      message: "No se encontro el expediente",
    });
  }
  await expediente.update({
    tipo_expediente_id,
    orden,
    localidad_id,
    circunscripcion_id,
    juzgado_id,
    fecha_inicio,
    fecha_origen,
    resumen,
    secretario
  });
  return res
    .status(201)
    .json({ status: 201 ,message: "Expediente editado correctamente" });
} catch (error) {
  console.log(error);
  return res.status(500).json({
    message: "Error interno del servidor al editar expediente",
  });
};


};

expedientesCtrl.agregarObservaciones = async (req, res) => {
  try {
    const { id } = req.params;
    const { observaciones } = req.body;

    const expediente = await Expediente.findByPk(id);
    if (!expediente) {
      return res.status(404).json({
        message: "No se encontro el expediente",
      });
    }
    await expediente.update({ observaciones: observaciones });
    return res
      .status(201)
      .json({ message: "Observaciones agregadas correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor al agregar observaciones",
    });
  }
};

import moment from "moment";

const verificarExpedientesVencidos = async (req,res, next) => {
  try {
    // Obtener la fecha actual
    const fechaActual = moment().toDate();
    
    // Calcular la fecha límite para considerar los expedientes como vencidos (hace 15 días)
    const fechaLimite = moment().subtract(15, 'days').toDate();

    // Consulta para buscar todos los expedientes en curso
    const expedientesEnCurso = await Expediente.findAll({
      where: {
        estado: '3' // En curso
      }
    });

    // Filtrar los expedientes en curso que están vencidos y actualizar su estado a Vencido
    const expedientesVencidos = [];
    for (const expediente of expedientesEnCurso) {
      if (moment(expediente.fecha_origen).isBefore(fechaLimite)) {
        expediente.estado = '2'; // Actualizar el estado a Vencido
        await expediente.save(); // Guardar el expediente actualizado en la base de datos
        expedientesVencidos.push(expediente); // Agregar el expediente a la lista de vencidos
      };
    };
    console.log('expedientes verificados!');
    next();
  } catch (error) {
    console.log('Error al verificar el vencimiento de los expedientes código de error:',error);
    next();
  };
};


export default verificarExpedientesVencidos;



expedientesCtrl.elevarExpediente = async (req, res) => {
  try {
    const { id } = req.params;
    const expediente = await Expediente.findOne({
      where:{
        id,
      },
      include:[
        {
          model: File,
          as: "files",
        },
      ]
    });
    if (!expediente) {
      return res.status(404).json({
        message: "No se encontro el expediente",
      });
    };
    if(expediente.files.length <=1 ){
      return res.status(400).json({
        status: 400,
        message: "Para elevar el expediente, se require adjuntar la elevación del mismo",
      });
    }
    if (expediente.estado == 1) {
      return res.status(400).json({
        status: 400,
        message: "El expediente ya fue elevado",
      });
    }

    await expediente.update({ estado: 1, fecha_elevacion: new Date() });
    return res
      .status(201)
      .json({ message: "Expediente elevado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor al elevar expediente",
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
  }
};
