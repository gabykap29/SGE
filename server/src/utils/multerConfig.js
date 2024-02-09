import multer from "multer";
import path from "path";
import __dirname from "./dirnameConfig.js";

// Configuración del almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads")); // Ajusta la ruta de destino según tu estructura de carpetas
  },
  filename: (req, file, cb) => {
    // Genera un nombre único para el archivo
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

// Configuración de la función de filtrado de archivos
const fileFilter = (req, file, cb) => {
  // Verifica el tipo de archivo permitido (en este caso, solo PDF)
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no válido. Se permite solo PDF."));
  }
};

// Configuración del middleware de Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
