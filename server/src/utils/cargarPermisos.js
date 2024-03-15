import Permisos from "../models/usuarios/Permisos.js";

const permisos = [
  "Crear Expediente",
  "Editar Expediente",
  "Eliminar Expediente",
  "Destruir Expediente",
  "Ver Expediente",
  "Crear Usuario",
  "Editar Usuario",
  "Eliminar Usuario",
  "Ver Usuario",
  "Crear Juzgado",
  "Editar Juzgado",
  "Eliminar Juzgado",
  "Crear Circunscripcion",
  "Editar Circunscripcion",
  "Eliminar Circunscripcion",
  "Crear Departamento",
  "Editar Departamento",
  "Eliminar Departamento",
  "Crear Localidad",
  "Editar Localidad",
  "Eliminar Localidad",
  "Crear Persona",
  "Editar Persona",
  "Eliminar Persona",
  "Ver Persona",
  "Bloquear Usuario",
  "Desbloquear Usuario",
  "Ver Logs",
  "Ver Ajustes",
];

export const cargarPermisos = async () => {
  try {
    permisos.forEach(async (permiso) => {
      await Permisos.create({ nombre: permiso });
    });
    console.log("Permisos cargados con éxito!");
  } catch (error) {
    console.log("Error al cargar los permisos", error);
  }
};
