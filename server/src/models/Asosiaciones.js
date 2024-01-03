import Circunscripcion from "./Circunscripcion.js";
import Departamento from "./Departamento.js";
import ExpedienteDetenidos from "./ExpedienteDetenidos.js";
import Expediente from "./Expediente.js";
import Files from "./Files.js";
import Juzgado from "./Juzgados.js";
import Usuario from "./Usuario.js";
import Rol from "./usuarios/Roles.js";
import Permisos from "./usuarios/Permisos.js";
import Localidad from './Localidad.js'
import OrigenExpediente from './OrigenExpediente.js'
import TipoExpediente from "./TipoExpediente.js";
import Detenido from "./Detenidos.js";

Departamento.hasMany(Localidad, { foreignKey: "departamento_id", as: "localidades" });
Localidad.belongsTo(Departamento, { foreignKey: "departamento_id", as: "departamento" });

Circunscripcion.hasMany(Juzgado, { foreignKey: "circunscripcion_id", as: "juzgados" });
Juzgado.belongsTo(Circunscripcion, { foreignKey: "circunscripcion_id", as: "circunscripcion" });

Juzgado.hasMany(Expediente, { foreignKey: "juzgado_id", as: "expedientes" });
Expediente.belongsTo(Juzgado, { foreignKey: "juzgado_id", as: "juzgado" });

Expediente.belongToMany(Detenido, { through: ExpedienteDetenidos, as: "detenidos", foreignKey: "expediente_id" });
Detenido.belongToMany(Expediente, { through: ExpedienteDetenidos, as: "expedientes", foreignKey: "detenido_id" });

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


Rol.belongToMany(Permisos, { through: "permisos_roles", as: "permisos", foreignKey: "rol_id" });
Permisos.belongToMany(Rol, { through: "permisos_roles", as: "roles", foreignKey: "permiso_id" });