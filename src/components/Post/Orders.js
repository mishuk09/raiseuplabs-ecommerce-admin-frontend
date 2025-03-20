import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import SheetJS

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/item/orders')
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
    }, []);

    const handleCompleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:5000/item/orders/${orderId}`)
            // Remove the completed order from the UI
            setOrders(orders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error('Error completing order:', error);
        }
    };

    const exportToExcel = () => {
        if (orders.length === 0) {
            alert('No orders to export!');
            return;
        }

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
            ).join('; ')
        }));

        const ws = XLSX.utils.json_to_sheet(formattedOrders);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Orders');
        XLSX.writeFile(wb, 'Orders_Report.xlsx');
    };


    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Orders Management</h1>
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
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border">Sr No</th>
                                        <th className="px-4 py-2 border">Full Name</th>
                                        <th className="px-4 py-2 border">Email</th>
                                        <th className="px-4 py-2 border">Phone</th>
                                        <th className="px-4 py-2 border">City</th>
                                        <th className="px-4 py-2 border">Total Amount</th>
                                        <th className="px-4 py-2 border">Items</th>
                                        <th className="px-4 py-2 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={order._id} className="text-center">
                                            <td className="px-4 py-2 border">{index + 1}</td>
                                            <td className="px-4 py-2 border">{order.fullName}</td>
                                            <td className="px-4 py-2 border">{order.email}</td>
                                            <td className="px-4 py-2 border">{order.phoneNumber}</td>
                                            <td className="px-4 py-2 border">{order.city}</td>
                                            <td className="px-4 py-2 border">${order.totalAmount}</td>
                                            <td className="px-4 py-2 border">
                                                <button
                                                    onClick={() => openModal(order)}
                                                    className="bg-blue-500 text-white text-xs px-3 py-1 rounded"
                                                >
                                                    View List
                                                </button>
                                            </td>

                                            <td className="px-4 py-2 border">
                                                <button
                                                    onClick={() => handleCompleteOrder(order._id)}
                                                    className="bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    Complete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Modal */}
                            {isModalOpen && selectedOrder && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-w-full">
                                        <h2 className="text-xl font-bold mb-4">Order Details</h2>
                                        <div className="overflow-y-auto max-h-[300px]">
                                            {selectedOrder.cartItems.map((item, idx) => (
                                                <div key={idx} className="flex items-center space-x-4 p-2 border rounded-lg shadow-sm bg-gray-50">
                                                    <img src={item.img} alt={item.title} className="w-10 h-10 object-cover rounded-md" />
                                                    <div className="text-left">
                                                        <p className="font-semibold">{item.title}</p>
                                                        <p className="text-sm text-gray-600">Color: {item.color}</p>
                                                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                        <p className="text-sm text-gray-600">Price: ${item.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={closeModal}
                                            className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Orders;
