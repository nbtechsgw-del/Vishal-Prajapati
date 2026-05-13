import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

import toast from "react-hot-toast";

import EditPatientModal from "../components/dashboard/EditPatientModal";

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
      console.log(error);
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

      toast.success("Patient added");

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
      {/* ADD FORM */}

      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-6">Add Patient</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
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
            placeholder="Blood Group"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact"
            value={formData.emergencyContact}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 md:col-span-2"
          >
            Add Patient
          </button>
        </form>
      </div>

      {/* TABLE SECTION */}

      <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Patient Records</h2>

          <input
            type="text"
            placeholder="Search name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg w-full md:w-80"
          />
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="text-center py-10">Loading patients...</div>
        ) : currentPatients.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No patients found
          </div>
        ) : (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Patient ID</th>

                  <th className="p-3 text-left">Name</th>

                  <th className="p-3 text-left">Age</th>

                  <th className="p-3 text-left">Gender</th>

                  <th className="p-3 text-left">Phone</th>

                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentPatients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{patient.patientId}</td>

                    <td className="p-3">{patient.name}</td>

                    <td className="p-3">{patient.age}</td>

                    <td className="p-3">{patient.gender}</td>

                    <td className="p-3">{patient.phone}</td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => setSelectedPatient(patient)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deletePatient(patient.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}

            <div className="flex justify-center gap-2 mt-6">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
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
