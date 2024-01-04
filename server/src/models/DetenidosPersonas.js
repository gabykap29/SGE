import {sequelize} from '../database/database.js';

const DetenidosPersonas = sequelize.define('detenidos_personas',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    detenido_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    persona_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
},{
    timestamps:false,
    sequelize,
    modelName:'detenidos_personas',
    tableName:'detenidos_personas',
});

export default DetenidosPersonas;