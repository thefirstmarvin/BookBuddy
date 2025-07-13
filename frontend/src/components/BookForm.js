// src/components/BookForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookApi } from "../api/axiosConfig";

const BookForm = () => {
  const [book, setBook] = useState({ title: "", author: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookApi.post("/books", book);
      navigate("/books");
    } catch (error) {
      console.error("Failed to add book", error);
      alert("Error adding book. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          value={book.title}
          placeholder="Title"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="author"
          value={book.author}
          placeholder="Author"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          value={book.description}
          placeholder="Description"
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Add Book</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "vertical",
    height: "100px",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default BookForm;
