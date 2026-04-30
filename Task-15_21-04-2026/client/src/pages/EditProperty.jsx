import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    beds: "",
    baths: "",
    size: "",
    description: "",
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await API.get(`/properties/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/properties/${id}`, form);
      alert("Updated");
      navigate("/agent");
    } catch (err) {
      alert("Update failed", err);
    }
  };

  return (
    <main>
      <div className="page-center">
        <div className="form-container">
          <h2>Edit Property</h2>

          <input
            value={form.title || ""}
            placeholder="Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            value={form.location || ""}
            placeholder="Location"
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <input
            type="number"
            value={form.price || ""}
            placeholder="Price"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            value={form.image || ""}
            placeholder="Image URL"
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="image-preview"
              style={{
                width: "100%",
                borderRadius: "10px",
                marginBottom: "10px",
                height: "200px",
                objectFit: "cover",
              }}
            />
          )}

          <input
            type="number"
            value={form.beds || ""}
            placeholder="Beds"
            onChange={(e) => setForm({ ...form, beds: e.target.value })}
          />

          <input
            type="number"
            value={form.baths || ""}
            placeholder="Baths"
            onChange={(e) => setForm({ ...form, baths: e.target.value })}
          />

          <input
            value={form.size || ""}
            placeholder="Size"
            onChange={(e) => setForm({ ...form, size: e.target.value })}
          />

          <textarea
            value={form.description || ""}
            placeholder="Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <button className="btn" onClick={handleUpdate}>
            Update Property
          </button>
        </div>
      </div>
    </main>
  );
}
