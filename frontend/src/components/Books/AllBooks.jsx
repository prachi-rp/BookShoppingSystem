import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Books.module.css";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch books from the API
    axios
      .get("http://localhost:5104/api/Book/AllBooks")
      .then((response) => {
        // Check if books exist in the response
        if (response.data && response.data.$values) {
          setBooks(response.data.$values); // Set books data to state
        } else {
          setError("No books data available.");
        }
      })
      .catch((error) => {
        setError("Error fetching books.");
        console.error("Error fetching books:", error);
      });
  }, []);

  // Render loading or error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pageHeader}>All Books</h2>
      <Link to="/add-book" className={`${styles.btn} ${styles.btnPrimary}`}>Add Book</Link>
      <table className={`${styles.table} mt-3`}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Book Name</th>
            <th>Price</th>
            <th>Genre</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>
                  {book.image && (
                    <img
        src={`http://localhost:5104/images/${book.image}`} // Adjust the URL to your server's image folder
        alt={book.bookName}
        style={{ width: "50px", height: "50px", objectFit: "cover" }}
      />
    )}

                </td>
                <td>{book.bookName}</td>
                <td>{book.price}/-</td>
                <td>{book.genre?.genreName || "Unknown"}</td>
                <td>{book.author?.authorName || "Unknown"}</td>
                <td>
                  <Link
                    to={`/update-book/${book.id}`}
                    className={`${styles.btn} ${styles.btnInfo}`}
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className={`${styles.btn} ${styles.btnDanger}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No books available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  function handleDelete(bookId) {
    // Call API to delete book
    axios
      .delete(`http://localhost:5104/api/Book/DeleteBook/${bookId}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== bookId)); // Update UI
        alert("Book deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        alert("Failed to delete book.");
      });
  }
};

export default AllBooks;
