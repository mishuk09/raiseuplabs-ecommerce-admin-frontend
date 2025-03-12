import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Alert from '../Alert';

const EditOffer = () => {
    const { id } = useParams();
    const [img, setImg] = useState('');
    const [subTitle, setsubTitle] = useState('');
    const [title, setTitle] = useState('');
    const [offer, setOffer] = useState('');
    const [successfull, setSuccessfull] = useState(false);

    useEffect(() => {
        // Fetch existing post data
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://riseuplabs-ecommerce-backend.onrender.com/home/${id}`);
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

            await axios.post(`https://riseuplabs-ecommerce-backend.onrender.com/home/offupdate/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            setSuccessfull(true);
            setTimeout(() => setSuccessfull(false), 3000);
        } catch (err) {
            console.log(err);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg(file);
        }
    };

    return (
        <div className="    p-6 bg-white">
            <p><Link to='/offer'>Back</Link></p>
            <h2 className="text-2xl text-center font-semibold mb-6">Update Post</h2>
            {img && typeof img === 'string' && (
                <div className="mt-2">
                    <img src={img} alt="Current post image" className="w-32 h-32 object-cover" />
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                <div className="grid lg:grid-cols-3 gap-2 lg:gap-4">
                    <div>

                        <label className="block text-sm font-medium text-gray-700">Image:</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                        <input type="text" value={subTitle} onChange={e => setsubTitle(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title:</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Offer</label>
                        <input type="text" value={offer} onChange={e => setOffer(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                </div>

                {successfull && <Alert name='Update Successful!' />}

                <button type="submit" className="mt-4 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default EditOffer;
