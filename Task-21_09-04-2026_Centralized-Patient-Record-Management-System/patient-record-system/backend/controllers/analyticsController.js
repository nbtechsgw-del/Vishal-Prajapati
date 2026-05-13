import Patient from "../models/Patient.js";

import Appointment from "../models/Appointment.js";

import Billing from "../models/Billing.js";

// DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {
    // TOTAL PATIENTS
    const totalPatients = await Patient.count();

    // TOTAL APPOINTMENTS
    const totalAppointments = await Appointment.count();

    // TOTAL REVENUE
    const paidBills = await Billing.findAll({
      where: {
        paymentStatus: "Paid",
      },
    });

    const totalRevenue = paidBills.reduce(
      (total, bill) => total + bill.amount,
      0,
    );

    // APPOINTMENT STATUS
    const pendingAppointments = await Appointment.count({
      where: {
        status: "Pending",
      },
    });

    const completedAppointments = await Appointment.count({
      where: {
        status: "Completed",
      },
    });

    const cancelledAppointments = await Appointment.count({
      where: {
        status: "Cancelled",
      },
    });

    res.status(200).json({
      totalPatients,

      totalAppointments,

      totalRevenue,

      appointmentStats: {
        pending: pendingAppointments,
        completed: completedAppointments,
        cancelled: cancelledAppointments,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
