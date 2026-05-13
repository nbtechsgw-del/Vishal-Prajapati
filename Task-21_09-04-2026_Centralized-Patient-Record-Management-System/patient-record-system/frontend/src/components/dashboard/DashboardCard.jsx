function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-gray-500 text-lg">{title}</h3>

        <h2 className="text-3xl font-bold mt-2">{value}</h2>
      </div>

      <div className="text-4xl text-blue-600">{icon}</div>
    </div>
  );
}

export default DashboardCard;
