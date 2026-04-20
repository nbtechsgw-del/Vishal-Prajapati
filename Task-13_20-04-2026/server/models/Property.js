import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

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

export default Property;
