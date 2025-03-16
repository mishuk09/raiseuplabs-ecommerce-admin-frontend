import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pencil, Trash } from 'lucide-react';
import UpdatePost from "../Post/UpdatePost";
import DeletePost from "../Post/DeletePost";
import AddPost from "../Post/AddPost";


const Home = () => {
    const [item, setItem] = useState([]);
    const [edit, setEdit] = useState(null);
    const [remove, setRemove] = useState(null);
    const [add, setAdd] = useState(false);


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/posts/');
            setItem(response.data);

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    const hanldleEdit = (id) => {
        setEdit(id);
    };
    const hanldleEditClose = () => {
        setEdit(null);
    };

    const handleDelete = (id) => {
        setRemove(id);
    };
    const handleDeleteClose = () => {
        setRemove(null);
    };

    const handleAddItem = () => {
        setAdd(true);
    }
    const handleAddClose = () => {
        setAdd(false)
    }
    return (
        <div className="overflow-x-auto">

            <h1 class="text-3xl font-bold text-center text-gray-800 mt-10">👋 Welcome Admin Dashboard</h1>

            {
                add && <AddPost onClose={handleAddClose} onAdd={fetchData} />
            }
            {
                edit && <UpdatePost id={edit} onClose={hanldleEditClose} onUpdate={fetchData} />
            }
            {
                remove && <DeletePost id={remove} onClose={handleDeleteClose} onDelete={fetchData} />
            }


            <div class="flex justify-between mt-10 mb-3">
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Items List</h2>
                </div>

                <div class="flex    mb-2">

                    <div onClick={handleAddItem}
                        class=" bg-white cursor-pointer me-2 flex text-center items-center justify-center rounded border border-1 border-blue-500 hover:ring-1 delay-100 transition hover:border-blue-600 px-2 w-[200px] py-1">
                        <div class="flex text-center items-center justify-center">
                            <div class="text-xs me-2">
                                ➕
                            </div>
                            <div>
                                <span class="text-gray-500">Add Items</span>
                            </div>
                        </div>

                    </div>




                    <div class="  w-full md:w-[350px]">
                        <form id="searchForm" class="flex" onsubmit="return false;">
                            <input type="text" id="searchQuery" placeholder="Search assets..." class="border border-gray-300 rounded-l px-3 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            <button type="button" onclick="fetchSearchResults()" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-r text-sm">
                                Search
                            </button>
                        </form>
                        <div id="searchResults" class="absolute w-full bg-white shadow-md rounded mt-1 hidden z-10"></div>
                    </div>



                    <div>

                    </div>
                </div>
            </div>
            <table className="min-w-full border border-gray-300  ">
                <thead className="rounded-full">
                    <tr className="bg-sky-300 text-gray-800 font-normal ">
                        <th className="px-4 py-2 ">Image</th>
                        <th className="px-4 py-2 ">Category</th>
                        <th className="px-4 py-2 ">Title</th>
                        <th className="px-4 py-2 ">New P</th>
                        <th className="px-4 py-2 ">Old P</th>
                        <th className="px-4 py-2 ">Stock</th>
                        <th className="px-4 py-2 ">Color</th>
                        <th className="px-4 py-2 ">Size</th>
                        <th className="px-4 py-2 ">Edit</th>
                        <th className="px-4 py-2 ">Delete</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700 text-sm">
                    {item && item.length > 0 ? (
                        item.map((product, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-sm cursor-pointer transition">
                                <td className="px-2 py-1">
                                    <img src={product.img} alt={product.title} className="w-10 h-10 object-cover rounded border" />
                                </td>
                                <td className="px-2 py-1 ">{product.category}</td>
                                <td className="px-2 py-1   font-medium">{product.title}</td>
                                <td className="px-2 py-1   font-medium">${product.newPrice}</td>
                                <td className="px-2 py-1 line-through text-gray-500">${product.oldPrice}</td>
                                <td className="px-2 py-1   text-gray-500">{product.stock}</td>
                                <td className="px-2 py-1">{product.color?.join(", ") || "-"}</td>
                                <td className="px-2 py-1">{product.size?.join(", ") || "-"}</td>
                                <td className="px-2 py-1   gap-2">
                                    <button onClick={() => hanldleEdit(product._id)} className="bg-white hover:bg-gray-100  text-gray-400 px-4 py-2 rounded text-sm transition"><Pencil size={15} /></button>
                                </td>
                                <td className="px-2 py-1  gap-2">
                                    <button onClick={() => handleDelete(product._id)} className="bg-white hover:bg-gray-100   text-red-500 px-4 py-2 rounded text-sm transition"><Trash size={15} /></button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center py-4 text-gray-500">No items available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
