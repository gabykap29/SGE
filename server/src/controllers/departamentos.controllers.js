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


export const crearDepart = async (req,res)=>{
    const {nombre} = req.body;
    try {
        const verif = await Departamento.findOne({
            where:{
                nombre,
            }
        });
        if(verif){
            return res.status(400).json({status:400,message:'El departamento ya existe'});
        };

        const departamento = await Departamento.create({nombre});
        if(!departamento){
            return res.status(400).json({ status:400 ,message:'Error al crear el departamento'});
        };
        return res.status(201).json({status:201,message:'Departamento creado con éxito!', data:departamento});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor al crear el departamento'});
    };
};

export const eliminarDepart = async (req,res)=>{
    const {id}= req.params;
    try {
        const departamento = await Departamento.destroy({
            where:{
                id
            },
            cascade:true
        });
        if(!departamento){
            return res.status(400).json({status:400,message:'Error al eliminar el departamento'});
        };
        return res.status(200).json({status:200,message:'Departamento eliminado con éxito!'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor al eliminar el departamento'});
    }
};