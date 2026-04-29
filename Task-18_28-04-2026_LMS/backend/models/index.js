const sequelize = require("../config/database");
const Book = require("./Book");
const User = require("./User");
const Borrow = require("./Borrow");

User.hasMany(Borrow, { foreignKey: "userId", as: "borrows" });
Book.hasMany(Borrow, { foreignKey: "bookId", as: "borrows" });

Borrow.belongsTo(User, { foreignKey: "userId", as: "user" });
Borrow.belongsTo(Book, { foreignKey: "bookId", as: "book" });

module.exports = {
  sequelize,
  Book,
  User,
  Borrow,
};
