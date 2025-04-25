import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Authors.module.css"; // Import the CSS module

const AllAuthors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:5104/api/author/AllAuthors");
      const authorsArray = response.data.$values;
      setAuthors(authorsArray);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const deleteAuthor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this author?")) return;
    try {
      await axios.delete(`http://localhost:5104/api/author/DeleteAuthor/${id}`);
      setAuthors(authors.filter((author) => author.id !== id));
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageHeader}>All Authors</h2>
      <Link to="/add-author" className={`${styles.btn} ${styles.btnPrimary}`}>
        Add Author
      </Link>
      <table className={`${styles.table} mt-3`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.authorName}</td>
              <td>{author.email}</td>
              <td>{author.phone}</td>
              <td>{author.gender}</td>
              <td>
                <Link to={`/update-author/${author.id}`} className={`${styles.btn} ${styles.btnInfo}`}>
                  Update
                </Link>{" "}
                <button
                  className={`${styles.btn} ${styles.btnDanger}`}
                  onClick={() => deleteAuthor(author.id)}
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

export default AllAuthors;
