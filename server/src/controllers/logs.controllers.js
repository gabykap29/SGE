import __dirname from "../utils/dirnameConfig.js";
import path from "path";
import fs from "fs";

export const LeerLogsPorFecha = async (req,res)=>{
    const {fecha} = req.params;
    console.log(fecha);
    try {

        const logFilePath =  path.join(__dirname,'..', '..', 'src', 'logs', `log-${fecha}.log`);
        console.log(logFilePath);
        if (!fs.existsSync(logFilePath)) {
            return res.status(404).json({
                status:404,
                message: "No se encontró el archivo de logs para la fecha indicada!",
            });
        };
        const data = fs.readFileSync(logFilePath, 'utf8');
        return res.status(200).json({status:200, data:data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:500, message: "Error interno del servidor al obtener el archivo de logs!"});
    }
};