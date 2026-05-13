import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function AdminDashboard() {
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState(null);

  // FETCH ANALYTICS
  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get("/analytics/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!stats) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-xl">Loading Dashboard...</div>
      </DashboardLayout>
    );
  }

  // CHART DATA
  const appointmentData = [
    {
      name: "Pending",
      value: stats.appointmentStats.pending,
    },

    {
      name: "Completed",
      value: stats.appointmentStats.completed,
    },

    {
      name: "Cancelled",
      value: stats.appointmentStats.cancelled,
    },
  ];

  const overviewData = [
    {
      name: "Patients",
      value: stats.totalPatients,
    },

    {
      name: "Appointments",
      value: stats.totalAppointments,
    },

    {
      name: "Revenue",
      value: stats.totalRevenue,
    },
  ];

  return (
    <DashboardLayout>
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">Hospital Analytics Dashboard</h1>

        <p className="text-gray-500 mt-2">Real-time healthcare insights</p>
      </div>

      {/* STATS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* PATIENTS */}

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-gray-500">Total Patients</h3>

          <p className="text-4xl font-bold mt-3">{stats.totalPatients}</p>
        </div>

        {/* APPOINTMENTS */}

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-gray-500">Total Appointments</h3>

          <p className="text-4xl font-bold mt-3">{stats.totalAppointments}</p>
        </div>

        {/* REVENUE */}

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-gray-500">Total Revenue</h3>

          <p className="text-4xl font-bold mt-3">₹{stats.totalRevenue}</p>
        </div>
      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BAR CHART */}

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">System Overview</h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overviewData}>
                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">Appointment Status</h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appointmentData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >
                  <Cell />

                  <Cell />

                  <Cell />
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
