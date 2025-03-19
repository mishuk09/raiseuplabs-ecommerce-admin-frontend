/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Alert from '../Alert';
import { X } from 'lucide-react';
import LoadingSpin from '../utills/LoadingSpin';

const EditOffer = ({ id, onClose, onUpdate }) => {
    const [img, setImg] = useState('');
    const [subTitle, setsubTitle] = useState('');
    const [title, setTitle] = useState('');
    const [offer, setOffer] = useState('');
    const [successfull, setSuccessfull] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch existing post data
        const fetchData = async () => {
            try {

                const response = await axios.get(`http://localhost:5000/home/${id}`);
                const data = response.data;
                setsubTitle(data.subTitle);
                setTitle(data.title);
                setOffer(data.offer);
                setImg(data.img); // Load existing image URL from the database
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append('subTitle', subTitle);
        formData.append('title', title);
        formData.append('offer', offer);

        if (img && typeof img === 'object' && img instanceof File) {
            formData.append('image', img);
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }

            await axios.post(`http://localhost:5000/home/offupdate/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            setSuccessfull(true);
            onUpdate()
            setTimeout(() => setSuccessfull(false), 3000);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg(file);
        }
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-slate-900   opacity-50"
                onClick={onClose}
            ></div>

            <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
                <div className="max-w-4xl 2xl:max-w-7xl max-h-[500px] 2xl:max-h-[600px] relative overflow-y-auto overflow-x-hidden h-auto bg-white p-4 rounded">

                    <button onClick={onClose} className='absolute top-2 right-3'><X size={18} /></button>


                    <h2 className="text-2xl text-center font-semibold mb-6">Update Post</h2>
                    {img && typeof img === 'string' && (
                        <div className="mt-2 absolute top-10 left-0">
                            <img src={img} alt="Current post image" className="w-20 h-20 object-cover" />
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4 pt-16" encType="multipart/form-data">
                        <div className="grid lg:grid-cols-3 gap-2 lg:gap-4">
                            <div>

                                <label className="block text-sm font-medium text-gray-700">Image:</label>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="mt-1 block w-full p-1 h-8 text-xs border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                                <input type="text" value={subTitle} onChange={e => setsubTitle(e.target.value)} required className="mt-1 block w-full p-1 h-8 text-xs border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title:</label>
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full p-1 h-8 text-xs border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Offer</label>
                                <input type="text" value={offer} onChange={e => setOffer(e.target.value)} required className="mt-1 block w-full p-1 h-8 text-xs border border-gray-300 rounded" />
                            </div>
                        </div>

                        {successfull && <Alert name='Update Successful!' />}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 w-full addItem-btn p-2 h-10   text-white rounded-md   flex items-center justify-center"
                        >

                            {loading ? <LoadingSpin /> : 'Update'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditOffer;
