import Persona from "../models/Personas.js";
import ExpedientePersona from "../models/ExpedientePersona.js";
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

export const buscarPersona = async (req, res) => {
  try {
    let filtros = {};
    if (req.query.dni) {
      filtros.dni = req.query.dni;
    }
    if (req.query.apellido) {
      filtros.apellido = req.query.apellido;
    }
    if (req.query.nombre) {
      filtros.nombre = req.query.nombre;
    }
    if (req.query.domicilio) {
      filtros.domicilio = req.query.domicilio;
    }
    if (req.query.palabraClave) {
      filtros.observaciones = " %" + req.query.palabraClave + "%";
    }
    const personas = await Persona.findAll({
      where: filtros,
    });

    if (personas.length === 0) {
      return res.json([]);
    }
    return res.status(200).json({ data: personas });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPersonaById = async (req, res) => {
  try {
    const persona = await Persona.findByPk(req.params.id);
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

    const [persona, created] = await Persona.findOrCreate({
      where: {
        dni,
        apellido,
        nombre,
        domicilio,
        localidad,
        clase,
        observaciones,
      },
    });
    if (!created) {
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
    } else if (created) {
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
    } else {
      return res.status(400).json({
        message: "No se pudo crear la persona",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
