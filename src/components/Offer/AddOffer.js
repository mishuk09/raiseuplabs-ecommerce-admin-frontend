import React, { useState } from "react";
import axios from "axios";
import Alert from "../Alert";
import { X } from "lucide-react";
import LoadingSpin from "../utills/LoadingSpin";

const AddOffer = ({ onClose, onAdd }) => {
    const [subTitle, setSubTitle] = useState("");
    const [title, setTitle] = useState("");
    const [offer, setOffer] = useState("");
    const [img, setImg] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Start loading when submission begins

        const formData = new FormData();
        formData.append("image", img);
        formData.append("subTitle", subTitle);
        formData.append("title", title);
        formData.append("offer", offer);

        try {
            await axios.post("http://localhost:5000/home/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Reset fields
            setSubTitle("");
            setTitle("");
            setOffer("");
            setImg(null);
            onAdd();
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {successMessage && (
                <Alert name='Added Successfully!' />
            )}
            {/* {successMessage && (
                <div className="mb-4 p-4 text-green-800 bg-green-200 rounded">Offer Added Successfully!</div>
            )} */}
            <div
                className="fixed inset-0 bg-slate-900   opacity-50"
                onClick={onClose}
            ></div>
            <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
                <div className="max-w-4xl 2xl:max-w-7xl max-h-[500px] 2xl:max-h-[600px] relative overflow-y-auto overflow-x-hidden h-auto bg-white p-4 rounded">

                    <button onClick={onClose} className='absolute top-2 right-3'><X size={18} /></button>

                    <h2 className="text-2xl text-center font-semibold mb-6">Add New Product</h2>
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 w-full addItem-btn p-2 h-10  text-white rounded-md   flex items-center justify-center"
                        >

                            {loading ? <LoadingSpin /> : 'Add Offer'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddOffer;
