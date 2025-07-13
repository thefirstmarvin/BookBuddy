// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { bookApi } from "../api/axiosConfig";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await bookApi.get("/books");
      setBooks(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Book Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="book-card" key={book.id}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Year: {book.year}</p>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
