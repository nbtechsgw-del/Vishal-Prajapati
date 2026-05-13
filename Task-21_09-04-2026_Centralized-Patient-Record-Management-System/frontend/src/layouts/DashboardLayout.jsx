import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex">
      {/* SIDEBAR */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <div className="sticky top-0 z-40 px-4 md:px-6 pt-4">
          <Navbar />
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-sm border border-gray-200 min-h-[calc(100vh-120px)] p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
