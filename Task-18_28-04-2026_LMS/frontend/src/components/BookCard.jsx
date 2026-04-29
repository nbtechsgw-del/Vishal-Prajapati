const BookCard = ({ book, onBorrowClick, onReturn, onDelete }) => {
  const isAvailable = book.status === "available";

  return (
    <div className="book-card">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="book-image"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f";
        }}
      />

      <div className="book-content">
        <h3>{book.title}</h3>
        <p>by {book.author}</p>

        <div
          className={`book-status ${isAvailable ? "available" : "borrowed"}`}
        >
          {isAvailable ? "Available" : "Borrowed"}
        </div>

        <div className="book-actions">
          {isAvailable ? (
            <button onClick={() => onBorrowClick(book)}>Borrow</button>
          ) : (
            <button onClick={() => onReturn(book.id)}>Return</button>
          )}

          <button onClick={() => onDelete(book.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
