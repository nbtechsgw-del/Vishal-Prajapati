import User from "./User.js";
import Property from "./Property.js";
import Booking from "./Booking.js";

User.hasMany(Property, { foreignKey: "agentId" });
Property.belongsTo(User, { foreignKey: "agentId" });

User.hasMany(Booking, { foreignKey: "userId" });
Property.hasMany(Booking, { foreignKey: "propertyId" });

Booking.belongsTo(User, { foreignKey: "userId" });
Booking.belongsTo(Property, { foreignKey: "propertyId" });

export { User, Property, Booking };
