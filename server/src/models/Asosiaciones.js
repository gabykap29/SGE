import Circunscripcion from "./Circunscripcion.js";
import Departamento from "./Departamento.js";
import ExpedienteDetenidos from "./ExpedienteDetenidos.js";
import Expediente from "./Expediente.js";
import Files from "./Files.js";
import Juzgado from "./Juzgados.js";
import Usuario from "./usuarios/Usuarios.js";
import Rol from "./usuarios/Roles.js";
import Permisos from "./usuarios/Permisos.js";
import Localidad from './Localidad.js'
import OrigenExpediente from './OrigenExpediente.js'
import TipoExpediente from "./TipoExpediente.js";
import Detenido from "./Detenidos.js";
import { sequelize } from "../database/database.js";
import Persona from './Personas.js'
import bcrypt from 'bcryptjs';
Departamento.hasMany(Localidad, { foreignKey: "departamento_id", as: "localidades" });
Localidad.belongsTo(Departamento, { foreignKey: "departamento_id", as: "departamento" });

Circunscripcion.hasMany(Juzgado, { foreignKey: "circunscripcion_id", as: "juzgados" });
Juzgado.belongsTo(Circunscripcion, { foreignKey: "circunscripcion_id", as: "circunscripcion" });

Juzgado.hasMany(Expediente, { foreignKey: "juzgado_id", as: "expedientes" });
Expediente.belongsTo(Juzgado, { foreignKey: "juzgado_id", as: "juzgado" });

Expediente.belongsToMany(Detenido, { through: ExpedienteDetenidos, as: "detenidos", foreignKey: "expediente_id" });
Detenido.belongsToMany(Expediente, { through: ExpedienteDetenidos, as: "expedientes", foreignKey: "detenido_id" });

Expediente.hasMany(Files, { foreignKey: "expediente_id", as: "files" });
Files.belongsTo(Expediente, { foreignKey: "expediente_id", as: "expediente" });

Expediente.belongsTo(OrigenExpediente, { foreignKey: "origen_expediente_id", as: "origen_expediente" });
OrigenExpediente.hasMany(Expediente, { foreignKey: "origen_expediente_id", as: "expedientes" });

Expediente.belongsTo(TipoExpediente, { foreignKey: "tipo_expediente_id", as: "tipo_expediente" });
TipoExpediente.hasMany(Expediente, { foreignKey: "tipo_expediente_id", as: "expedientes" });

Expediente.belongsTo(Localidad, { foreignKey: "localidad_id", as: "localidad" });
Localidad.hasMany(Expediente, { foreignKey: "localidad_id", as: "expedientes" });

Usuario.belongsTo(Rol, { foreignKey: "rol_id", as: "rol" });
Rol.hasMany(Usuario, { foreignKey: "rol_id", as: "usuarios" });

Rol.belongsToMany(Permisos, { through: "permisos_roles", as: "permisos", foreignKey: "rol_id" });
Permisos.belongsToMany(Rol, { through: "permisos_roles", as: "roles", foreignKey: "permiso_id" });

Detenido.belongsToMany(Persona, { through: "detenidos_personas", as: "personas", foreignKey: "detenido_id" });
Persona.belongsToMany(Detenido, { through: "detenidos_personas", as: "detenidos", foreignKey: "persona_id" });

sequelize.sync({force:false});



const comprobacionesDB = async () => {
    const countRoles = await Rol.count();
    const countPermisos = await Permisos.count();
    const countUsuarios = await Usuario.count();
    const countCircunscripciones = await Circunscripcion.count();
    const countDepartamentos = await Departamento.count();
    const countLocalidades = await Localidad.count();
    const countJuzgados = await Juzgado.count();
    const countRolesPermisos = await Rol.count();
    if (countRoles === 0) {
        await Rol.bulkCreate(
            {nombre: "Administrator"},
            {nombre: "User"},
            {nombre:"Supervisor"},
            {nombre:"Visualizer"})
    }else{
        console.log('Ya existen roles en la base de datos')
    };

    if(countPermisos === 0){
        await Permisos.bulkCreate(
            {nombre:"Crear Expediente"},
            {nombre:"Editar Expediente"},
            {nombre:"Eliminar Expediente"}, 
            {nombre:"Destruir Expediente"},
            {nombre:"Ver Expediente"},
            {nombre:"Crear Usuario"},
            {nombre:"Editar Usuario"},
            {nombre:"Eliminar Usuario"},
            {nombre:"Ver Usuario"},
            {nombre:"Crear Juzgado"},
            {nombre:"Editar Juzgado"},
            {nombre:"Eliminar Juzgado"},
            {nombre:"Crear Circunscripcion"},
            {nombre:"Editar Circunscripcion"},
            {nombre:"Eliminar Circunscripcion"},
            {nombre:"Crear Departamento"},
            {nombre:"Editar Departamento"},
            {nombre:"Eliminar Departamento"},
            {nombre:"Crear Localidad"},
            {nombre:"Editar Localidad"},
            {nombre:"Eliminar Localidad"},

        )
    }else{
        console.log('Ya existen permisos en la base de datos');
    };
    if(countRolesPermisos === 0){
        //Administrator
        await Rol.bulkCreate(
            {rol_id:1, permiso_id:1},
            {rol_id:1, permiso_id:2},
            {rol_id:1, permiso_id:3},
            {rol_id:1, permiso_id:4},
            {rol_id:1, permiso_id:5},
            {rol_id:1, permiso_id:6},
            {rol_id:1, permiso_id:7},
            {rol_id:1, permiso_id:8},
            {rol_id:1, permiso_id:9},
            {rol_id:1, permiso_id:10},
            {rol_id:1, permiso_id:11},
            {rol_id:1, permiso_id:12},
            {rol_id:1, permiso_id:13},
            {rol_id:1, permiso_id:14},
            {rol_id:1, permiso_id:15},
            {rol_id:1, permiso_id:16},
            {rol_id:1, permiso_id:17},
            {rol_id:1, permiso_id:18},
            {rol_id:1, permiso_id:19},
            {rol_id:1, permiso_id:20},
            {rol_id:1, permiso_id:21},
            //Supervisor
            {rol_id:3, permiso_id:1},
            {rol_id:3, permiso_id:2},
            {rol_id:3, permiso_id:3},
            {rol_id:3, permiso_id:5},
            {rol_id:3, permiso_id:9},
            //User
            {rol_id:2, permiso_id:1},
            {rol_id:2, permiso_id:5},
            //Visualizer
            {rol_id:4, permiso_id:5},
            {rol_id:4, permiso_id:9},
        );
    }else{
        console.log('Ya existen roles_permisos en la base de datos');
    };

    if (countUsuarios === 0) {
    //Generar password encriptado con bcrypt
    const password = "admin";
    const salt = await bcrypt.genSalt(10);
    //Usuario por defecto
    const passwordHash = await bcrypt.hash(password, salt);
        await Usuario.bulkCreate(
            { nombre: "Administrator", apellido: "Administrator",username:"admin", password:passwordHash, rol_id: 1 },
        );
}else{
    console.log('Ya existen usuarios en la base de datos');
};

    if(countDepartamentos === 0){
        const Departamentos = ['Formosa','Pilcomayo','Pilagás','Bermejo','Pirané','Laishi','Patiño','Ramon_Lista','Matacos'];
        Departamentos.forEach(async(departamento)=>{
            await Departamento.create({nombre:departamento})
        });
    }else{
        console.log('Ya existen departamentos en la base de datos');
    };
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
    Persona
}