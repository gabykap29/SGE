import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';

const TipoExpediente = sequelize.define('expediente_detenidos',{
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
    modelName:'tipo_expediente',
    tableName:'tipo_expediente',
});

export default TipoExpediente;