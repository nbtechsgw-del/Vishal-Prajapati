function DashboardCard({
  title,
  value,
  icon,
  change = "+12%",
  changeType = "increase",
}) {
  return (
    <div className="group relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 right-0 w-30 h-30 bg-cyan-100 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition"></div>

      <div className="relative flex items-center justify-between">
        {/* LEFT CONTENT */}
        <div>
          <p className="text-gray-500 font-medium text-sm uppercase tracking-wide">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-3">{value}</h2>

          {/* TREND */}
          <div className="mt-4 flex items-center gap-2">
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full
              
              ${
                changeType === "increase"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {change}
            </span>

            <span className="text-sm text-gray-500">This month</span>
          </div>
        </div>

        {/* ICON */}
        <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
