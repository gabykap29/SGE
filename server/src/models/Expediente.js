import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

const Expediente = sequelize.define(
  "expediente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo_expediente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    localidad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    juzgado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_origen: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    resumen: {
      type: DataTypes.STRING(750),
      allowNull: false,
    },
    secuestros: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 1 es completado, 2 es vencido y 3 es en curso
    estado: {
      type: DataTypes.STRING,
      defaultValue:3
    },
    secretario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_elevacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    files_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    creador:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_modificador:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    origen_expediente_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    //para eliminado logico
    state:{
      type: DataTypes.BOOLEAN,
      defaultValue:true,
    }
  },
  {
    timestamps: false,
    sequelize,
    modelName: "expediente",
    tableName: "expediente",
  }
);

export default Expediente;
