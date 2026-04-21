import { useState } from "react";
import API from "../api/axios";

function AddProperty() {
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

  const handleSubmit = async () => {
    try {
      await API.post("/properties", form);
      alert("Property added");
    } catch (err) {
      alert("Failed : ", err);
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Add Property</h1>

        <input
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          placeholder="Price"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Image URL"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <input
          placeholder="Beds"
          onChange={(e) => setForm({ ...form, beds: e.target.value })}
        />

        <input
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

        <button onClick={handleSubmit}>Add Property</button>
      </div>
    </div>
  );
}

export default AddProperty;
