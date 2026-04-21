import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await API.get(`/properties/${id}`);
      setProperty(res.data);
    };

    fetchProperty();
  }, [id]);

  const handleBooking = async () => {
    try {
      await API.post("/bookings", {
        propertyId: property.id,
        date,
      });

      setMessage("Booking successful");
    } catch (err) {
      setMessage("Login required :", err);
    }
  };

  if (!property) return <h2>Loading...</h2>;

  return (
    <div>
      <img src={property.image} width="400" />

      <h1>{property.title}</h1>
      <p>{property.location}</p>
      <h2>₹{property.price}</h2>

      <p>{property.description}</p>

      <input type="date" onChange={(e) => setDate(e.target.value)} />

      <button onClick={handleBooking}>Book Now</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default PropertyDetails;
