import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';

const Detenido = sequelize.define('detenido',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    persona_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    fecha_detencion:{
        type:DataTypes.DATE,
        allowNull:false
    },
},{
    timestamps:false,
    sequelize,
    modelName:'detenido',
    tableName:'detenido',
});

export default Detenido;