import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Result = sequelize.define("Result", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  examId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Exams",
      key: "id",
    },
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  timeTaken: {
    type: DataTypes.INTEGER,
  },
});

export default Result;
