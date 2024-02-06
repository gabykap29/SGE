import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';
import Expediente from './Expediente.js';
import Persona from './Personas.js';
const ExpedientePersona = sequelize.define('expediente_persona',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    expediente_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    persona_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
},{
    timestamps:false,
    sequelize,
    modelName:'expediente_persona',
    tableName:'expediente_persona',
});

export default ExpedientePersona;