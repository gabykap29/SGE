import Localidad from "../models/Localidad.js";

export const getLocalidades = async (req, res) => {
    const id = req.params.id;
    try {
        const localidades = await Localidad.findAll({
            where:{
                departamento_id:id
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