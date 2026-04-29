import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const bookAPI = {
  getAllBooks: () => api.get("/books"),
  getBookById: (id) => api.get(`/books/${id}`),
  searchBooks: (query) => api.get(`/books/search?q=${query}`),
  createBook: (bookData) => api.post("/books", bookData),
  updateBook: (id, bookData) => api.put(`/books/${id}`, bookData),
  deleteBook: (id) => api.delete(`/books/${id}`),
};

export const userAPI = {
  getAllUsers: () => api.get("/users"),
  getUserById: (id) => api.get(`/users/${id}`),
  createUser: (userData) => api.post("/users", userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

export const borrowAPI = {
  borrowBook: (borrowData) => api.post("/borrow/borrow", borrowData),
  returnBook: (borrowId) => api.post("/borrow/return", { borrowId }),
  getAllBorrows: () => api.get("/borrow"),
  getUserBorrows: (userId) => api.get(`/borrow/user/${userId}`),
  getActiveBorrows: () => api.get("/borrow/active/all"),
};

export default api;
