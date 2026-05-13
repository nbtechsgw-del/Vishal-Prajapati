import MedicalRecord from "../models/MedicalRecord.js";
import Patient from "../models/Patient.js";
import User from "../models/User.js";

// ADD RECORD
export const addMedicalRecord = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      diagnosis,
      prescription,
      doctorNotes,
      visitDate,
    } = req.body;

    const labReport = req.file ? req.file.filename : null;

    const record = await MedicalRecord.create({
      recordId: "MR" + Date.now(),
      PatientId: patientId,
      doctorId,
      diagnosis,
      prescription,
      doctorNotes,
      visitDate,
      labReport,
    });

    res.status(201).json({
      message: "Medical record added",
      record,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL RECORDS
export const getMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.findAll({
      include: [
        {
          model: Patient,
        },
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET PATIENT HISTORY
export const getPatientHistory = async (req, res) => {
  try {
    const records = await MedicalRecord.findAll({
      where: {
        PatientId: req.params.patientId,
      },

      include: [
        {
          model: Patient,
        },
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE RECORD
export const updateMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByPk(req.params.id);

    if (!record) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    await record.update(req.body);

    res.status(200).json({
      message: "Record updated",
      record,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE RECORD
export const deleteMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByPk(req.params.id);

    if (!record) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    await record.destroy();

    res.status(200).json({
      message: "Record deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
