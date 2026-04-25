import { Booking, Property } from "../models/index.js";

export const createBooking = async (req, res) => {
  try {
    const { propertyId, date } = req.body;

    const property = await Property.findByPk(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      propertyId,
      date,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: Property,
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAgentBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: {
        model: Property,
        where: { agentId: req.user.id },
      },
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.destroy();

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};