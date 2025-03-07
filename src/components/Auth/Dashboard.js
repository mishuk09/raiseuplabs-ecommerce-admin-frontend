import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/signin');
                return;
            }
            try {
                const response = await axios.get('http://localhost:5000/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/signin');
                }
            }
        };

        fetchData();
    }, [navigate]);



    return (

        <div className="    flex flex-col   p-4">
            <Link to='/dashboard'>home</Link>
            <main className="   py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/addpost" className="bg-white p-6 rounded-lg shadow hover:bg-gray-50 transition">
                        <h2 className="text-xl font-bold mb-4">📌 Add Post</h2>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">➕ Add Post</button>
                    </Link>
                    <Link to="/edit" className="bg-white p-6 rounded-lg shadow hover:bg-gray-50 transition">
                        <h2 className="text-xl font-bold mb-4">✏️ Edit List</h2>
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">🛠️ Edit List</button>
                    </Link>
                    <Link to="/delete" className="bg-white p-6 rounded-lg shadow hover:bg-gray-50 transition">
                        <h2 className="text-xl font-bold mb-4">🗑️ Delete List</h2>
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">❌ Delete List</button>
                    </Link>
                    <Link to="/orders" className="bg-white p-6 rounded-lg shadow hover:bg-gray-50 transition">
                        <h2 className="text-xl font-bold mb-4">🛒 Order</h2>
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">✅ Order</button>
                    </Link>
                </div>
            </main>

        </div>

    );
};

export default Dashboard;
