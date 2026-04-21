import { useNavigate } from "react-router-dom";

function PropertyCard({ property }) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/property/${property.id}`)}>
      <img src={property.image} alt="" />

      <h3>{property.title}</h3>
      <p>{property.location}</p>
      <p>₹{property.price}</p>
    </div>
  );
}

export default PropertyCard;
