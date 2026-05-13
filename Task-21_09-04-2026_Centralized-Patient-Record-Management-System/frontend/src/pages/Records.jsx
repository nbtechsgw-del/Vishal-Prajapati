import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

import toast from "react-hot-toast";

import {
  FilePlus2,
  FileText,
  Upload,
  Trash2,
  ClipboardPlus,
  CalendarDays,
  UserRound,
  Stethoscope,
  Eye,
} from "lucide-react";

function Records() {
  const token = localStorage.getItem("token");

  const [patients, setPatients] = useState([]);

  const [doctors, setDoctors] = useState([]);

  const [records, setRecords] = useState([]);

  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    diagnosis: "",
    prescription: "",
    doctorNotes: "",
    visitDate: "",
    labReport: null,
  });

  // FETCH DATA
  const fetchData = async () => {
    try {
      const patientRes = await api.get("/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatients(patientRes.data);

      const doctorRes = await api.get("/auth/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDoctors(doctorRes.data);

      const recordRes = await api.get("/medical-records", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecords(recordRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    if (e.target.name === "labReport") {
      setFormData({
        ...formData,
        labReport: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // SUBMIT RECORD
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await api.post("/medical-records", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Medical record added");

      fetchData();

      setFormData({
        patientId: "",
        doctorId: "",
        diagnosis: "",
        prescription: "",
        doctorNotes: "",
        visitDate: "",
        labReport: null,
      });
    } catch (error) {
      toast.error("Failed to add record", error);
    }
  };

  // DELETE RECORD
  const deleteRecord = async (id) => {
    if (!window.confirm("Delete record?")) {
      return;
    }

    try {
      await api.delete(`/medical-records/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Record deleted");

      fetchData();
    } catch (error) {
      toast.error("Delete failed", error);
    }
  };

  return (
    <DashboardLayout>
      {/* ADD RECORD FORM */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 mb-8">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-linear-to-r from-cyan-500 to-blue-600 p-3 rounded-2xl text-white shadow-lg">
            <FilePlus2 size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Add Medical Record
            </h2>

            <p className="text-gray-500 mt-1">
              Create a new patient medical report
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* PATIENT */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Select Patient
            </label>

            <div className="relative mt-2">
              <UserRound
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition"
                required
              >
                <option value="">Select Patient</option>

                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DOCTOR */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Select Doctor
            </label>

            <div className="relative mt-2">
              <Stethoscope
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition"
                required
              >
                <option value="">Select Doctor</option>

                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* VISIT DATE */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Visit Date
            </label>

            <div className="relative mt-2">
              <CalendarDays
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition"
                required
              />
            </div>
          </div>

          {/* FILE */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Upload Lab Report
            </label>

            <div className="relative mt-2">
              <Upload
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="file"
                name="labReport"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition"
              />
            </div>
          </div>

          {/* DIAGNOSIS */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">
              Diagnosis
            </label>

            <textarea
              name="diagnosis"
              placeholder="Enter diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              rows="4"
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 transition resize-none"
              required
            />
          </div>

          {/* PRESCRIPTION */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">
              Prescription
            </label>

            <textarea
              name="prescription"
              placeholder="Enter prescription"
              value={formData.prescription}
              onChange={handleChange}
              rows="4"
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 transition resize-none"
            />
          </div>

          {/* DOCTOR NOTES */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">
              Doctor Notes
            </label>

            <textarea
              name="doctorNotes"
              placeholder="Additional notes"
              value={formData.doctorNotes}
              onChange={handleChange}
              rows="4"
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 transition resize-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="md:col-span-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition duration-300"
          >
            Add Medical Record
          </button>
        </form>
      </div>

      {/* RECORD TABLE */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Medical Records
            </h2>

            <p className="text-gray-500 mt-1">
              View all patient medical reports
            </p>
          </div>

          <div className="bg-cyan-100 text-cyan-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">
            <ClipboardPlus size={18} />
            Total: {records.length}
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                <th className="p-4 text-left rounded-l-2xl">Record ID</th>

                <th className="p-4 text-left">Patient</th>

                <th className="p-4 text-left">Doctor</th>

                <th className="p-4 text-left">Visit Date</th>

                <th className="p-4 text-left">Diagnosis</th>

                <th className="p-4 text-left">Lab Report</th>

                <th className="p-4 text-left rounded-r-2xl">Actions</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-100 hover:bg-cyan-50 transition"
                >
                  <td className="p-4 font-semibold text-cyan-600">
                    {record.recordId}
                  </td>

                  <td className="p-4 font-medium text-gray-800">
                    {record.Patient?.name}
                  </td>

                  <td className="p-4 text-gray-700">Dr. {record.User?.name}</td>

                  <td className="p-4 text-gray-600">{record.visitDate}</td>

                  <td className="p-4 max-w-xs truncate text-gray-600">
                    {record.diagnosis}
                  </td>

                  <td className="p-4">
                    {record.labReport ? (
                      <a
                        href={`http://localhost:5000/uploads/${record.labReport}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-200 transition"
                      >
                        <Eye size={16} />
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">No File</span>
                    )}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => deleteRecord(record.id)}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition shadow"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Records;
