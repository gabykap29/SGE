import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';

const Files = sequelize.define('files',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    url:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    expediente_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
},{
    timestamps:false,
    sequelize,
    modelName:'files',
    tableName:'files',
});
