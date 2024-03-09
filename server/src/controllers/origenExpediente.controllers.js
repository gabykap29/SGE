import OrigenExpediente from '../models/OrigenExpediente.js';

export const getOrigenesExpediente = async (req, res) => {
    try {
        const origenes = await OrigenExpediente.findAll();
        if(!origenes){
            return res.status(404).json({message:'No hay origenes registrados'});
        };
        return res.status(200).json({data:origenes});
    } catch (error) {
        console.log(error);
    };
};

export const crearOrigenExpediente = async (req, res) => {
    const { nombre } = req.body;
    try {
        const verificarOrigen = await OrigenExpediente.findOne({
            where:{
                nombre
            }
        });
        if(verificarOrigen){
            return res.status(400).json({status:400,message:'El origen ya existe!'});
        };
        const origen = await OrigenExpediente.create({nombre});
        if(!origen){
            return res.status(400).json({status:404, message:'Error al crear el origen'});
        };
        return res.status(201).json({status: 201 ,message:'Origen creado con éxito!', data:origen});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:500, message:'Error interno del servidor al crear el origen'});
    };
};

export const eliminarOrigenExpediente = async (req, res) => {
    const {id}= req.params;
    try {
        const origen = await OrigenExpediente.destroy({
            where:{
                id
            }
        });
        if(!origen){
            return res.status(400).json({status:400, message:'Error al eliminar el origen'});
        };
        return res.status(200).json({status:200, message:'Origen eliminado con éxito!'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:500, message:'Error interno del servidor al eliminar el origen'});   
    }
};