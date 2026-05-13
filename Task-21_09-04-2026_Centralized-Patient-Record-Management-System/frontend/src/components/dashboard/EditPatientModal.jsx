import { useState, useEffect } from "react";

import { X, Save, UserCog } from "lucide-react";

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

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE PATIENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/patients/${patient.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Patient updated successfully");

      fetchPatients();

      onClose();
    } catch (error) {
      toast.error("Update failed", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      {/* MODAL */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl w-full max-w-3xl rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="bg-linear-to-r from-cyan-500 to-blue-600 p-3 rounded-2xl text-white shadow-lg">
              <UserCog size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">Edit Patient</h2>

              <p className="text-gray-500 text-sm mt-1">
                Update patient details
              </p>
            </div>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-red-100 hover:text-red-500 transition p-3 rounded-2xl"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* NAME */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Patient Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter patient name"
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition"
            />
          </div>

          {/* AGE */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Age</label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition"
            />
          </div>

          {/* GENDER */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition"
            >
              <option>Male</option>

              <option>Female</option>

              <option>Other</option>
            </select>
          </div>

          {/* BLOOD GROUP */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Blood Group
            </label>

            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              placeholder="Enter blood group"
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition"
            />
          </div>

          {/* EMERGENCY CONTACT */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Emergency Contact
            </label>

            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="Enter emergency contact"
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition"
            />
          </div>

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              placeholder="Enter address"
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition resize-none"
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-4">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition duration-300"
            >
              <Save size={18} />
              Update Patient
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-4 rounded-2xl transition"
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
