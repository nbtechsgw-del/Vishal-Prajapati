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

  // APPOINTMENT STATUS DATA
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

  // OVERVIEW DATA
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

        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-3xl shadow-xl">
          <p className="text-cyan-100">Total Patients</p>

          <h2 className="text-5xl font-bold mt-4">{stats.totalPatients}</h2>

          <span className="inline-block mt-4 bg-white/20 px-4 py-1 rounded-full text-sm">
            +12% this month
          </span>
        </div>

        {/* APPOINTMENTS */}

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-3xl shadow-xl">
          <p className="text-green-100">Appointments</p>

          <h2 className="text-5xl font-bold mt-4">{stats.totalAppointments}</h2>

          <span className="inline-block mt-4 bg-white/20 px-4 py-1 rounded-full text-sm">
            89% success rate
          </span>
        </div>

        {/* REVENUE */}

        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-3xl shadow-xl">
          <p className="text-purple-100">Revenue</p>

          <h2 className="text-5xl font-bold mt-4">₹{stats.totalRevenue}</h2>

          <span className="inline-block mt-4 bg-white/20 px-4 py-1 rounded-full text-sm">
            +18% growth
          </span>
        </div>
      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BAR CHART */}

        <div className="bg-white p-6 rounded-3xl shadow-xl">
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

        <div className="bg-white p-6 rounded-3xl shadow-xl">
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

      {/* EXTRA ANALYTICS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* TOP DEPARTMENTS */}

        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Top Departments</h2>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <span>Cardiology</span>

                <span>85%</span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="bg-cyan-500 h-3 rounded-full w-[85%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Neurology</span>

                <span>72%</span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="bg-blue-500 h-3 rounded-full w-[72%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Dermatology</span>

                <span>64%</span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="bg-purple-500 h-3 rounded-full w-[64%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* HOSPITAL PERFORMANCE */}

        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Hospital Performance</h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Appointment Completion</h3>

                <p className="text-gray-500 text-sm">
                  Successful consultations
                </p>
              </div>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
                89%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Patient Satisfaction</h3>

                <p className="text-gray-500 text-sm">Overall hospital rating</p>
              </div>

              <span className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full font-medium">
                94%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">System Efficiency</h3>

                <p className="text-gray-500 text-sm">Operational performance</p>
              </div>

              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium">
                96%
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
