import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import * as XLSX from 'xlsx'; // Import SheetJS


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/signin');
                    return;
                }

                const response = await axios.get('https://riseuplabs-ecommerce-backend.onrender.com/item/orders', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    window.location.href = '/signin';
                } else {
                    setError(error.message);
                    setLoading(false);
                }
            }
        };

        fetchOrders();
    }, [navigate]);

    const handleCompleteOrder = async (orderId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }

            await axios.delete(`https://riseuplabs-ecommerce-backend.onrender.com/item/orders/${orderId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Remove the completed order from the UI
            setOrders(orders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error('Error completing order:', error);
        }
    };



    // ✅ Function to generate Excel file
    const exportToExcel = () => {
        if (orders.length === 0) {
            alert('No orders to export!');
            return;
        }

        // Format orders for Excel
        const formattedOrders = orders.map((order) => ({
            'Full Name': order.fullName,
            'Email': order.email,
            'Phone': order.phoneNumber,
            'City': order.city,
            'Address': order.address,
            'Order Note': order.orderNote,
            'Total Amount ($)': order.totalAmount,
            'Items': order.cartItems.map(item =>
                `Title: ${item.title}, Color: ${item.color}, Size: ${item.size}, Quantity: ${item.quantity}, Price: ${item.price}`
            ).join('; ') // Join items into a single string
        }));

        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(formattedOrders);

        // Create a workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Orders');

        // Generate and download the Excel file
        XLSX.writeFile(wb, 'Orders_Report.xlsx');
    };

    return (
        <div className="  mx-auto p-4">
            <h1 className="text-3xl   font-bold text-center mb-8">Orders Management</h1>
            {/*  Export Button */}
            <div className="text-center flex justify-end mb-4">
                <button
                    onClick={exportToExcel}
                    className="bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Download Excel
                </button>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <>
                    {orders.length === 0 ? (
                        <p className="text-lg h-[100vh] text-center font-semibold">No orders found.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                            {orders.map((order) => (
                                <div key={order._id} className="border rounded p-4 bg-white shadow-md">
                                    <h2 className="text-xl font-semibold mb-2">Order by {order.fullName}</h2>
                                    <p><span className="font-semibold">Email:</span> {order.email}</p>
                                    <p><span className="font-semibold">Phone:</span> {order.phoneNumber}</p>
                                    <p><span className="font-semibold">City:</span> {order.city}</p>
                                    <p><span className="font-semibold">Address:</span> {order.address}</p>
                                    <p><span className="font-semibold">Order Note:</span> {order.orderNote}</p>
                                    <p><span className="font-semibold">Total Amount:</span> ${order.totalAmount}</p>
                                    <h3 className="font-semibold mt-2">Items:</h3>
                                    <ul>
                                        {order.cartItems.map((item, index) => (
                                            <li key={index} className="border-t mt-2 pt-2">
                                                <p><span className="font-semibold">Title:</span> {item.title}</p>
                                                <p><span className="font-semibold">Color:</span> {item.color}</p>
                                                <p><span className="font-semibold">Size:</span> {item.size}</p>
                                                <p><span className="font-semibold">Quantity:</span> {item.quantity}</p>
                                                <p><span className="font-semibold">Price:</span> ${item.price}</p>
                                                <img src={item.img} alt={item.title} className="mt-2" width="50" />
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => handleCompleteOrder(order._id)}
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                                    >
                                        Complete Order
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Orders;
