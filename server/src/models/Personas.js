import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';

const Persona = sequelize.define('persona',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    dni:{
        type:DataTypes.INTEGER,
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
        type:DataTypes.STRING(50),
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
    departamento:{
        type:DataTypes.STRING(50),
        allowNull:false
    },    
});

export default Persona;