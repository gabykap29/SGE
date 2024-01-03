import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';

const ExpedienteDetenidos = sequelize.define('expediente_detenidos',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    expediente_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    detenido_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }, 
},{
    timestamps:false,
    sequelize,
    modelName:'expediente_detenidos',
    tableName:'expediente_detenidos',
});

export default ExpedienteDetenidos;


