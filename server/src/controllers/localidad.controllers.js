import Localidad from "../models/Localidad.js";
import Departamento from "../models/Departamento.js";
export const getLocalidades = async (req, res) => {
    const id = req.params.id;
    try {
        const localidades = await Localidad.findAll({
            where:{
                departamento_id:id
            },
            include:{
                model:Departamento,
                as:'departamento',
                attributes:['nombre']
            }
        });
        if(!localidades){
            return res.status(404).json({
                message: "No hay localidades registradas",
            });
        };
        return res.status(200).json({data:localidades});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor al obtener las localidades'});
    };
};

export const crearLocalidad = async (req, res) => {
    const { nombre, departamento_id } = req.body;
    try {
        const localidad = await Localidad.create({nombre, departamento_id});
        if(!localidad){
            return res.status(400).json({message:'Error al crear la localidad'});
        };
        return res.status(201).json({message:'Localidad creada con éxito!', data:localidad});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor al crear la localidad'});
    };
};

export const eliminarLocalidad = async (req, res) => {
    const {id}= req.params;
    try {
        const localidad = await Localidad.destroy({
            where:{
                id
            },
            cascade:true
        });
        if(!localidad){
            return res.status(400).json({message:'Error al eliminar la localidad'});
        };
        return res.status(200).json({message:'Localidad eliminada con éxito!'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor al eliminar la localidad'});
    }
};