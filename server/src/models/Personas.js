import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';

const Persona = sequelize.define('persona',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    dni:{
        type:DataTypes.STRING,
        allowNull:false
    },
    apellido:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    domicilio:{
        type:DataTypes.STRING,
        allowNull:false
    },
    clase:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    localidad:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    observaciones:{
        type:DataTypes.STRING,
        allowNull:true
    },
});

export default Persona;