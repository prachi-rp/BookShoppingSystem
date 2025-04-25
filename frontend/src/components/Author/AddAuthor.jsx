import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Authors.module.css";

const AddAuthor = () => {
  const [author, setAuthor] = useState({
    authorName: "",
    email: "",
    phone: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5104/api/author/AddAuthor", author);
      alert("Author added successfully!");
    } catch (error) {
      console.error("Error adding author:", error.response || error.message || error);
    }
    
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageHeader}>Add Author</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            name="authorName"
            className={styles.formControl}
            value={author.authorName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className={styles.formControl}
            value={author.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            className={styles.formControl}
            value={author.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Gender:</label>
          <select
            name="gender"
            className={styles.formControl}
            value={author.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button type="submit" className={`${styles.btn} ${styles.btnSuccess}`}>
          Add Author
        </button>
      </form>
    </div>
  );
};

export default AddAuthor;
