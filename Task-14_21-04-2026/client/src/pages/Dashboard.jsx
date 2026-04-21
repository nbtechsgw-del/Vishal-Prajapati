import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [properties, setProperties] = useState([]);

  const token = localStorage.getItem("token");

  if (!token) {
    return <h2>Please login first</h2>;
  }

  const fetchProperties = async () => {
    const res = await API.get("/properties/my");
    setProperties(res.data);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/properties/${id}`);
    fetchProperties();
  };

  return (
    <div>
      <div className="container">
        <h1>My Properties</h1>

        <a href="/add-property">Add Property</a>

        {properties.map((p) => (
          <div key={p.id}>
            <h3>{p.title}</h3>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
            <a href={`/edit/${p.id}`}>Edit</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
