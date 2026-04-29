import React from "react";

export const BorrowModal = ({ isOpen, onClose, books, users, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    userId: "",
    bookId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.userId && formData.bookId) {
      onSubmit(formData);
      setFormData({ userId: "", bookId: "" });
    }
  };

  return (
    <div className={`modal ${isOpen ? "active" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Borrow a Book</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select User *</label>
            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose a user --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Book *</label>
            <select
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose a book --</option>
              {books
                .filter((book) => book.status === "available")
                .map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} by {book.author}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group" style={{ marginTop: "2rem" }}>
            <button
              type="submit"
              className="btn btn-success"
              style={{ width: "100%" }}
            >
              Borrow Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowModal;
