import React from "react";

export const BookModal = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = React.useState(initialData);

  React.useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  return (
    <div className={`modal ${isOpen ? "active" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialData.id ? "Edit Book" : "Add New Book"}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              required
              placeholder="Enter book title"
            />
          </div>

          <div className="form-group">
            <label>Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author || ""}
              onChange={handleChange}
              required
              placeholder="Enter author name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Enter book description"
            />
          </div>

          <div className="form-group">
            <label>Image URL *</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl || ""}
              onChange={handleChange}
              required
              placeholder="https://example.com/book-cover.jpg"
            />
          </div>

          {formData.imageUrl && (
            <div className="form-group">
              <img
                src={formData.imageUrl}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  borderRadius: "5px",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status || "available"}
              onChange={handleChange}
            >
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
            </select>
          </div>

          <div className="form-group" style={{ marginTop: "2rem" }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              {initialData.id ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
