import Appointment from "../models/Appointment.js";

import Patient from "../models/Patient.js";

import User from "../models/User.js";

// BOOK APPOINTMENT
export const bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, appointmentTime, reason } =
      req.body;

    const appointment = await Appointment.create({
      appointmentId: "APT" + Date.now(),

      PatientId: patientId,

      doctorId,

      appointmentDate,

      appointmentTime,

      reason,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL APPOINTMENTS
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: Patient,
        },
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE STATUS
export const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    appointment.status = req.body.status;

    await appointment.save();

    res.status(200).json({
      message: "Status updated",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE APPOINTMENT
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    await appointment.destroy();

    res.status(200).json({
      message: "Appointment cancelled",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
