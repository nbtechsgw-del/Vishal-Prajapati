import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ExamQuestion = sequelize.define("ExamQuestion", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  examId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Exams",
      key: "id",
    },
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Questions",
      key: "id",
    },
  },
});

export default ExamQuestion;
