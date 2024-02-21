import Persona from "../models/Personas.js";
import ExpedientePersona from "../models/ExpedientePersona.js";
import Expediente from "../models/Expediente.js";
import Localidad from "../models/Localidad.js";
import Departamento from "../models/Departamento.js";
import Juzgado from "../models/Juzgados.js"
import Circunscripcion from "../models/Circunscripcion.js";
import TipoExpediente from "../models/TipoExpediente.js";
import OrigenExpediente from "../models/OrigenExpediente.js";
export const getPersonas = async (req, res) => {
  try {
    const { page, size } = req.query;
    const personas = await Persona.findAll({
      offset: page * size,
      limit: size,
    });
    res.json({
      data: personas,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

import { Op } from 'sequelize';

export const buscarPersona = async (req, res) => {
  try {
    const { page=0, size=10 } = req.query;
    let filtros = {};

    if (req.query.dni) {
      filtros.dni = req.query.dni;
    }
    if (req.query.apellido) {
      filtros.apellido = {
        [Op.iLike]: `%${req.query.apellido}%`
      };
    }
    if (req.query.nombre) {
      filtros.nombre = {
        [Op.iLike]: `%${req.query.nombre}%`
      };
    }
    if (req.query.domicilio) {
      filtros.domicilio = req.query.domicilio;
    }
    if (req.query.palabraClave) {
      filtros.observaciones = {
        [Op.like]: `%${req.query.palabraClave}%`
      };
    };
    const personas = await Persona.findAll({
      where: filtros,
      offset: page * size,
      limit: size,
    });

    if (personas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron personas que coincidan con los criterios de búsqueda.' });
    };

    return res.status(200).json({ data: personas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  };
};


export const getPersonaById = async (req, res) => {
  try {
    const persona = await Persona.findByPk(req.params.id,{
      include:[
        {
          model: Expediente,
          through:'expediente_persona',
          as: 'expedientesDePersona',
          include:[
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
          ]

        }
      ]
    });
    if (persona) {
      res.json({
        data: persona,
      });
    } else {
      res.status(404).json({
        message: `No se encontró la persona con el id: ${req.params.id}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const crearPersona = async (req, res) => {
  try {
    const {
      dni,
      apellido,
      nombre,
      domicilio,
      localidad,
      clase,
      observaciones,
      tipo,
      recordId,
    } = req.body;
    console.log(req.body);
    const opcionTipo = parseInt(tipo);
    let descripcion = "";
    switch (opcionTipo) {
      case 1:
        descripcion = "Denunciante";
        break;
      case 2:
        descripcion = "Damnificado";
        break;
      case 3:
        descripcion = "Imputado";
        break;
      case 4:
        descripcion = "Testigo";
        break;
      case 5:
        descripcion = "Victima";
        break;
      default:
        descripcion = "Otro";
        break;
    }

    // Busca la persona por los campos de identificación
    let persona = await Persona.findOne({
      where: {
        dni,
        apellido,
        nombre,
        domicilio,
        localidad,
        clase,
      },
    });

    if (persona) {
      // Si la persona existe, actualiza las observaciones
      await persona.update({ observaciones });
    } else {
      // Si la persona no existe, créala
      persona = await Persona.create({
        dni,
        apellido,
        nombre,
        domicilio,
        localidad,
        clase,
        observaciones,
      });
    }

    // Asigna la persona al expediente
    const asignarExpediente = await ExpedientePersona.create({
      persona_id: persona.id,
      expediente_id: recordId,
      descripcion: descripcion,
    });

    if (asignarExpediente) {
      return res.status(201).json({
        message: "Persona agregada correctamente!",
      });
    } else {
      return res.status(400).json({
        message: "No se pudo asignar la persona al expediente",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

