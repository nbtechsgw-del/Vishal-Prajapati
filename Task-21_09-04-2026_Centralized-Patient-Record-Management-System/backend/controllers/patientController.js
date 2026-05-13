import Patient from "../models/Patient.js";

import { Op } from "sequelize";

// ADD PATIENT
export const addPatient = async (req, res) => {
  try {
    const { name, age, gender, bloodGroup, phone, address, emergencyContact } =
      req.body;

    const patientId = "PAT" + Date.now();

    const patient = await Patient.create({
      patientId,
      name,
      age,
      gender,
      bloodGroup,
      phone,
      address,
      emergencyContact,
    });

    res.status(201).json({
      message: "Patient added successfully",
      patient,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL PATIENTS
export const getPatients = async (req, res) => {
  try {
    const { search } = req.query;

    let whereClause = {};

    // SEARCH BY NAME OR PHONE
    if (search) {
      whereClause = {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            phone: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }

    const patients = await Patient.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE PATIENT
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PATIENT
export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    await patient.update(req.body);

    res.status(200).json({
      message: "Patient updated successfully",
      patient,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PATIENT
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    await patient.destroy();

    res.status(200).json({
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
