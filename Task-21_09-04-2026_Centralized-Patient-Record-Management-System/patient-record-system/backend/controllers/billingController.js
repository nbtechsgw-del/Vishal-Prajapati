import Billing from "../models/Billing.js";

import Patient from "../models/Patient.js";

import { Op } from "sequelize";

// GENERATE BILL
export const createBill = async (req, res) => {
  try {
    const { patientId, treatment, amount, paymentMethod } = req.body;

    const bill = await Billing.create({
      billId: "BILL" + Date.now(),

      PatientId: patientId,

      treatment,

      amount,

      paymentMethod,
    });

    res.status(201).json({
      message: "Invoice generated",
      bill,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL BILLS
export const getBills = async (req, res) => {
  try {
    const { status } = req.query;

    let whereClause = {};

    if (status) {
      whereClause.paymentStatus = status;
    }

    const bills = await Billing.findAll({
      where: whereClause,

      include: [
        {
          model: Patient,
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PAYMENT STATUS
export const updatePaymentStatus = async (req, res) => {
  try {
    const bill = await Billing.findByPk(req.params.id);

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    bill.paymentStatus = req.body.paymentStatus;

    await bill.save();

    res.status(200).json({
      message: "Payment updated",
      bill,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE BILL
export const deleteBill = async (req, res) => {
  try {
    const bill = await Billing.findByPk(req.params.id);

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    await bill.destroy();

    res.status(200).json({
      message: "Bill deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// TOTAL REVENUE
export const getRevenue = async (req, res) => {
  try {
    const bills = await Billing.findAll({
      where: {
        paymentStatus: "Paid",
      },
    });

    const revenue = bills.reduce((total, bill) => total + bill.amount, 0);

    res.status(200).json({
      revenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
