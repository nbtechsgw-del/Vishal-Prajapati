import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }
};

export const isAgent = (req, res, next) => {
  if (req.user.role !== "agent") {
    return res.status(403).json({ message: "Agent access only" });
  }
  next();
};
