import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

import toast from "react-hot-toast";

import EditPatientModal from "../components/dashboard/EditPatientModal";

import { Search, UserPlus } from "lucide-react";

function Patients() {
  const token = localStorage.getItem("token");

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedPatient, setSelectedPatient] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const patientsPerPage = 5;

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    bloodGroup: "",
    phone: "",
    address: "",
    emergencyContact: "",
  });

  // FETCH PATIENTS
  const fetchPatients = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/patients?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatients(data);
    } catch (error) {
      toast.error("Failed to fetch patients", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [search]);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD PATIENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/patients", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Patient added successfully");

      fetchPatients();

      setFormData({
        name: "",
        age: "",
        gender: "Male",
        bloodGroup: "",
        phone: "",
        address: "",
        emergencyContact: "",
      });
    } catch (error) {
      toast.error("Failed to add patient", error);
    }
  };

  // DELETE PATIENT
  const deletePatient = async (id) => {
    if (!window.confirm("Delete this patient?")) {
      return;
    }

    try {
      await api.delete(`/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Patient deleted");

      fetchPatients();
    } catch (error) {
      toast.error("Delete failed", error);
    }
  };

  // PAGINATION
  const indexOfLastPatient = currentPage * patientsPerPage;

  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;

  const currentPatients = patients.slice(
    indexOfFirstPatient,
    indexOfLastPatient,
  );

  const totalPages = Math.ceil(patients.length / patientsPerPage);

  return (
    <DashboardLayout>
      {/* ADD PATIENT FORM */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-cyan-500 p-3 rounded-2xl text-white shadow-lg">
            <UserPlus size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Add New Patient
            </h2>

            <p className="text-gray-500 mt-1">Enter patient details below</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* NAME */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Patient Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter patient name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition"
              required
            />
          </div>

          {/* AGE */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Age</label>

            <input
              type="number"
              name="age"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition"
              required
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
              placeholder="Enter blood group"
              value={formData.bloodGroup}
              onChange={handleChange}
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
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
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
              placeholder="Enter emergency contact"
              value={formData.emergencyContact}
              onChange={handleChange}
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
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition resize-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="md:col-span-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition duration-300"
          >
            Add Patient
          </button>
        </form>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 overflow-hidden">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Patient Records
            </h2>

            <p className="text-gray-500 mt-1">View and manage all patients</p>
          </div>

          {/* SEARCH */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition w-full md:w-80"
            />
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-10 text-gray-500 text-lg">
            Loading patients...
          </div>
        ) : currentPatients.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-lg">
            No patients found
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                    <th className="p-4 text-left rounded-l-2xl">Patient ID</th>

                    <th className="p-4 text-left">Name</th>

                    <th className="p-4 text-left">Age</th>

                    <th className="p-4 text-left">Gender</th>

                    <th className="p-4 text-left">Phone</th>

                    <th className="p-4 text-left rounded-r-2xl">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-b border-gray-100 hover:bg-cyan-50 transition"
                    >
                      <td className="p-4 font-semibold text-cyan-600">
                        {patient.patientId}
                      </td>

                      <td className="p-4 font-medium text-gray-800">
                        {patient.name}
                      </td>

                      <td className="p-4 text-gray-600">{patient.age}</td>

                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                          {patient.gender}
                        </span>
                      </td>

                      <td className="p-4 text-gray-600">{patient.phone}</td>

                      <td className="p-4 flex gap-3">
                        <button
                          onClick={() => setSelectedPatient(patient)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl transition shadow"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deletePatient(patient.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition shadow"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center gap-3 mt-8 flex-wrap">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-5 py-3 rounded-2xl font-semibold transition ${
                    currentPage === index + 1
                      ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* EDIT MODAL */}
      {selectedPatient && (
        <EditPatientModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
          fetchPatients={fetchPatients}
        />
      )}
    </DashboardLayout>
  );
}

export default Patients;
