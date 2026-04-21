import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function EditProperty() {
  const { id } = useParams();
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(`/properties/${id}`);
      setForm(res.data);
    };

    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    await API.put(`/properties/${id}`, form);
    alert("Updated ✅");
  };

  return (
    <div>
      <h1>Edit Property</h1>

      <input
        value={form.title || ""}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditProperty;
