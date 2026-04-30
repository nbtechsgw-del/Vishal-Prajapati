import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddProperty() {
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

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await API.post("/properties", form);
      alert("Property added");
      navigate("/agent");
    } catch (err) {
      alert("Error adding property", err);
    }
  };

  return (
    <main>
      <div className="form-container">
        <h2>Add Property</h2>

        <input
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Image URL"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        {form.image && (
          <img
            src={form.image}
            alt="preview"
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
          placeholder="Beds"
          onChange={(e) => setForm({ ...form, beds: e.target.value })}
        />

        <input
          type="number"
          placeholder="Baths"
          onChange={(e) => setForm({ ...form, baths: e.target.value })}
        />

        <input
          placeholder="Size"
          onChange={(e) => setForm({ ...form, size: e.target.value })}
        />

        <textarea
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="btn" onClick={handleSubmit}>
          Add Property
        </button>
      </div>
    </main>
  );
}
