const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Book = require("./Book");

const Borrow = sequelize.define(
  "Borrow",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id", 
    },

    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "book_id", 
    },

    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "borrow_date",
    },

    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "return_date",
    },

    status: {
      type: DataTypes.ENUM("borrowed", "returned"),
      allowNull: false,
      defaultValue: "borrowed",
    },
  },
  {
    tableName: "borrows",
    timestamps: true,
    underscored: true,
  },
);

module.exports = Borrow;
