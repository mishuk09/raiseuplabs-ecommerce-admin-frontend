import React, { useState, useRef } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { Link } from 'react-router-dom';

const CatAddPost = () => {
    const [img, setImg] = useState(null);
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const editor = useRef(null);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', img);
        formData.append('category', category);
        formData.append('title', title);
        formData.append('newPrice', newPrice);
        formData.append('oldPrice', oldPrice);
        formData.append('color', JSON.stringify(color));
        formData.append('size', JSON.stringify(size));
        formData.append('description', description);

        try {
            const res = await axios.post('http://localhost:5000/cate/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            //reset feild
            setImg('');
            setCategory('');
            setTitle('');
            setNewPrice('');
            setOldPrice('');
            setColor([]);
            setSize([]);
            setDescription('');

            console.log(res.data);
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddColor = () => setColor([...color, '']);
    const handleColorChange = (index, value) => {
        const newColors = [...color];
        newColors[index] = value;
        setColor(newColors);
    };

    const handleAddSize = () => setSize([...size, '']);
    const handleSizeChange = (index, value) => {
        const newSizes = [...size];
        newSizes[index] = value;
        setSize(newSizes);
    };

    return (
        <div className="  p-6 bg-white">
            <Link to='/cate'>Back</Link>
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
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
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
                        <label className="block text-sm font-medium text-gray-700">New Price</label>
                        <input
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Old Price</label>
                        <input
                            type="number"
                            value={oldPrice}
                            onChange={(e) => setOldPrice(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Colors</label>
                        {color.map((c, index) => (
                            <div key={index} className="flex space-x-2 mt-1">
                                <input
                                    type="text"
                                    value={c}
                                    onChange={(e) => handleColorChange(index, e.target.value)}

                                    className="block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddColor}
                            className="mt-2 text-sm text-blue-600 hover:underline"
                        >
                            Add Color
                        </button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sizes</label>
                        {size.map((s, index) => (
                            <div key={index} className="flex space-x-2 mt-1">
                                <input
                                    type="text"
                                    value={s}
                                    onChange={(e) => handleSizeChange(index, e.target.value)}

                                    className="block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddSize}
                            className="mt-2 text-sm text-blue-600 hover:underline"
                        >
                            Add Size
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <JoditEditor
                        ref={editor}
                        value={description}
                        tabIndex={1}
                        onBlur={(newContent) => setDescription(newContent)}
                        onChange={(newContent) => setDescription(newContent)}
                    />
                </div>
                {successMessage && (
                    <div className="mb-4 p-4 text-green-800 bg-green-200 rounded">
                        Added Successfully!
                    </div>
                )}
                <button
                    type="submit"
                    className="mt-4 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add Post
                </button>
            </form>
        </div>
    );
}

export default CatAddPost;
