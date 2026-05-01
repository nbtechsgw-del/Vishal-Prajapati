import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  // Fetch property
  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await API.get(`/properties/${id}`);
      setProperty(res.data);
    } catch (err) {
      console.error("Error fetching property:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle booking
  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    if (!date) {
      alert("Please select a date");
      return;
    }

    try {
      setBooking(true);

      await API.post("/bookings", {
        propertyId: id,
        date,
      });

      alert("Booking successful");
      setDate(""); // reset date
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Loading property...
      </h2>
    );
  }

  if (!property) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Property not found
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "100px 20px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <img
        src={property.image}
        alt={property.title}
        onError={(e) => (e.target.src = "https://via.placeholder.com/600x400")}
        style={{
          width: "100%",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      />

      <h1>{property.title}</h1>
      <p style={{ color: "gray", fontSize: "14px" }}>📍 {property.location}</p>
      <h2 style={{ color: "#00bcd4" }}>₹{property.price}</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          margin: "20px 0",
          flexWrap: "wrap",
        }}
      >
        <p>🛏 {property.beds} Beds</p>
        <p>🛁 {property.baths} Baths</p>
        <p>📐 {property.size}</p>
      </div>

      <p style={{ lineHeight: "1.6" }}>{property.description}</p>

      <hr style={{ margin: "30px 0" }} />

      <h3>Book this property</h3>

      <div style={{ marginTop: "10px" }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleBooking}
          disabled={booking}
          style={{
            padding: "10px 20px",
            background: booking ? "#999" : "#00bcd4",
            border: "none",
            color: "#fff",
            borderRadius: "6px",
            cursor: booking ? "not-allowed" : "pointer",
          }}
        >
          {booking ? "Booking..." : "Book Now"}
        </button>
      </div>
    </div>
  );
}
