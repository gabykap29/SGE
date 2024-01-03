import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';

const RolesPermisos = sequelize.define('roles_permisos',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    rol_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    permiso_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
},{
    timestamps:false,
    sequelize,
    modelName:'roles_permisos',
    tableName:'roles_permisos',
});

export default RolesPermisos;