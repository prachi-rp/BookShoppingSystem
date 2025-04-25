import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Genres.module.css";

const AllGenres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get("http://localhost:5104/api/Genre/AllGenres");
     // setGenres(response.data);
      const genresArray = response.data.$values;
      setGenres(genresArray);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const deleteGenre = async (id) => {
    if (!window.confirm("Are you sure you want to delete this genre?")) return;
    try {
      await axios.delete(`http://localhost:5104/api/Genre/DeleteGenre/${id}`);
      setGenres(genres.filter((genre) => genre.id !== id));
    } catch (error) {
      console.error("Error deleting genre:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageHeader}>All Genres</h2>
      <Link to="/add-genre" className={`${styles.btn} ${styles.btnPrimary}`}>Add Genre</Link>
      <table className={`${styles.table} mt-3`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr key={genre.id}>
              <td>{genre.genreName}</td>
              <td>
                <Link to={`/update-genre/${genre.id}`} className={`${styles.btn} ${styles.btnInfo}`}>
                  Update
                </Link>{" "}
                <button
                  className={`${styles.btn} ${styles.btnDanger}`}
                  onClick={() => deleteGenre(genre.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllGenres;
