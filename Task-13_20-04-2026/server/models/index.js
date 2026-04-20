const User = require("./User");
const Property = require("./Property");
const Booking = require("./Booking");

User.hasMany(Property, { foreignKey: "agentId" });
Property.belongsTo(User, { foreignKey: "agentId" });

User.hasMany(Booking, { foreignKey: "userId" });
Property.hasMany(Booking, { foreignKey: "propertyId" });

Booking.belongsTo(User, { foreignKey: "userId" });
Booking.belongsTo(Property, { foreignKey: "propertyId" });

module.exports = { User, Booking, Property };
