import Circunscripcion from "../models/Circunscripcion.js";

export const getCircuscripciones = async (req, res) => {
    try {
        const circunscripciones = await Circunscripcion.findAll();
        if(!circunscripciones){
            return res.status(404).json({message:'No hay circunscripciones registradas'});
        };
        return res.status(200).json({data:circunscripciones});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor al obtener las circunscripciones'});
    };
};