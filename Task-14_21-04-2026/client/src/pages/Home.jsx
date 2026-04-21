import { useEffect, useState } from "react";
import API from "../api/axios";

function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await API.get("/properties");
      setProperties(res.data);
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <h1>Properties</h1>

      {properties.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.location}</p>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
