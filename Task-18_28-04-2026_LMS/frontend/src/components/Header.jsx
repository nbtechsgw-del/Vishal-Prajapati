import React from "react";

export const Header = ({
  searchQuery,
  onSearchChange,
  onAddBook,
  onAddUser,
  onShowBorrows,
}) => {
  return (
    <header>
      <div className="header-container">
        <h1 className="header-title">📚 Library Management System</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <nav>
          <button onClick={onAddBook} title="Add new book">
            + Add Book
          </button>
          <button onClick={onAddUser} title="Add new user">
            + Add User
          </button>
          <button onClick={onShowBorrows} title="View borrow history">
            📋 Borrows
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
