import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';

const Circunscripcion = sequelize.define('circunscripcion',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
},{
    timestamps:false,
    sequelize,
    modelName:'circunscripcion',
    tableName:'circunscripcion',
});


export default Circunscripcion;