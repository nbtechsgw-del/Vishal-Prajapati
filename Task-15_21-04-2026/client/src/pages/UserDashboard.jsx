import { useEffect, useState } from "react";
import API from "../services/api";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.role === "user") {
      fetchBookings();
    }
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      alert("Delete failed", err);
    }
  };

  if (!user || user.role !== "user") {
    return <p>Access denied</p>;
  }

  return (
    <div className="dashboard">
      <h1>My Bookings</h1>

      <div className="booking-grid">
        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          bookings.map((b) => (
            <div className="booking-card" key={b.id}>
              <img src={b.Property?.image} alt="" />

              <div className="booking-content">
                <h3>{b.Property?.title}</h3>
                <p>{b.Property?.location}</p>
                <p>📅 {new Date(b.date).toLocaleDateString()}</p>

                <button
                  onClick={() => handleDelete(b.id)}
                  className="cancle-booking"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
