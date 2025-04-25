import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Genres.module.css";

const UpdateGenre = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [genreName, setGenreName] = useState("");

  useEffect(() => {
    fetchGenre();
  }, []);

  const fetchGenre = async () => {
    try {
      const response = await axios.get(`http://localhost:5104/api/Genre/${id}`);
      setGenreName(response.data.genreName);
    } catch (error) {
      console.error("Error fetching genre:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5104/api/Genre/UpdateGenre/${id}`, { id, genreName });
      alert("Genre updated successfully!");
      navigate("/all-genres");
    } catch (error) {
      console.error("Error updating genre:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageHeader}>Update Genre</h2>
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
          Update Genre
        </button>
      </form>
    </div>
  );
};

export default UpdateGenre;
