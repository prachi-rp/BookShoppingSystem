import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Books.module.css";

const AddBook = () => {
  const [book, setBook] = useState({
    bookName: "",
    authorId: "",
    genreId: "",
    price: "",
    description: "",
    imageFile: null,
  });

  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuthors();
    fetchGenres();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:5104/api/Author/AllAuthors"); // Adjust API route if needed
      setAuthors(response.data.$values);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get("http://localhost:5104/api/Genre/AllGenres"); // Adjust API route if needed
      setGenres(response.data.$values);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bookName", book.bookName);
    formData.append("authorId", book.authorId);
    formData.append("genreId", book.genreId);
    formData.append("price", book.price);
    formData.append("description", book.description);
    if (book.imageFile) {
      formData.append("imageFile", book.imageFile);
    }

    try {
      await axios.post("http://localhost:5104/api/Book/AddBook", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Book added successfully!");
      navigate("/all-books");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageHeader}>Add Book</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={styles.formGroup}>
          <label>Book Name:</label>
          <input
            type="text"
            name="bookName"
            className={styles.formControl}
            value={book.bookName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Author:</label>
          <select
            name="authorId"
            className={styles.formControl}
            value={book.authorId}
            onChange={handleChange}
            required
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.authorName}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Genre:</label>
          <select
            name="genreId"
            className={styles.formControl}
            value={book.genreId}
            onChange={handleChange}
            required
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.genreName}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            className={styles.formControl}
            value={book.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Description:</label>
          <textarea
            name="description"
            className={styles.formControl}
            value={book.description}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Image:</label>
          <input
            type="file"
            name="imageFile"
            className={styles.formControl}
            onChange={handleChange}
          />
          {book.image && (
            <div className="mt-2">
              <img
                src={`/uploads/${book.image}`} // Adjust path if needed
                alt="Book Cover"
                style={{ maxWidth: "100px" }}
              />
            </div>
          )}
        </div>
        <button type="submit" className={`${styles.btn} ${styles.btnSuccess}`}>
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
