import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Stock.module.css";

const BooksWithStockPage = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch books with stock details
    const fetchBooks = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`http://localhost:5104/api/Stock?sTerm=${searchTerm}`);
            setBooks(response.data.$values);
        } catch (err) {
            console.error("Error fetching books:", err);
            setError("Failed to fetch books. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch books whenever the search term changes
    useEffect(() => {
        fetchBooks();
    }, [searchTerm]);

    return (
        <div className={styles.container}>
            <h1>Books and Stock Management</h1>

            {/* Search Input */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search books by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "300px",
                        marginRight: "10px",
                        fontSize: "16px"
                    }}
                />
                <button
                    onClick={fetchBooks}
                    style={{
                        padding: "10px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                >
                    Search
                </button>
            </div>

            {/* Loading/Error Messages */}
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Books Table */}
            {books.length > 0 ? (
                <table
                className={`${styles.table} mt-3`}>
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.bookId}>
                                <td style={tableCellStyle}>{book.bookName}</td>
                                <td style={tableCellStyle}>{book.quantity}</td>
                                <td style={tableCellStyle}>
                                    <Link
                                        to={`/manage-stock/${book.bookId}`}
                                        style={{ textDecoration: "none", color: "#007bff" }}
                                    >
                                        Manage Stock
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !loading && <p>No books found.</p>
            )}
        </div>
    );
};

// Table Header and Cell Styles
const tableHeaderStyle = {
    border: "1px solid black",
    padding: "10px",
    backgroundColor: "#f2f2f2",
    textAlign: "left",
};

const tableCellStyle = {
    border: "1px solid black",
    padding: "10px",
    textAlign: "left",
};

export default BooksWithStockPage;
