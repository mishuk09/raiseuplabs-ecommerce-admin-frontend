// src/components/Delete.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Delete = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/signin');
            return;
        }
        axios.get('http://localhost:5000/posts')
            .then(response => {
                setPosts(response.data.slice(0, 12));
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="  px-4 lg:px-0">
            <Link to='/dashboard'>Back</Link>
            <h1 className="text-2xl text-center   mb-10 font-bold">Select Item for Delete.</h1>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {posts.map((product) => (
                        <Link
                            to={`/delete/${product._id}`}
                            key={product._id}
                            className="bg-white p-2 rounded-lg shadow-md flex items-center space-x-4"
                        >
                            {/* Left Section: Image */}
                            <div className="flex-shrink-0">
                                <img
                                    src={product.img}
                                    alt={product.title}
                                    className="w-20 h-20 object-cover rounded-sm"
                                />
                            </div>

                            {/* Right Section: Details */}
                            <div className="flex flex-col flex-grow">
                                <h2 className="text-lg font-medium">{product.title}</h2>
                                <div className="flex justify-between items-center mb-2 mt-2">
                                    {/* Price Section */}
                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold text-sm text-red-500">${product.newPrice}</span>
                                        <span className="text-sm font-semibold text-gray-700 line-through">
                                            ${product.oldPrice}
                                        </span>
                                    </div>
                                    {/* Discount Section */}
                                    <div>
                                        <span className="text-green-500 font-bold">
                                            {Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)}% OFF
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            )}
        </div>
    );
}

export default Delete;
