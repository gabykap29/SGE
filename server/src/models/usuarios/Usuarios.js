import { sequelize } from "../../database/database.js";
import { DataTypes } from "sequelize";

const Usuario = sequelize.define(
  "usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estado:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    
  },
  {
    timestamps: false,
    sequelize,
    modelName: "usuario",
    tableName: "usuario",
  }
);

export default Usuario;