import {sequelize} from '../../database/database.js';
import {DataTypes} from 'sequelize';

const Rol = sequelize.define('rol',{
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
    modelName:'rol',
    tableName:'rol',
});

export default Rol;