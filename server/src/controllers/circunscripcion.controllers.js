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
            return res.status(400).json({status:400, message:'Error al crear la circunscripcion'});
        };
        return res.status(201).json({status:201,message:'Circunscripcion creada con éxito!', data:circunscripcion});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:500,message:'Error interno del servidor al crear la circunscripcion'});
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
            return res.status(404).json({status:404,message:'No se encontró la circunscripcion a eliminar'});
        };
        return res.status(200).json({status:200,message:'Circunscripcion eliminada con éxito!'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor al eliminar la circunscripcion'});
    }
};