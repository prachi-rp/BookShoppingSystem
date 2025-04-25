import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Orders.module.css";

const AllOrders = () => {
    const [orders, setOrders] = useState([]); // Orders data
    const [error, setError] = useState(null); // Error handling
    const [loading, setLoading] = useState(true); // Loading state
    const [selectedOrderId, setSelectedOrderId] = useState(null); // Track selected order ID for details

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
    
            try {
                const response = await axios.get("http://localhost:5104/api/AdminOperations/AllOrders");
                const orderData = response.data?.$values || []; // Extracting the top-level `$values` array
                // Calculate total amount for each order with safety checks
                const enrichedOrders = orderData.map(order => {
                    const totalAmount = order.orderDetails?.$values?.reduce(
                        (sum, detail) => {
                            const quantity = detail.quantity || 0; // Default to 0 if quantity is missing
                            const unitPrice = detail.unitPrice || 0; // Default to 0 if unitPrice is missing
                            return sum + quantity * unitPrice;
                        },
                        0
                    ) || 0; // Default totalAmount to 0 if there are no orderDetails
                    return { ...order, totalAmount };
                });
                setOrders(enrichedOrders);
            } catch (err) {
                setError("Failed to fetch orders. Please try again.");
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchOrders();
    }, []);
    

    const togglePaymentStatus = async (orderId) => {
        try {
            await axios.post(`http://localhost:5104/api/AdminOperations/TogglePaymentStatus/${orderId}`);
            alert("Payment status toggled successfully!");
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, isPaid: !order.isPaid } : order
                )
            );
        } catch (err) {
            alert("Failed to toggle payment status.");
            console.error("Toggle Error:", err);
        }
    };

    const handleRowClick = (orderId) => {
        // Toggle the visibility of the order details when a row is clicked
        if (selectedOrderId === orderId) {
            setSelectedOrderId(null); // If the same row is clicked again, hide the details
        } else {
            setSelectedOrderId(orderId); // Show the details for the clicked row
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.pageHeader}>Orders</h2>

            {/* Loading Indicator */}
            {loading && <p>Loading orders...</p>}

            {/* Error Message */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Orders Table */}
            {!loading && orders.length > 0 ? (
                <table className={`${styles.table} mt-3`}>
                    <thead>
                        <tr>
                            <th>Order Date</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Address</th>
                            <th>Payment Status</th>
                            <th>Order Status</th>
                            <th>Total Amount</th>
                            <th>Payment Status</th>
                            <th>Order Status</th>
                            <th>Order Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <React.Fragment key={order.id}>
                                <tr onClick={() => handleRowClick(order.id)}>
                                    <td>{new Date(order.createDate).toLocaleDateString("en-GB")}</td>
                                    <td>{order.name || "N/A"}</td>
                                    <td>{order.email || "N/A"}</td>
                                    <td>{order.mobileNumber || "N/A"}</td>
                                    <td>{order.address || "N/A"}</td>
                                    <td>{order.paymentMethod} | {order.isPaid ? "Paid" : "Not Paid"}</td>
                                    <td>{order.orderStatus || "Unknown"}</td>
                                    <td>${order.totalAmount.toFixed(2)}</td>
                                    <td>
                                        <button
                                            className={`${styles.btn} ${styles.btnDanger}`}
                                            onClick={() => togglePaymentStatus(order.id)}
                                        >
                                            Payment
                                        </button>
                                    </td>
                                    <td>
                                        <a
                                            href={`/updateOrderStatus/${order.id}`}
                                            className={`${styles.btn} ${styles.btnDanger}`}
                                        >
                                            Change Status
                                        </a>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className={`${styles.btn} ${styles.btnDanger}`}
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>

                                {/* Render order details if selectedOrderId matches the order ID */}
                                {selectedOrderId === order.id && (
                                    <tr>
                                        <td colSpan="11">
                                            <table className={`${styles.table} mt-3`}>
                                                <thead>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Book Name</th>
                                                        <th>Quantity</th>
                                                        <th>Unit Price</th>
                                                        <th>Total Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.orderDetails?.$values?.map((detail, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                {detail.image && (
                                                                    <img
                                                                        src={`http://localhost:5104/images/${detail.image}`} // Adjust the URL to your server's image folder
                                                                        alt={detail.bookName}
                                                                        style={{ width: '100px', height: 'auto' }}
                                                                    />
                                                                )}
                                                            </td>
                                                            <td>{detail.bookName || "N/A"}</td>
                                                            <td>{detail.quantity}</td>
                                                            <td>${detail.unitPrice.toFixed(2)}</td>
                                                            <td>${(detail.quantity * detail.unitPrice).toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            ) : (
                !loading && <h5>No Orders :(</h5>
            )}
        </div>
    );
};

export default AllOrders;
