import DashboardLayout from "../layouts/DashboardLayout";

import DashboardCard from "../components/dashboard/DashboardCard";

import {
  FaUserInjured,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaFileMedical,
} from "react-icons/fa";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Patients"
          value="120"
          icon={<FaUserInjured />}
        />

        <DashboardCard
          title="Appointments"
          value="45"
          icon={<FaCalendarCheck />}
        />

        <DashboardCard
          title="Medical Records"
          value="80"
          icon={<FaFileMedical />}
        />

        <DashboardCard
          title="Revenue"
          value="$12,000"
          icon={<FaMoneyBillWave />}
        />
      </div>

      <div className="bg-white mt-8 p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Welcome to Hospital Management Dashboard
        </h2>

        <p className="text-gray-600">
          Manage patients, appointments, billing, and medical records
          efficiently from one centralized system.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
