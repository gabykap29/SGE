import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

const Departamento = sequelize.define(
  "departamento",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: "departamento",
    tableName: "departamento",
  }
);

export default Departamento;
