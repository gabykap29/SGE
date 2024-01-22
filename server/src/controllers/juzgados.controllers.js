import Juzgado from "../models/Juzgados.js";

export const getJuzgados = async (req, res) => {
    const id = req.params.id;
    try {
        const juzgados = await Juzgado.findAll({
            where:{
                circunscripcion_id:id
            }
        });
        if(!juzgados){
            return res.status(404).json({message:'No hay juzgados registrados'});
        };
        return res.status(200).json({data:juzgados});
    } catch (error) {
        console.log(error);
    };
};