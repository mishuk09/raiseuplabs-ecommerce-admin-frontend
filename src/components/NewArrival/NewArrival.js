import React from 'react';
import { Link } from 'react-router-dom';

const NewArrival = () => {
    return (
        <div className='p-4'>
            <p className='font-medium text-xl'>New Arrival Dashboard</p>
            <main className="   py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/newadd" className="bg-white p-6 rounded-lg shadow hover:bg-gray-50 transition">
                        <h2 className="text-xl font-bold mb-4">📌 Add NewArrival</h2>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">➕ Add NewArrival</button>
                    </Link>
                    <Link to="/newedit" className="bg-white p-6 rounded-lg shadow hover:bg-gray-50 transition">
                        <h2 className="text-xl font-bold mb-4">✏️ Edit NewArrival</h2>
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">🛠️ See List</button>
                    </Link>
                    <Link to="/newdelete" className="bg-white p-6 rounded-lg shadow hover:bg-gray-50 transition">
                        <h2 className="text-xl font-bold mb-4">🗑️ Delete NewArrival</h2>
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">❌ See List</button>
                    </Link>

                </div>
            </main>

        </div>
    );
};

export default NewArrival;