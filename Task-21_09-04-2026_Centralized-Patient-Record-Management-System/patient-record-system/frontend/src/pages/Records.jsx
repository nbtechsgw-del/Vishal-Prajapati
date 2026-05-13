import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

import toast from "react-hot-toast";

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

      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-6">Add Medical Record</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* PATIENT */}

          <select
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Select Patient</option>

            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>

          {/* DOCTOR */}

          <select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Select Doctor</option>

            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="visitDate"
            value={formData.visitDate}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="file"
            name="labReport"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <textarea
            name="diagnosis"
            placeholder="Diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
            required
          />

          <textarea
            name="prescription"
            placeholder="Prescription"
            value={formData.prescription}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <textarea
            name="doctorNotes"
            placeholder="Doctor Notes"
            value={formData.doctorNotes}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 md:col-span-2"
          >
            Add Record
          </button>
        </form>
      </div>

      {/* RECORD TABLE */}

      <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6">Medical Records</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Record ID</th>

              <th className="p-3 text-left">Patient</th>

              <th className="p-3 text-left">Doctor</th>

              <th className="p-3 text-left">Visit Date</th>

              <th className="p-3 text-left">Diagnosis</th>

              <th className="p-3 text-left">Lab Report</th>

              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{record.recordId}</td>

                <td className="p-3">{record.Patient?.name}</td>

                <td className="p-3">Dr. {record.User?.name}</td>

                <td className="p-3">{record.visitDate}</td>

                <td className="p-3 max-w-xs truncate">{record.diagnosis}</td>

                <td className="p-3">
                  {record.labReport ? (
                    <a
                      href={`http://localhost:5000/uploads/${record.labReport}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  ) : (
                    "No File"
                  )}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => deleteRecord(record.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Records;
