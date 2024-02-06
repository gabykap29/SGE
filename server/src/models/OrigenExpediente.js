import {sequelize} from "../database/database.js";
import {DataTypes} from "sequelize";
import Expediente from "./Expediente.js";

const OrigenExpediente = sequelize.define('origen_expediente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

}, {
    timestamps: false,
    sequelize,
    modelName: 'origen_expediente',
    tableName: 'origen_expediente',
});

export default OrigenExpediente;