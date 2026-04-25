import { useEffect, useState } from "react";
import API from "../services/api";
import PropertyCard from "../components/PropertyCard";

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await API.get("/properties");
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Dream Home</h1>
          <p>Buy, rent, or book properties easily</p>
        </div>
      </section>

      <section className="properties">
        <h2>Properties</h2>

        <div className="property-grid">
          {properties.length > 0 ? (
            properties.map((p) => <PropertyCard key={p.id} property={p} />)
          ) : (
            <p>No properties found</p>
          )}
        </div>
      </section>
    </>
  );
}
