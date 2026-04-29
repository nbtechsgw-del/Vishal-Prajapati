import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import BookCard from "./components/BookCard";
import BookModal from "./components/BookModal";
import UserModal from "./components/UserModal";
import BorrowModal from "./components/BorrowModal";
import Toast from "./components/Toast";
import Footer from "./components/Footer";
import { bookAPI, userAPI, borrowAPI } from "./services/api";
import "./styles/App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [showBookModal, setShowBookModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showBorrowsView, setShowBorrowsView] = useState(false);

  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  useEffect(() => {
    loadBooks();
    loadUsers();
    loadBorrows();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(
        books.filter(
          (book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    }
  }, [searchQuery, books]);

  const showToast = (message, type = "info") => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast({ ...toast, visible: false });
    }, 3000);
  };

  const loadBooks = async () => {
    try {
      const response = await bookAPI.getAllBooks();
      setBooks(response.data.data);
    } catch (error) {
      showToast("Failed to load books", "error");
    }
  };

  const loadUsers = async () => {
    try {
      const response = await userAPI.getAllUsers();
      setUsers(response.data.data);
    } catch (error) {
      showToast("Failed to load users", "error");
    }
  };

  const loadBorrows = async () => {
    try {
      const response = await borrowAPI.getAllBorrows();
      setBorrows(response.data.data);
    } catch (error) {
      showToast("Failed to load borrow records", "error");
    }
  };

  const handleAddBook = async (formData) => {
    try {
      const response = await bookAPI.createBook(formData);
      if (response.data.success) {
        setBooks([response.data.data, ...books]);
        setShowBookModal(false);
        showToast("Book added successfully!", "success");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to add book", "error");
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const response = await bookAPI.deleteBook(bookId);
        if (response.data.success) {
          setBooks(books.filter((b) => b.id !== bookId));
          showToast("Book deleted successfully", "success");
        }
      } catch (error) {
        showToast(
          error.response?.data?.message || "Failed to delete book",
          "error",
        );
      }
    }
  };

  const handleAddUser = async (formData) => {
    try {
      const response = await userAPI.createUser(formData);
      if (response.data.success) {
        setUsers([response.data.data, ...users]);
        setShowUserModal(false);
        showToast("User added successfully!", "success");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to add user", "error");
    }
  };

  const handleBorrowBook = async (bookId) => {
    if (users.length === 0) {
      showToast("No users available. Please add a user first.", "warning");
      return;
    }
    setShowBorrowModal(true);
  };

  const handleSubmitBorrow = async (borrowData) => {
    try {
      const response = await borrowAPI.borrowBook({
        userId: parseInt(borrowData.userId),
        bookId: parseInt(borrowData.bookId),
      });
      if (response.data.success) {
        await loadBooks();
        await loadBorrows();
        setShowBorrowModal(false);
        showToast("Book borrowed successfully!", "success");
      }
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to borrow book",
        "error",
      );
    }
  };

  const handleReturnBook = async (bookId) => {
    const activeBorrow = borrows.find(
      (b) => b.bookId === bookId && b.status === "borrowed",
    );
    if (activeBorrow) {
      try {
        const response = await borrowAPI.returnBook(activeBorrow.id);
        if (response.data.success) {
          await loadBooks();
          await loadBorrows();
          showToast("Book returned successfully!", "success");
        }
      } catch (error) {
        showToast(
          error.response?.data?.message || "Failed to return book",
          "error",
        );
      }
    }
  };

  return (
    <div className="app">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddBook={() => setShowBookModal(true)}
        onAddUser={() => setShowUserModal(true)}
        onShowBorrows={() => setShowBorrowsView(!showBorrowsView)}
      />

      <div className="container">
        {showBorrowsView ? (
          <div className="admin-section">
            <div
              className="modal-header"
              style={{
                marginBottom: "1.5rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <h2>Borrow Records</h2>
              <button
                className="close-btn"
                onClick={() => setShowBorrowsView(false)}
              >
                &times;
              </button>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Book</th>
                    <th>Borrow Date</th>
                    <th>Return Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {borrows.map((borrow) => (
                    <tr key={borrow.id}>
                      <td>{borrow.User?.name}</td>
                      <td>{borrow.Book?.title}</td>
                      <td>
                        {new Date(borrow.borrowDate).toLocaleDateString()}
                      </td>
                      <td>
                        {borrow.returnDate
                          ? new Date(borrow.returnDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>
                        <span
                          className={`book-status ${borrow.status === "borrowed" ? "status-borrowed" : "status-available"}`}
                        >
                          {borrow.status === "borrowed"
                            ? "🔴 Borrowed"
                            : "✓ Returned"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "2rem", textAlign: "center" }}>
              <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
                Showing <strong>{filteredBooks.length}</strong> book(s)
              </p>
            </div>

            {filteredBooks.length > 0 ? (
              <div className="books-grid">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onBorrow={handleBorrowBook}
                    onReturn={handleReturnBook}
                    onDelete={handleDeleteBook}
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "3rem" }}>
                <p style={{ fontSize: "1.1rem", color: "#6b7280" }}>
                  {searchQuery
                    ? "📭 No books found matching your search"
                    : "📚 No books available. Add some books to get started!"}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <BookModal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        onSubmit={handleAddBook}
      />

      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onSubmit={handleAddUser}
      />

      <BorrowModal
        isOpen={showBorrowModal}
        onClose={() => setShowBorrowModal(false)}
        books={books}
        users={users}
        onSubmit={handleSubmitBorrow}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
      />

      <Footer />
    </div>
  );
}

export default App;
