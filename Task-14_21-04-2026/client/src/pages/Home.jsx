import { useEffect, useState } from "react";
import API from "../api/axios";
import PropertyCard from "../components/PropertyCard";

function Home() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await API.get("/properties");
      setProperties(res.data);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  const handleSearch = async () => {
    const res = await API.get("/properties");

    const filtered = res.data.filter((p) =>
      p.location.toLowerCase().includes(search.toLowerCase()),
    );

    setProperties(filtered);
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <h1>Find Your Dream Home</h1>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search location..."
              onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      <div className="property-grid">
        {properties.length === 0 && <h3>No properties found</h3>}

        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}

export default Home;
