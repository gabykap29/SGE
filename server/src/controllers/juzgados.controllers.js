import Juzgado from "../models/Juzgados.js";
import Circunscripcion from "../models/Circunscripcion.js";
export const getJuzgados = async (req, res) => {
    const id = req.params.id;
    try {
        const juzgados = await Juzgado.findAll({
            where:{
                circunscripcion_id:id
            },
            include:{
                model:Circunscripcion,
                as:'circunscripcion',
                attributes:['nombre']
            }
        });
        if(!juzgados){
            return res.status(404).json({status:404, message:'No hay juzgados registrados'});
        };
        return res.status(200).json({data:juzgados});
    } catch (error) {
        console.log(error);
    };
};

export const crearJuzgado = async (req, res) => {
    const { nombre, circunscripcion_id } = req.body;
    try {
        const juzgado = await Juzgado.create({nombre, circunscripcion_id});
        if(!juzgado){
            return res.status(400).json({status:400, message:'Error al crear el juzgado'});
        };
        return res.status(201).json({status:201,message:'Juzgado creado con éxito!', data:juzgado});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:500,message:'Error interno del servidor al crear el juzgado'});
    };
};

export const eliminarJuzgado = async (req, res) => {
    const {id}= req.params;
    try {
        const juzgado = await Juzgado.destroy({
            where:{
                id
            },
            cascade:true
        });
        if(!juzgado){
            return res.status(400).json({status:400, message:'Error al eliminar el juzgado'});
        };
        return res.status(200).json({status:200,message:'Juzgado eliminado con éxito!'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:500,message:'Error interno del servidor al eliminar el juzgado'});
    }
};