import Circunscripcion from "./Circunscripcion.js";
import Departamento from "./Departamento.js";
import ExpedienteDetenidos from "./ExpedienteDetenidos.js";
import Expediente from "./Expediente.js";
import Files from "./Files.js";
import Juzgado from "./Juzgados.js";
import Usuario from "./usuarios/Usuarios.js";
import Rol from "./usuarios/Roles.js";
import Permisos from "./usuarios/Permisos.js";
import Localidad from "./Localidad.js";
import OrigenExpediente from "./OrigenExpediente.js";
import TipoExpediente from "./TipoExpediente.js";
import Detenido from "./Detenidos.js";
import { sequelize } from "../database/database.js";
import Persona from "./Personas.js";
import bcrypt from "bcryptjs";
import { cargarLocalidades } from "../utils/cargarLocalidades.js";
import { cargarJuzgados } from "../utils/cargarJuzgados.js";
import { cargarCircunscripciones } from "../utils/cargarCircunscripciones.js";
import { cargarRoles } from "../utils/cargarRoles.js";
import { cargarPermisos } from "../utils/cargarPermisos.js";
import RolesPermisos from "../models/usuarios/RolesPermisos.js";
import { asignarPermisos } from "../utils/asignarPermisos.js";

Departamento.hasMany(Localidad, {
  foreignKey: "departamento_id",
  as: "localidades",
});
Localidad.belongsTo(Departamento, {
  foreignKey: "departamento_id",
  as: "departamento",
});

Circunscripcion.hasMany(Juzgado, {
  foreignKey: "circunscripcion_id",
  as: "juzgados",
});
Juzgado.belongsTo(Circunscripcion, {
  foreignKey: "circunscripcion_id",
  as: "circunscripcion",
});

Juzgado.hasMany(Expediente, { foreignKey: "juzgado_id", as: "expedientes" });
Expediente.belongsTo(Juzgado, { foreignKey: "juzgado_id", as: "juzgado" });

Expediente.belongsToMany(Detenido, {
  through: ExpedienteDetenidos,
  as: "detenidos",
  foreignKey: "expediente_id",
});
Detenido.belongsToMany(Expediente, {
  through: ExpedienteDetenidos,
  as: "expedientes",
  foreignKey: "detenido_id",
});

Expediente.hasMany(Files, { foreignKey: "expediente_id", as: "files" });
Files.belongsTo(Expediente, { foreignKey: "expediente_id", as: "expediente" });

Expediente.belongsTo(OrigenExpediente, {
  foreignKey: "origen_expediente_id",
  as: "origen_expediente",
});
OrigenExpediente.hasMany(Expediente, {
  foreignKey: "origen_expediente_id",
  as: "expedientes",
});

Expediente.belongsTo(TipoExpediente, {
  foreignKey: "tipo_expediente_id",
  as: "tipo_expediente",
});
TipoExpediente.hasMany(Expediente, {
  foreignKey: "tipo_expediente_id",
  as: "expedientes",
});

Expediente.belongsTo(Localidad, {
  foreignKey: "localidad_id",
  as: "localidad",
});
Localidad.hasMany(Expediente, {
  foreignKey: "localidad_id",
  as: "expedientes",
});

Persona.hasMany(Detenido, { foreignKey: "persona_id", as: "detencion" });
Detenido.belongsTo(Persona, { foreignKey: "persona_id", as: "detencion" });

Usuario.belongsTo(Rol, { foreignKey: "rol_id", as: "rol" });
Rol.hasMany(Usuario, { foreignKey: "rol_id", as: "usuarios" });

Rol.belongsToMany(Permisos, {
  through: "permisos_roles",
  as: "permisos",
  foreignKey: "rol_id",
});
Permisos.belongsToMany(Rol, {
  through: "permisos_roles",
  as: "roles",
  foreignKey: "permiso_id",
});

Detenido.belongsToMany(Persona, {
  through: "detenidos_personas",
  as: "personas",
  foreignKey: "detenido_id",
});
Persona.belongsToMany(Detenido, {
  through: "detenidos_personas",
  as: "detenidos",
  foreignKey: "persona_id",
});

//orden de creacion de tablas
await Departamento.sync({ force: false });
await Localidad.sync({ force: false });
await Circunscripcion.sync({ force: false });
await Juzgado.sync({ force: false });
await TipoExpediente.sync({ force: false });
await OrigenExpediente.sync({ force: false });
await Expediente.sync({ force: false }); 
await Rol.sync({ force: false });
await RolesPermisos.sync({ force: false });
await Permisos.sync({ force: false });
await Usuario.sync({ force: false });
await Persona.sync({ force: false });
await Detenido.sync({ force: false });
await ExpedienteDetenidos.sync({ force: false });
await Files.sync({ force: false });




export const comprobacionesDB = async () => {
  const countRoles = await Rol.count();
  const countPermisos = await Permisos.count();
  const countUsuarios = await Usuario.count();
  const countCircunscripciones = await Circunscripcion.count();
  const countDepartamentos = await Departamento.count();
  const countLocalidades = await Localidad.count();
  const countJuzgados = await Juzgado.count();
  const countRolesPermisos = await RolesPermisos.count();

      //Circunscripciones
      if(countCircunscripciones === 0){
        await cargarCircunscripciones();
    }else{
        console.log('Ya existen circunscripciones en la base de datos');
    };



  if (countRoles === 0) {
    await cargarRoles();
  } else {
    console.log("Ya existen roles en la base de datos");
  }

  if (countPermisos === 0) {
    await cargarPermisos();
  } else {
    console.log("Ya existen permisos en la base de datos");
  }
  if (countRolesPermisos === 0) {
    await asignarPermisos();
    console.log("Permisos asignados con éxito!");
  } else {
    console.log("Ya existen roles_permisos en la base de datos");
  }

  if (countUsuarios === 0) {
    //Generar password encriptado con bcrypt
    const password = "admin";
    const salt = await bcrypt.genSalt(10);
    //Usuario por defecto
    const passwordHash = await bcrypt.hash(password, salt);
    await Usuario.bulkCreate({
      nombre: "Administrator",
      apellido: "Administrator",
      username: "admin",
      password: passwordHash,
      rol_id: 1,
    });
  } else {
    console.log("Ya existen usuarios en la base de datos");
  }
  //Departamentos
  if (countDepartamentos === 0) {
    const Departamentos = [
      "Formosa",
      "Pilcomayo",
      "Pilagás",
      "Bermejo",
      "Pirané",
      "Laishi",
      "Patiño",
      "Ramon_Lista",
      "Matacos",
    ];
    Departamentos.forEach(async (departamento) => {
      await Departamento.create({ nombre: departamento });
    });
    console.log("Departamentos cargados con éxito!");
  } else {
    console.log("Ya existen departamentos en la base de datos");
  }
  //Localidades
  if (countLocalidades === 0) {
    await cargarLocalidades();
    console.log("Localidades cargadas con éxito!");
  } else {
    console.log("Ya existen localidades en la base de datos");
  };


    //Juzgados
    if(countJuzgados === 0){
        await cargarJuzgados();
    }else{
        console.log('Ya existen juzgados en la base de datos');
    }

};

export default {
  Circunscripcion,
  Departamento,
  ExpedienteDetenidos,
  Expediente,
  Files,
  Juzgado,
  Usuario,
  Rol,
  Permisos,
  Localidad,
  OrigenExpediente,
  TipoExpediente,
  Detenido,
  Persona,
  RolesPermisos,
};
