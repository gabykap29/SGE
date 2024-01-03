import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

const Juzgado = sequelize.define(
  "juzgado",
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
    circunscripcion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: "juzgado",
    tableName: "juzgado",
  }
);

export default Juzgado;
