import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Authors.module.css";

const UpdateAuthor = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState({
    authorName: "",
    email: "",
    phone: "",
    gender: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuthor();
  }, []);

  const fetchAuthor = async () => {
    try {
      const response = await axios.get(`http://localhost:5104/api/Author/${id}`);
      setAuthor(response.data);
    } catch (error) {
      console.error("Error fetching author:", error);
    }
  };

  const handleChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5104/api/Author/UpdateAuthor/${id}`, author);
      navigate("/");
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageHeader}>Update Author</h2>
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
          Update Author</button>
      </form>
    </div>
  );
};

export default UpdateAuthor;
