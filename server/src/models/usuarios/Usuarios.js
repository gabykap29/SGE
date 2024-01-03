import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

const Usuario = sequelize.define(
  "usuario",
  {
    id: {
      DataTypes: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
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
  },
  {
    timestamps: false,
    sequelize,
    modelName: "usuario",
    tableName: "usuario",
  }
);

export default Usuario;