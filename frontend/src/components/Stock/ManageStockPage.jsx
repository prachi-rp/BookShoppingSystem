import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Stock.module.css";

const ManageStockPage = () => {
    const { bookId } = useParams(); // Get bookId from the URL
    const [book, setBook] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Fetch book details for the given bookId
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5104/api/Stock/${bookId}`);
                setBook(response.data);
                setQuantity(response.data.quantity);
            } catch (err) {
                console.error("Error fetching book details:", err);
                setMessage("Failed to fetch book details.");
            }
        };

        fetchBookDetails();
    }, [bookId]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5104/api/Stock`, { bookId, quantity });
            setMessage("Stock updated successfully!");
            navigate("/books-stock"); // Redirect to books list
        } catch (err) {
            console.error("Error updating stock:", err);
            setMessage("Failed to update stock.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.pageHeader}>Manage Stock</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <p><strong>Book: {book.book?.bookName}</strong></p>
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={quantity}
                        className={styles.formControl}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit" style={{ marginTop: "10px" }}>
                    Update Stock
                </button>
            </form>
        </div>
    );
};

export default ManageStockPage;
