import { useNavigate } from "react-router-dom";

export default function PropertyCard({ property }) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/property/${property.id}`)}>
      <div className="card-img">
        <img src={property.image} alt="" />
        <span className="price">₹{property.price}</span>
      </div>

      <div className="card-content">
        <h3>{property.title}</h3>
        <p>{property.location}</p>

        <div className="details">
          <span>🛏 {property.beds}</span>
          <span>🛁 {property.baths}</span>
          <span>📐 {property.size}</span>
        </div>
      </div>
    </div>
  );
}
