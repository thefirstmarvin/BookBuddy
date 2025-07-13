import React, { useEffect, useState } from "react";
import { bookApi } from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookApi.get("/books");
        setBooks(response.data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };

    fetchBooks();
  }, []);

  const handleAddBook = () => {
    navigate("/books/add");
  };

  const handleDelete = async (bookId) => {
    try {
      await bookApi.delete(`/books/${bookId}`);
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Book List</h2>
      <button onClick={handleAddBook} style={styles.button}>
        + Add Book
      </button>
      <ul style={styles.list}>
        {books.map((book) => (
          <li key={book.id} style={styles.listItem}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p>{book.description}</p>
            <button onClick={() => handleDelete(book.id)} style={styles.deleteButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  button: {
    display: "block",
    margin: "0 auto 1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    marginTop: "0.5rem",
    padding: "0.4rem 0.8rem",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "1rem",
    marginBottom: "1rem",
  },
};

export default BookList;
