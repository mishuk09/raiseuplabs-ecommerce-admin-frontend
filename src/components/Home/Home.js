import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [item, setItem] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/posts/');
                setItem(response.data);

            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">New Price</th>
                        <th className="px-4 py-2">Old Price</th>
                        <th className="px-4 py-2">Color</th>
                        <th className="px-4 py-2">Size</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {item && item.length > 0 ? (
                        item.map((product, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2">
                                    <img src={product.img} alt={product.title} className="w-16 h-16 object-cover rounded" />
                                </td>
                                <td className="px-4 py-2">{product.category}</td>
                                <td className="px-4 py-2">{product.title}</td>
                                <td className="px-4 py-2">${product.newPrice}</td>
                                <td className="px-4 py-2 line-through text-gray-500">${product.oldPrice}</td>
                                <td className="px-4 py-2">{product.color?.join(", ") || "-"}</td>
                                <td className="px-4 py-2">{product.size?.join(", ") || "-"}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p>no item</p>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
