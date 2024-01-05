import Juzgado from "../models/Juzgados.js";

let juzgadosPrimeraCircunscripcion = [
  "Excelenticima Camara Primera en lo Criminal",
  "Excelentisima Camara Segunda en lo Criminal",
  "Excelentísimo Tribunal de Casacion",
  "Excelentisimo Tribunal de Familia",
  "Federal Nº 1",
  "Federal Nº 2",
  "Fiscalia Nº 1",
  "Fiscalia Nº2",
  "Juez de Instrucción y Correccional Nro. 1",
  "Juez de Instrucción y Correccional Nro. 2",
  "Juez de Instrucción y Correccional Nro. 3",
  "Juez de Instrucción y Correccional Nro. 4",
  "Juez de Instrucción y Correccional Nro. 5",
  "Juez de Instrucción y Correccional Nro. 6",
  "Juzgado Civil, Comercial y Laboral",
  "Juzgado Civil y Comercial del Trabajo y Menores Nº7 - El Colorado",
  "Juzgado de 1° Instancia en lo Civil y Comercial N°1",
  "Juzgado de 1° Instancia en lo Civil y Comercial N°2",
  "Juzgado de 1° Instancia en lo Civil y Comercial N°3",
  "Juzgado de 1° Instancia en lo Civil y Comercial N°4",
  "Juzgado de 1° Instancia en lo Civil y Comercial N°5",
  "Juzgado de 1° Instancia en lo Civil y Comercial N°6",
  "Juzgado de Ejecución Penal",
  "Juzgado de Feria Formosa",
  "Juzgado de Instruccion y Correccional Contra el Narcocrimen",
  "Juzgado de Menores",
  "Juzgado de Paz de Menor cuantia El Colorado",
  "Juzgado de Paz de Menor Cuantia - Fontana",
  "Juzgado de Paz de Menor Cuantia Herradura - Formosa",
  "Juzgado de Paz de Menor Cuantia Ibarreta",
  "Juzgado de Paz de Menor Cuantía N°1",
  "Juzgado de Paz de Menor Cuantía N°2",
  "Juzgado de Paz de Menor Cuantía N°3",
  "Juzgado de Paz de Menor Cuantía N°4",
  "Juzgado de Paz de Menor Cuantia - Palo Santo",
  "Juzgado de Paz de Menor Cuantia- Villa Gral. Guemes",
  "Juzgado de Paz de Menor Cuatia Laishi",
  "Juzgado de Paz Pirane",
  "Juzgado Federal Civil y Comercial",
  "Juzgado Penal N° 2",
  "Ministerio de la Produccion y Medio Ambiente",
  "Oficina de Gestión de Audiencia",
  "Oficina de Gestión de Audiencia-OGA",
  "Oficina de Violencia Familiar",
  "Secretaria Unica Narcocrimen",
  "Tribunal Oral Criminal Federal",
  "Unidad Fiscal",
  "Otros Juzgados",
];
let juzgadosSegundaCircunscripcion = [
  "Juez de Instrucción y Correccional Nro. 1",
  "Juez de Instrucción y Correccional Nro. 2",
  "Juzgado Civil, Comercial, Laboral",
  "Juzgado de Paz de Menor Cuantia Clorinda",
  "Juzgado de Paz de Menor Cuantia El Espinillo",
  "Juzgado de Paz de Menor Cuantia G. Belgrano",
  "Juzgado de Paz de Menor Cuantia General Guemes",
  "Juzgado de Paz de Menor Cuantia Laguna Blanca",
  "Juzgado de Paz de Menor Cuantia N° 1",
  "Juzgado de Paz de Menor Cuantia N° 2",
  "Juzgado de Paz de Menor Cuantia Riacho He He",
  "Juzgado Menor Cuantia Palma Sola - Formosa",
  "Juzgado Menores Clorinda",
  "Oficina de Gestión de Audiencia (OGA) Clorinda",
  "Oficina de Violencia Familiar",
];
let juzgadosTerceraCircunscripcion = [
  "Juez de Instrucción y Correccional Las Lomitas",
  "Juzgado 1ra. Instancia Civil, Comercial, del trabajo y de Menores",
  "Juzgado de Paz de Menor Cuantia Las Lomitas",
  "Juzgado de Paz Ingeniero Juarez",
  "Juzgado Menores",
  "Juzgado Paz Menor Cuantia Comandante Fontana",
  "Juzgado Paz Menor Cuantia Estanislao del Campo",
  "Juzgado Paz Menor Cuantia Pozo del Tigre",
  "Oficina de Gestión de Audiencia (OGA) Lomitas",
  "Oficina de Violencia Familiar",
];

export const cargarJuzgados = async () => {
    try {
        juzgadosPrimeraCircunscripcion.forEach(async (juzgado) => {
            await Juzgado.create({nombre:juzgado,circunscripcion_id:1});
        });
        juzgadosSegundaCircunscripcion.forEach(async (juzgado) => {
            await Juzgado.create({nombre:juzgado,circunscripcion_id:2});
        });
        juzgadosTerceraCircunscripcion.forEach(async (juzgado) => {
            await Juzgado.create({nombre:juzgado,circunscripcion_id:3});
        });
        console.log("Juzgados cargados");
    } catch (error) {
        console.log('error al cargar los juzgados!: ',error);
    };
};