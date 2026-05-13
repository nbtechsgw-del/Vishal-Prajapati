import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

import toast from "react-hot-toast";

import {
  CalendarPlus,
  CalendarCheck,
  Clock3,
  UserRound,
  Stethoscope,
} from "lucide-react";

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

  // STATUS COLORS
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
      {/* BOOK APPOINTMENT */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 mb-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-linear-to-r from-cyan-500 to-blue-600 p-3 rounded-2xl text-white shadow-lg">
            <CalendarPlus size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Book Appointment
            </h2>

            <p className="text-gray-500 mt-1">
              Create a new patient appointment
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

          {/* DATE */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Appointment Date
            </label>

            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 transition"
              required
            />
          </div>

          {/* TIME */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Appointment Time
            </label>

            <div className="relative mt-2">
              <Clock3
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition"
                required
              />
            </div>
          </div>

          {/* REASON */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">
              Reason For Appointment
            </label>

            <textarea
              name="reason"
              placeholder="Enter appointment reason"
              value={formData.reason}
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
            Book Appointment
          </button>
        </form>
      </div>

      {/* APPOINTMENT TABLE */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 overflow-hidden">
        {/* TABLE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Appointment Records
            </h2>

            <p className="text-gray-500 mt-1">View and manage appointments</p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">
            <CalendarCheck size={18} />
            Total: {appointments.length}
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                <th className="p-4 text-center rounded-l-2xl">
                  Appointment ID
                </th>

                <th className="p-4 text-center">Patient</th>

                <th className="p-4 text-center">Doctor</th>

                <th className="p-4 text-center">Date</th>

                <th className="p-4 text-center">Time</th>

                <th className="p-4 text-center">Status</th>

                <th className="p-4 text-center rounded-r-2xl">Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b border-gray-100 hover:bg-cyan-50 transition"
                >
                  <td className="p-4 font-semibold text-cyan-600 text-sm">
                    {appointment.appointmentId}
                  </td>

                  <td className="p-4 font-medium text-gray-800 text-sm">
                    {appointment.Patient?.name}
                  </td>

                  <td className="p-4 text-gray-700 text-sm">
                    Dr. {appointment.User?.name}
                  </td>

                  <td className="p-4 text-gray-600 text-sm">
                    {appointment.appointmentDate}
                  </td>

                  <td className="p-4 text-gray-600 text-sm">
                    {appointment.appointmentTime}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                        appointment.status,
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-3 flex-wrap">
                    <button
                      onClick={() => updateStatus(appointment.id, "Confirmed")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-xl transition shadow text-[12px]"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() => updateStatus(appointment.id, "Completed")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-xl transition shadow text-[12px]"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() => deleteAppointment(appointment.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl transition shadow text-[12px]"
                    >
                      Cancel
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

export default Appointments;
