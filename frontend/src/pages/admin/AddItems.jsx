import { FaTh } from "react-icons/fa";
import { toast } from 'react-toastify';
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";

function AddItems() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const categoryOptions = ["Computing", "Networking", "Stationeries"];

    const menuItems = [
        { path: "/adminH", name: "Home", icon: <FaTh className="ml-1" /> },
        { path: "/addItems", name: "Add Product", icon: <IoIosAddCircleOutline size={24} /> },
    ];

    const handleImage = (event) => {
        setImage(event.target.files[0]);
    }

    async function handleSubmit(event) {
        event.preventDefault()

        setIsLoading(true)

        const url = "http://localhost:3001/api/newProduct";

        const formData = new FormData(); // Use FormData for multipart form data
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('image', image);
        formData.append('price', price);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            })

            if (!response) {
                console.error("Error Sending Data");
            } else {
                toast.success("Product Added Succesfully!");
                navigate('/AdminH')
            }
        } catch (error) {
            console.error("Error sending Data", error);
            toast.error("Error Saving Product")
        } finally {
            setIsLoading(false); // Ensure loading state is reset even on errors
        }
    }

    return (
        <div className='AddItems'>
            <div className="container flex">
                <div className='fixed bg-black text-white h-full flex flex-col w-64'>
                    <div className="top_section flex items-center py-4">
                    </div>
                    {menuItems.map((item, index) => (
                        <NavLink key={index} to={item.path} className='link flex items-center py-3 px-8 gap-4'>
                            <div className="icon text-xl mt-3">{item.icon}</div>
                            <span className='link_text text-base mt-3'>{item.name}</span>
                        </NavLink>
                    ))}
                    <button type="button" className="mt-auto mb-10 mr-9 cursor-not-allowed"><CiLogout className="inline-block" size={24} /> Log Out </button>
                </div>

                <h3 className="mb-6 text-2xl font-bold ml-24">Add Products</h3> {/* Not Seen By User */}
                <main className="flex flex-col justify-center items-center h-screen ml-96 text-center">
                    <form className="flex flex-col items-center w-full max-w-md" onSubmit={handleSubmit}>

                        <input
                            required
                            type="file"
                            name="image"
                            onChange={handleImage}
                            className="block w-full p-2 border border-gray-300 rounded-md mt-3 file:cursor-pointer" />

                        <div className="w-full">
                            <label className="mr-80 block">Name:</label>
                            <input
                                type="text"
                                value={name}
                                required
                                name="name"
                                onChange={(event) => setName(event.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded-md" />

                            <label className="mr-72 mt-4 block">Description:</label>
                            <textarea
                                type="text"
                                required
                                name="description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded-md" cols="30">
                            </textarea>
                        </div>

                        <div className="w-full">
                            <label className="mr-72 mt-4 block">Category:</label>
                            <select
                                required
                                name="category"
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded-md focus:border-sky-500">

                                <option value="" disabled>Select Category Below</option> {/* Default disabled option */}
                                {categoryOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            <label className="mr-80 mt-4 block">Price:</label>
                            <input
                                required
                                type="number"
                                name="price"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded-md" />
                        </div>

                        <div>
                            <button type="submit" disabled={isLoading} className="bg-sky-500 m-3 p-2 rounded-lg">
                                {isLoading ? 'Saving....' : 'Save'}
                            </button>
                        </div>

                        <Spinner loading={isLoading} />

                    </form>
                </main>
            </div>
        </div>
    )
}

export default AddItems