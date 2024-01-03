import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';

const Permisos = sequelize.define('permisos',{
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
    modelName:'permisos',
    tableName:'permisos',
});

export default Permisos;