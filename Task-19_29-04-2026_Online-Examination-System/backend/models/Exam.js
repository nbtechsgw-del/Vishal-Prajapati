import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Exam = sequelize.define("Exam", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timeLimit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Exam;
