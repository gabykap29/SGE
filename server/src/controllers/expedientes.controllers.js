import Expediente from "../models/Expediente";
import Usuario from "../models/Usuario";
export const expedientesCtrl = {};

expedientesCtrl.getExpedientes = async (req, res) => {
  try {
    const expedientes = await Expediente.findAll();
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

expedientesCtrl.createExpediente = async (req, res) => {
  const {
    tipo_expediente_id,
    orden,
    localidad_id,
    juzgado_id,
    fecha_inicio,
    fecha_origen,
    resumen,
    secuestros,
    estado,
    secretario,
    observaciones,
    fecha_elevacion,
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
    const newExpediente = await Expediente.create({
      tipo_expediente_id,
      orden,
      localidad_id,
      juzgado_id,
      fecha_inicio,
      fecha_origen,
      resumen,
      secuestros,
      estado,
      secretario,
      observaciones,
      fecha_elevacion,
      creador: usuario.id,
    });
    if (newExpediente) {
      return res.status(200).json({
        message: "Expediente creado correctamente",
        data: newExpediente,
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
  }
};
