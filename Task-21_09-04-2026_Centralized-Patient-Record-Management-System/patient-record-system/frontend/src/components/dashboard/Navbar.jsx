import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow-md p-5 flex justify-between items-center rounded-xl">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="text-right">
        <p className="font-semibold">{user?.name}</p>

        <p className="text-gray-500 text-sm capitalize">{user?.role}</p>
      </div>
    </div>
  );
}

export default Navbar;
