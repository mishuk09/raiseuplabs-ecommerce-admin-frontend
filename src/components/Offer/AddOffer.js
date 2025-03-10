import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const AddOffer = () => {
    const [subTitle, setSubTitle] = useState("");
    const [title, setTitle] = useState("");
    const [offer, setOffer] = useState("");
    const [img, setImg] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/signin");
                    return;
                }

                await axios.get("http://localhost:5000/home/add", {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (error) {
                console.error(
                    "Error fetching data:",
                    error.response ? error.response.data : error.message
                );
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    window.location.href = "/signin";
                }
            }
        };
        fetchData();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", img);
        formData.append("subTitle", subTitle);
        formData.append("title", title);
        formData.append("offer", offer);

        try {
            const res = await axios.post("http://localhost:5000/home/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Reset fields
            setSubTitle("");
            setTitle("");
            setOffer("");
            setImg(null);

            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="  p-6 bg-white">
            <Link to='/offer'>Back</Link>
            <h2 className="text-2xl text-center font-semibold mb-6">Add New Offer</h2>

            <form onSubmit={handleSubmit} className="space-y-4" method="POST" encType="multipart/form-data">
                <div className="grid lg:grid-cols-3 gap-2 lg:gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={(e) => setImg(e.target.files[0] || null)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">SubTitle</label>
                        <input
                            type="text"
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Offer</label>
                        <input
                            type="text"
                            value={offer}
                            onChange={(e) => setOffer(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                {successMessage && (
                    <div className="mb-4 p-4 text-green-800 bg-green-200 rounded">Offer Added Successfully!</div>
                )}
                <button
                    type="submit"
                    className="mt-4 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add Offer
                </button>
            </form>
        </div>
    );
};

export default AddOffer;
