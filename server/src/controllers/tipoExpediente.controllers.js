import TipoExpediente from "../models/TipoExpediente.js";

export const getTipoExpedientes = async (req, res) => {
    try {
        const tipoExpedientes = await TipoExpediente.findAll();
        if(!tipoExpedientes){
            return res.status(404).json({msg: 'No hay tipos de expedientes'});
        };
        return res.status(200).json({data: tipoExpedientes});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error al obtener los tipos de expedientes'});
    };
};