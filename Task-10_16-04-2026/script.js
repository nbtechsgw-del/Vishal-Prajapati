// book class
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isIssued = false;
    this.issuedTo = null;
    this.dueDate = null;
  }

  issue(userName, dueDate) {
    if (this.isIssued) {
      alert("Book already issued!");
      return false;
    }

    this.isIssued = true;
    this.issuedTo = userName;
    this.dueDate = new Date(dueDate);
    return true;
  }

  returnBook() {
    if (!this.isIssued) {
      alert("Book is not issued!");
      return false;
    }

    this.isIssued = false;
    this.issuedTo = null;
    this.dueDate = null;
    return true;
  }

  isOverdue() {
    return this.dueDate && new Date() > new Date(this.dueDate);
  }
}

// library class
class Library {
  constructor() {
    this.books = [];
    this.loadFromStorage();
  }

  addBook(book) {
    const exists = this.books.find((b) => b.id === book.id);
    if (exists) {
      alert("Book ID already exists!");
      return;
    }

    this.books.push(book);
    this.saveToStorage();
    displayBooks();
  }

  findBook(id) {
    return this.books.find((book) => book.id === id);
  }

  saveToStorage() {
    localStorage.setItem("libraryBooks", JSON.stringify(this.books));
  }

  loadFromStorage() {
    const data = JSON.parse(localStorage.getItem("libraryBooks")) || [];

    this.books = data.map((b) => {
      const book = new Book(b.id, b.title, b.author);
      book.isIssued = b.isIssued;
      book.issuedTo = b.issuedTo;
      book.dueDate = b.dueDate ? new Date(b.dueDate) : null;
      return book;
    });
  }
}

const library = new Library();

function clearInputs(...inputs) {
  inputs.forEach((input) => (input.value = ""));
}

// add book
function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const id = document.getElementById("bookId").value.trim();

  if (!title || !author || !id) {
    alert("Please fill all fields!");
    return;
  }

  const book = new Book(id, title, author);
  library.addBook(book);

  clearInputs(
    document.getElementById("title"),
    document.getElementById("author"),
    document.getElementById("bookId"),
  );
}

// issue book
function issueBook() {
  const id = document.getElementById("issueId").value.trim();
  const userName = document.getElementById("userName").value.trim();
  const dueDate = document.getElementById("dueDate").value;

  if (!id || !userName || !dueDate) {
    alert("Please fill all fields!");
    return;
  }

  const book = library.findBook(id);

  if (!book) {
    alert("Book not found!");
    return;
  }

  const success = book.issue(userName, dueDate);

  if (success) {
    library.saveToStorage();
    displayBooks();
  }

  clearInputs(
    document.getElementById("issueId"),
    document.getElementById("userName"),
    document.getElementById("dueDate"),
  );
}

// return book
function returnBook() {
  const id = document.getElementById("returnId").value.trim();

  if (!id) {
    alert("Please enter Book ID!");
    return;
  }

  const book = library.findBook(id);

  if (!book) {
    alert("Book not found!");
    return;
  }

  // overdue check
  if (book.isOverdue()) {
    alert("Book is overdue! Late return.");
  }

  const success = book.returnBook();

  if (success) {
    library.saveToStorage();
    displayBooks();
  }

  clearInputs(document.getElementById("returnId"));
}

// display books
function displayBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  if (library.books.length === 0) {
    list.innerHTML = `<tr><td colspan="6">No books available</td></tr>`;
    return;
  }

  library.books.forEach((book, index) => {
    let statusClass = "status-available";
    let statusText = "Available";

    if (book.isIssued) {
      if (book.isOverdue()) {
        statusClass = "status-overdue";
        statusText = "Overdue";
      } else {
        statusClass = "status-issued";
        statusText = "Issued";
      }
    }

    const due = book.dueDate
      ? new Date(book.dueDate).toLocaleDateString()
      : "-";

    const row = document.createElement("tr");

    row.style.opacity = "0";
    row.style.transform = "translateY(10px)";

    row.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td class="${statusClass}">${statusText}</td>
      <td>${book.issuedTo || "-"}</td>
      <td>${due}</td>
    `;

    list.appendChild(row);

    setTimeout(() => {
      row.style.transition = "0.4s ease";
      row.style.opacity = "1";
      row.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// events
document.getElementById("addBookBtn").addEventListener("click", addBook);
document.getElementById("issueBookBtn").addEventListener("click", issueBook);
document.getElementById("returnBookBtn").addEventListener("click", returnBook);

displayBooks();
