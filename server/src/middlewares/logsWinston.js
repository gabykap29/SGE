import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import fs from 'fs';
import winston from "winston";

// Directorio donde se guardarán los archivos de registro
const logsDir = path.join(__dirname);


function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


// Verificar si la carpeta logs existe, si no, crearla
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
};

const logFileName =  `log-${getCurrentDate()}.log`;
const logFilePath =  path.join(__dirname, 'server', 'src', 'logs', logFileName);

// Crear el objeto logger aquí
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: logFilePath,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});
export default logger