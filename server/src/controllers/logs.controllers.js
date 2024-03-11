import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Convertir la URL de importación en la ruta del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const LeerLogsPorFecha = async (req, res) => {
    const { fecha } = req.params;
    try {
        const logFilePath = path.join(__dirname, '..', '..', 'src', 'logs', `log-${fecha}.log`);

        if (!fs.existsSync(logFilePath)) {
            return res.status(404).json({
                status: 404,
                message: "¡No se encontró el archivo de logs para la fecha indicada!",
            });
        };

        // Leer el contenido del archivo y enviarlo como respuesta
        const data = fs.readFileSync(logFilePath, 'utf8');
        const dataArray = data.split('\n').map(line => {
            try {
                return JSON.parse(line);
            } catch (error) {
                return null;
            }
        }).filter(Boolean);

        return res.status(200).json({ status: 200, data: dataArray });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "¡Error interno del servidor al obtener el archivo de logs!" });
    }
};

