import { useState, useEffect } from "react";

import api from "../../services/api";

import toast from "react-hot-toast";

function EditPatientModal({ patient, onClose, fetchPatients }) {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    address: "",
    emergencyContact: "",
  });

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    }
  }, [patient]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/patients/${patient.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Patient updated");

      fetchPatients();

      onClose();
    } catch (error) {
      toast.error("Update failed", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Patient</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="border p-3 rounded-lg"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            placeholder="Blood Group"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            placeholder="Emergency Contact"
            className="border p-3 rounded-lg"
          />

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-3 rounded-lg md:col-span-2"
          />

          <div className="flex gap-4 md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Update Patient
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPatientModal;
