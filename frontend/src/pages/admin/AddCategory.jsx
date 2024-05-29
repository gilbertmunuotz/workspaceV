import { useState, useRef } from "react";
import { IoHome } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import Spinner from "../../components/Spinner";
import { BiSolidCategory } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";


function AddCategory() {

    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState('');
    const catInputRef = useRef(null)

    const menuItems = [
        { path: "/adminH", name: "Home", icon: <IoHome className="ml-1" /> },
        { path: "/addCategory", name: "Add Category", icon: <BiSolidCategory size={24} /> },
        { path: "/addItems", name: "Add Product", icon: <IoIosAddCircleOutline size={24} /> },
    ];

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);
    }

    return (
        <div className="AddCategory">
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

                    <button type="button" className="mt-auto mb-10 mr-9 cursor-not-allowed">
                        <CiLogout className="inline-block mr-3" size={24} />Log Out
                    </button>
                </div>
            </div>


            <main className="flex flex-col justify-center items-center h-screen ml-96 text-center">

                <form className="flex flex-col items-center w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="w-full">
                        <input
                            type="text"
                            value={category}
                            required
                            name="category"
                            ref={catInputRef}
                            onChange={(event) => setCategory(event.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading} className="bg-sky-500 m-3 p-2 px-10 rounded-lg">
                            {isLoading ? 'Adding....' : 'Add'}
                        </button>
                    </div>

                    <Spinner loading={isLoading} />
                </form>
            </main>
        </div >
    )
}

export default AddCategory