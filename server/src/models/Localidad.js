import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

const Localidad = sequelize.define(
  "localidad",
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
    departamento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: "localidad",
    tableName: "localidad",
  }
);

export default Localidad;
