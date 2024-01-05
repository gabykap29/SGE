import Rol from "../models/usuarios/Roles.js";

const roles = ["Administrator", "User", "Supervisor", "Visualizer"]

export const cargarRoles = async () => {
    try {
        
    roles.forEach(async (rol) => {
        await Rol.create({ nombre: rol });
    });
      console.log("Roles cargados con éxito!");
    } catch (error) {
        console.log("Error al cargar los roles",error)
    }
};