import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Question = sequelize.define("Question", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  optionA: DataTypes.STRING,
  optionB: DataTypes.STRING,
  optionC: DataTypes.STRING,
  optionD: DataTypes.STRING,
  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Question;
