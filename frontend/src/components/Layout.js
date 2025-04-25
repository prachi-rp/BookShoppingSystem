import React from "react";
import { Navigate, Link, Outlet } from "react-router-dom";
import './Layout.css'; // Ensure this CSS file contains sidebar styles
import { isAuthenticated, logout } from "../utils/Auth";


const Layout = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout(); // Clear session
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <div className="layout-container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/allOrders">Orders</Link></li>
            <li><Link to="/all-author">Authors</Link></li>
            <li><Link to="/all-genres">Genres</Link></li>
            <li><Link to="/all-books">Books</Link></li>
            <li><Link to="/books-stock">Stock</Link></li>
            <li><Link to="/view-users">Users</Link></li>           
          </ul>
        </nav>
        
        <button
          onClick={handleLogout}
          style={{
            padding: "5px 10px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      
      </div>
      <div className="content-area">
        <Outlet /> {/* This will render the corresponding component for the route */}
      </div>
    </div>
  );
};

export default Layout;
