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

export const crearCircunscripcion = async (req, res) => {
    const { nombre } = req.body;
    try {
        const circunscripcion = await Circunscripcion.create({nombre});
        if(!circunscripcion){
            return res.status(400).json({message:'Error al crear la circunscripcion'});
        };
        return res.status(201).json({message:'Circunscripcion creada con éxito!', data:circunscripcion});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor al crear la circunscripcion'});
    };
};

export const eliminarCircunscripcion = async (req, res) => {
    const {id}= req.params;
    try {
        const circunscripcion = await Circunscripcion.destroy({
            where:{
                id
            },
            cascade:true
        });
        if(!circunscripcion){
            return res.status(400).json({message:'Error al eliminar la circunscripcion'});
        };
        return res.status(200).json({message:'Circunscripcion eliminada con éxito!'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor al eliminar la circunscripcion'});
    }
};