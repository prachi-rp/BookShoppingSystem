import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Orders.module.css";

const UpdateOrderStatus = () => {
    const { orderId } = useParams(); // Extract orderId from URL
    const [order, setOrder] = useState(null);
    const [statuses, setStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const orderResponse = await axios.get(`http://localhost:5104/api/AdminOperations/Order/${orderId}`);
                const statusResponse = await axios.get("http://localhost:5104/api/AdminOperations/OrderStatuses");

                setOrder(orderResponse.data);
                setStatuses(statusResponse.data.$values);
                setSelectedStatus(orderResponse.data.orderStatusId);
            } catch (err) {
                setError("Failed to load order data. Please try again.");
            }
        };
        fetchOrderData();
    }, [orderId]);

    const updateStatus = async () => {
        try {
            await axios.post("http://localhost:5104/api/AdminOperations/UpdateOrderStatus", {
                OrderId: orderId,
                OrderStatusId: selectedStatus
            });
            alert("Order status updated successfully!");
        } catch {
            alert("Failed to update order status.");
        }
    };

    return (
        <div className={styles.container}>
            <h1>Update Order Status</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {order ? (
                <div>
                    <p>
                        <strong>Order ID:</strong> {order.id}
                    </p>
                    <p>
                        <strong>Customer:</strong> {order.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {order.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {order.mobileNumber}
                    </p>
                    <p>
                        <strong>Payment Mode:</strong> {order.paymentMethod}
                    </p>
                    <p>
                        <strong>Address:</strong> {order.address}
                    </p>
                    <div>
                        <label htmlFor="status"><strong>Order Status:</strong></label>
                        <select
                            id="status"
                            value={selectedStatus}
                            onChange={e => setSelectedStatus(e.target.value)}
                        >
                            {statuses.map(status => (
                                <option key={status.id} value={status.id}>
                                    {status.statusName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button onClick={updateStatus} style={{ marginTop: "20px" }}>
                        Update Status
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpdateOrderStatus;
