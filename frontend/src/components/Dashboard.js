import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css"; // CSS Module for styling
import axios from "axios";

const Dashboard = () => {
    const [stats, setStats] = useState({
        countOrders: 0,
        totalAmounts: 0,
        countBooks: 0,
        countAuthors: 0,
        countGenres: 0,
        countCustomers: 0,
    });

    useEffect(() => {
        // Simulating API calls for dashboard statistics
        const fetchDashboardStats = async () => {
            try {
                const response = await axios.get("http://localhost:5104/api/Dashboard/stats"); // Adjust API route as needed
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        };

        fetchDashboardStats();
    }, []);

    return (
        <div className={styles.dashboard}>
            

            {/* Main Content */}
            <main className={styles.mainContent}>
                <h1>ADMIN DASHBOARD</h1>
                <div className={styles.statsContainer}>
                    <div className={styles.statBox}>
                        <h2>Total Orders</h2>
                        <p>{stats.countOrders}</p>
                    </div>
                    <div className={styles.statBox}>
                        <h2>Total Amount</h2>
                        <p>${stats.totalAmounts}</p>
                    </div>
                    <div className={styles.statBox}>
                        <h2>Total Books</h2>
                        <p>{stats.countBooks}</p>
                    </div>
                    <div className={styles.statBox}>
                        <h2>Total Authors</h2>
                        <p>{stats.countAuthors}</p>
                    </div>
                    <div className={styles.statBox}>
                        <h2>Total Genres</h2>
                        <p>{stats.countGenres}</p>
                    </div>
                    <div className={styles.statBox}>
                        <h2>Total Customers</h2>
                        <p>{stats.countCustomers}</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
