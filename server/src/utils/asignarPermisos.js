import RolesPermisos from "../models/usuarios/RolesPermisos.js";

const rolesPermisos = [
  { rol_id: 1, permiso_id: 1 },
  { rol_id: 1, permiso_id: 2 },
  { rol_id: 1, permiso_id: 3 },
  { rol_id: 1, permiso_id: 4 },
  { rol_id: 1, permiso_id: 5 },
  { rol_id: 1, permiso_id: 6 },
  { rol_id: 1, permiso_id: 7 },
  { rol_id: 1, permiso_id: 8 },
  { rol_id: 1, permiso_id: 9 },
  { rol_id: 1, permiso_id: 10 },
  { rol_id: 1, permiso_id: 11 },
  { rol_id: 1, permiso_id: 12 },
  { rol_id: 1, permiso_id: 13 },
  { rol_id: 1, permiso_id: 14 },
  { rol_id: 1, permiso_id: 15 },
  { rol_id: 1, permiso_id: 16 },
  { rol_id: 1, permiso_id: 17 },
  { rol_id: 1, permiso_id: 18 },
  { rol_id: 1, permiso_id: 19 },
  { rol_id: 1, permiso_id: 20 },
  { rol_id: 1, permiso_id: 21 },
  { rol_id: 1, permiso_id: 22 },
  { rol_id: 1, permiso_id: 23 },
  { rol_id: 1, permiso_id: 24 },
  { rol_id: 1, permiso_id: 25 },
  { rol_id: 1, permiso_id: 26 },
  { rol_id: 1, permiso_id: 27 },
  { rol_id: 1, permiso_id: 28},
  { rol_id: 1, permiso_id: 29},
  //Supervisor
  { rol_id: 3, permiso_id: 1 },
  { rol_id: 3, permiso_id: 2 },
  { rol_id: 3, permiso_id: 3 },
  { rol_id: 3, permiso_id: 4 },
  { rol_id: 3, permiso_id: 5 },
  { rol_id: 3, permiso_id: 7 },
  { rol_id: 3, permiso_id: 9 },
  { rol_id: 3, permiso_id: 10 },
  { rol_id: 3, permiso_id: 11 },
  { rol_id: 3, permiso_id: 12 },
  { rol_id: 3, permiso_id: 13 },
  { rol_id: 3, permiso_id: 14 },
  { rol_id: 3, permiso_id: 15 },
  { rol_id: 3, permiso_id: 16 },
  { rol_id: 3, permiso_id: 17 },
  { rol_id: 3, permiso_id: 18 },
  { rol_id: 3, permiso_id: 19 },
  { rol_id: 3, permiso_id: 20 },
  { rol_id: 3, permiso_id: 21 },
  { rol_id: 3, permiso_id: 22 },
  { rol_id: 3, permiso_id: 23 },
  { rol_id: 3, permiso_id: 24 },
  { rol_id: 3, permiso_id: 25 },
  { rol_id: 3, permiso_id: 26 },
  { rol_id: 3, permiso_id: 27 },
  { rol_id: 3, permiso_id: 28},
  { rol_id: 3, permiso_id: 29},
  //User
  { rol_id: 2, permiso_id: 1 },
  { rol_id: 2, permiso_id: 5 },
  { rol_id: 2, permiso_id: 22 },
  { rol_id: 2, permiso_id: 23 },
  { rol_id: 2, permiso_id: 24 },
  { rol_id: 2, permiso_id: 25 },
  //Visualizer
  { rol_id: 4, permiso_id: 5 },
  { rol_id: 4, permiso_id: 22 },
  { rol_id: 4, permiso_id: 23 },
  { rol_id: 4, permiso_id: 24 },
  { rol_id: 4, permiso_id: 25 },
];

export const asignarPermisos = async () => {
  try {
    rolesPermisos.forEach(async (rolPermiso) => {
      await RolesPermisos.create(rolPermiso);
    });
    console.log("Permisos asignados con éxito!");
  } catch (error) {
    console.log("Error al asignar los permisos", error);
  }
};
