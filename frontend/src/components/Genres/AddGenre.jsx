import React, { useState } from "react";
import axios from "axios";
import styles from "./Genres.module.css";

const AddGenre = () => {
  const [genreName, setGenreName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5104/api/Genre/AddGenre", { genreName });
      alert("Genre added successfully!");
      setGenreName("");
    } catch (error) {
      console.error("Error adding genre:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageHeader}>Add Genre</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Genre Name:</label>
          <input
            type="text"
            className={styles.formControl}
            value={genreName}
            onChange={(e) => setGenreName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={`${styles.btn} ${styles.btnSuccess}`}>
          Add Genre
        </button>
      </form>
    </div>
  );
};

export default AddGenre;
