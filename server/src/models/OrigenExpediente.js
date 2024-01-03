import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';

const OrigenExpediente = sequelize.define('origen_expediente',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    expediente_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    persona_id:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    juzgado_id:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
},{
    timestamps:false,
    sequelize,
    modelName:'origen_expediente',
    tableName:'origen_expediente',
});

export default OrigenExpediente;