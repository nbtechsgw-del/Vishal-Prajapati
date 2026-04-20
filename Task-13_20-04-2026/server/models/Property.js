const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Property = sequelize.define("Property", {
  title: DataTypes.STRING,
  location: DataTypes.STRING,
  price: DataTypes.INTEGER,
  image: DataTypes.STRING,
  beds: DataTypes.INTEGER,
  baths: DataTypes.INTEGER,
  size: DataTypes.STRING,
  description: DataTypes.TEXT,
});

module.exports = Property;
