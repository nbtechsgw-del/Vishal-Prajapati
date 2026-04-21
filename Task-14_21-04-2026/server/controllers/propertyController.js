import { Property } from "../models/index.js";

export const createProperty = async (req, res) => {
  try {
    const { title, location, price, image, beds, baths, size, description } =
      req.body;

    const property = await Property.create({
      title,
      location,
      price,
      image,
      beds,
      baths,
      size,
      description,
      agentId: req.user.id, 
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.agentId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await property.update(req.body);

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.agentId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await property.destroy();

    res.json({ message: "Property deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
