import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AgentDashboard() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "agent") {
    return (
      <p style={{ padding: "120px", textAlign: "center" }}>Access denied</p>
    );
  }

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await API.get("/properties/my");
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/properties/${id}`);
      fetchProperties();
    } catch (err) {
      alert("Delete failed", err);
    }
  };

  return (
    <div className="dashboard">
      <h1>Agent Dashboard</h1>

      <button
        className="btn"
        onClick={() => navigate("/add-property")}
        style={{ marginBottom: "20px" }}
      >
        + Add Property
      </button>

      <div className="property-grid">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          properties.map((p) => (
            <div key={p.id} className="card">
              <div className="card-img">
                <img src={p.image} alt={p.title} />
                <span className="price">₹{p.price}</span>
              </div>

              <div className="card-content">
                <h3>{p.title}</h3>
                <p>{p.location}</p>

                <div className="details">
                  <span>🛏 {p.beds}</span>
                  <span>🛁 {p.baths}</span>
                  <span>📐 {p.size}</span>
                </div>

                <div className="card-actions">
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/edit-property/${p.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
