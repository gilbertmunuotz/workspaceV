import { toast } from 'react-toastify';
import { IoHome } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import Spinner from "../../components/Spinner";
import { BiSolidCategory } from "react-icons/bi";
import { useState, useRef, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";


function AddCategory() {

    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategory] = useState('');
    const [newCategories, setNewCategories] = useState('');
    const catInputRef = useRef(null)

    const menuItems = [
        { path: "/adminH", name: "Home", icon: <IoHome className="ml-1" /> },
        { path: "/addCategory", name: "Add Category", icon: <BiSolidCategory size={24} /> },
        { path: "/addItems", name: "Add Product", icon: <IoIosAddCircleOutline size={24} /> },
    ];

    //Update state On Every Render
    useEffect(() => {
        catInputRef.current.focus();
        fetchCategories();
    }, [])

    //Fetch Categories 
    async function fetchCategories() {
        const url = `http://localhost:3001/api/allCats`;

        setIsLoading(true);

        try {
            fetch(url, {
                method: 'GET'
            })
                .then(response => {
                    if (!response) {
                        throw new Error('Request Failed')
                    } else {
                        return response.json();
                    }
                })
                .then(data => {
                    setCategory(data.categories);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    toast('An error occurred while fetching data.');
                    setIsLoading(false);
                });
        } catch (error) {
            console.error("Error Fetching Categories");
            setIsLoading(false);
        }
    }

    //Post New Categories
    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        const url = ` http://localhost:3001/api/cats`;

        const userData = { newCategories };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        };

        try {
            const response = await fetch(url, requestOptions);
            if (!response) {
                console.error("Error Adding Category");
            } else {
                toast.success("Category Added Succesfully");
                fetchCategories();
                setNewCategories('');
            }
        } catch (error) {
            console.error("Error Adding Category");
            toast.error("Error Adding Category");
        } finally {
            setIsLoading(false);
        }
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
                <div className="grid grid-cols-2">
                    <div className="cols-span-1 mr-96">
                        {isLoading ? (<Spinner loading={isLoading} />
                        ) : categories?.length === 0 ? (
                            <p className="text-center">No Categories Added.</p>
                        ) : (
                            categories.map((category) => (
                                <h1 key={category._id}>
                                    <li className='text-xl'>
                                        {category.category}
                                    </li>
                                </h1>
                            ))
                        )}
                    </div>


                    <form className="flex flex-col items-center w-full max-w-lg" onSubmit={handleSubmit}>
                        <div className="w-full">
                            <input
                                type="text"
                                value={newCategories}
                                required
                                placeholder='Enter Category Here...'
                                name="categories"
                                ref={catInputRef}
                                onChange={(event) => setNewCategories(event.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <button type="submit" disabled={isLoading} className="bg-sky-500 m-3 p-2 px-10 rounded-lg">
                                {isLoading ? 'Adding....' : 'Add'}
                            </button>
                        </div>

                        <Spinner loading={isLoading} />
                    </form>
                </div>
            </main>
        </div >
    )
}

export default AddCategory