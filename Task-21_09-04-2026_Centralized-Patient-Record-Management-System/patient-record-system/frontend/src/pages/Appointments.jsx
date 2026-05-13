import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

import toast from "react-hot-toast";

function Appointments() {
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);

  const [patients, setPatients] = useState([]);

  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  // FETCH APPOINTMENTS
  const fetchAppointments = async () => {
    try {
      const { data } = await api.get("/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(data);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH PATIENTS
  const fetchPatients = async () => {
    try {
      const { data } = await api.get("/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH DOCTORS
  const fetchDoctors = async () => {
    try {
      const { data } = await api.get("/auth/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDoctors(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();

    fetchPatients();

    fetchDoctors();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // BOOK APPOINTMENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/appointments", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Appointment booked");

      fetchAppointments();

      setFormData({
        patientId: "",
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
      });
    } catch (error) {
      toast.error("Booking failed", error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await api.put(
        `/appointments/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Status updated");

      fetchAppointments();
    } catch (error) {
      toast.error("Update failed", error);
    }
  };

  // DELETE APPOINTMENT
  const deleteAppointment = async (id) => {
    if (!window.confirm("Cancel appointment?")) {
      return;
    }

    try {
      await api.delete(`/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Appointment cancelled");

      fetchAppointments();
    } catch (error) {
      toast.error("Delete failed", error);
    }
  };

  // STATUS BADGE
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <DashboardLayout>
      {/* BOOK FORM */}

      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-6">Book Appointment</h2>

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
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <textarea
            name="reason"
            placeholder="Reason for appointment"
            value={formData.reason}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 md:col-span-2"
          >
            Book Appointment
          </button>
        </form>
      </div>

      {/* APPOINTMENT TABLE */}

      <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Appointment Records</h2>

          <div className="flex gap-4">
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
              Total: {appointments.length}
            </div>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Appointment ID</th>

              <th className="p-3 text-left">Patient</th>

              <th className="p-3 text-left">Doctor</th>

              <th className="p-3 text-left">Date</th>

              <th className="p-3 text-left">Time</th>

              <th className="p-3 text-left">Status</th>

              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{appointment.appointmentId}</td>

                <td className="p-3">{appointment.Patient?.name}</td>

                <td className="p-3">Dr. {appointment.User?.name}</td>

                <td className="p-3">{appointment.appointmentDate}</td>

                <td className="p-3">{appointment.appointmentTime}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      appointment.status,
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2 flex-wrap">
                  <button
                    onClick={() => updateStatus(appointment.id, "Confirmed")}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => updateStatus(appointment.id, "Completed")}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => deleteAppointment(appointment.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
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

export default Appointments;
