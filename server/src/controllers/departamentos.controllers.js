import Departamento from "../models/Departamento.js";

export const getDepart = async (req,res)=>{
    try {
        const departamentos = await Departamento.findAll();
        if(!departamentos){
            return res.status(404).json({
                message: "No hay departamentos registrados",
            });
        };
        return res.status(200).json({data:departamentos});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor al obtener los departamentos'});
    };
};

