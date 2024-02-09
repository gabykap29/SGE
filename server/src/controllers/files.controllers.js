import Files from "../models/Files.js";
import fs from "fs";
import __dirname from "../utils/dirnameConfig.js";
import Expediente from "../models/Expediente.js";
export const uploadFile = async (req, res) => {
  try {
    const  pdf  = req.file;
    const { id } = req.params;
    const expediente = await Expediente.findOne({
        where:{id},
        include:{
            model:Files,
            as:'files'
        },
    });
    if (!expediente) {
      return res.status(404).json({ message: "No se encontro el expediente" });
    }
    if(expediente.files.length > 0){
        return res.status(400).json({ message: "Ya existe un archivo para este expediente" });
    };
    if (pdf.mimetype !== "application/pdf") {
        return res
            .status(400)
            .json({
            message: "Tipo de archivo no válido. Se permite solo PDF.",
            });
    };
    const file = await Files.create({
      url: pdf.filename,
      expediente_id: id,
    });
    if (!file) {
      return res
        .status(400)
        .json({
          message: "Error al subir el archivo! Verfique que el archivo sea PDF",
        });
    }
    res.status(201).json({ message: "Archivo subido correctamente" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor al subir el archivo" });
  };
};

export const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await Files.findByPk(id);
        if (!file) {
            return res.status(404).json({ message: "No se encontro el archivo" });
        };

        const filePath = path.join(__dirname, `../public/uploads/${file.url}`);
        fs.unlinkSync(filePath);
        const deleted = await Files.destroy({ where: { id } });
        if (!deleted) {
            return res.status(400).json({ message: "No se pudo eliminar el archivo" });
        };
        res.status(200).json({ message: "Archivo eliminado correctamente" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor al eliminar el archivo" });
    };
};
