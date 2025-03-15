// src/components/DeletePost.js
import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaRegTimesCircle } from 'react-icons/fa';

const DeletePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();



    const handleDelete = () => {
        axios.delete(`http://localhost:5000/posts/${id}`)
            .then(() => {
                console.log('Post deleted.');
                navigate('/delete');
            })
            .catch(err => console.log(err));
    }

    const handleCancel = () => {
        navigate(-1); // Navigate back to the previous page
    }

    return (
        <div className="  flex flex-col items-center justify-center h-[80vh]">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold mb-4">Are you sure you want to delete this post?</h2>
                <div className="flex justify-center">
                    <button
                        onClick={handleDelete}
                        className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 mr-4"
                    >
                        <FaTrashAlt className="mr-2" /> Yes, Delete
                    </button>
                    <button
                        onClick={handleCancel}
                        className="flex items-center bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                        <FaRegTimesCircle className="mr-2" /> Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletePost;
