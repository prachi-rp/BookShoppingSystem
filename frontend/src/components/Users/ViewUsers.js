import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./users.module.css";
const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5104/api/UsersApi");
        setUsers(response.data.$values);
        setLoading(false);
      } catch (err) {
        setError("Error fetching users. Please try again.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
// Handle delete user
const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5104/api/UsersApi/${id}`);
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        alert("Error deleting user. Please try again.");
      }
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pageHeader}>User List</h2>
      <table className={`${styles.table} mt-3`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                {user.image ? (
                  <img
                    src={`http://localhost:5104/images/${user.image}`}
                    alt={user.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                <button
                  className={`${styles.btn} ${styles.btnDanger}`}
                  onClick={() => handleDelete(user.id)}
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

export default ViewUsers;
