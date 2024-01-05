import Circunscripcion from "../models/Circunscripcion.js";

const circunscripciones = [
  "1° Circunscripcion Judicial",
  "2° Circunscripción Judicial",
  "3° Circunscripción Judicial",
];

export const cargarCircunscripciones = async () => {
    try {
        circunscripciones.forEach(async (circunscripcion) => {
            await Circunscripcion.create({ nombre: circunscripcion });
        });
      console.log("Circunscripciones cargadas con éxito!");
    } catch (error) {
        console.log("Error al cargar las circunscripciones",error)
    }
};
