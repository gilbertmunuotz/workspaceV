import { FaTh } from "react-icons/fa";
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useEffect, useState, useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import { useSelector, useDispatch } from 'react-redux';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useLogoutMutation } from "../../auth/apiSlice";
import { clearPersistedState } from "../../auth/authSlice";
import { NavLink, useNavigate, Link } from 'react-router-dom';

function Home() {

    const userInfo = useSelector(state => state.auth.userInfo)
    const username = userInfo?.username;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchInputRef = useRef(null);
    const [logout] = useLogoutMutation();
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    async function handleLogout() {
        try {
            await logout();
            dispatch(clearPersistedState());
            toast.success("Logged Out Succesfully");
            navigate('login');
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('An error occurred while logging out.');
        }
    }

    const menuItems = [
        { path: "/adminH", name: "Home", icon: <FaTh className="ml-1" /> },
        { path: "/addItems", name: "Add Product", icon: <IoIosAddCircleOutline size={24} /> },
    ];


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false); // Set loading to false after 1 minute
        }, 90 * 1000);

        searchInputRef.current.focus();

        const url = 'http://localhost:3001/api/allProducts';

        setIsLoading(true);
        try {
            fetch(url, {
                method: 'GET'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Request Failed'); // Throwing an error to trigger the catch block
                    }
                    return response.json(); // Parse response data
                })
                .then(data => {
                    setProducts(data.products);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    toast('An error occurred while fetching data.');
                    setIsLoading(false);
                });
        } catch (error) {
            console.error("Error Getting Data", error);
            setIsLoading(false);
        }

        return () => clearTimeout(timeoutId);
    }, []);

    async function handleInputChange(event) {
        setSearchQuery(event.target.value)
    }


    async function deleteProduct(productId) {
        try {
            setIsLoading(true);

            const url = `http://localhost:3001/api/delete/${productId}`;

            const response = await fetch(url, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Delete Failed');
            }

            // eslint-disable-next-line no-unused-vars
            const data = await response.json();
            setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
            toast.success("Product Deleted Succesfully.")

        } catch (error) {
            console.error('Error Deleting Product:', error);
            toast('An error occurred while Deleting Product.');
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <>
            <div className='Home'>
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
                        <button type="button" className="mt-auto mb-10" onClick={handleLogout}><CiLogout className="inline-block mr-3" size={24} /> Log Out </button>
                    </div>

                    <main className="flex flex-col flex-grow pt-2 pl-8 pr-4 overflow-y-auto ml-64">
                        <div className="container mx-auto"> {/* Add container to limit the width */}
                            <div className="top-bar flex justify-between font-serif my-1 py-2">
                                <input type="text" value={searchQuery} onChange={handleInputChange} ref={searchInputRef} className="rounded-lg ring-4 px-2 pr-8" placeholder="Search..." />
                                <h2 className="self-end text-3xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">Welcome, {username}</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6"> {/* Add mt-6 to create space below the top bar */}
                            {isLoading ? (
                                <Spinner loading={isLoading} /> // Pass loading state to Spinner component
                            ) : products?.length === 0 ? (
                                <p className="text-center">No products found.</p>
                            ) : (
                                products.filter(product => {
                                    if (!searchQuery) {
                                        return true;  // Filter products based on the search query
                                    }
                                    else {
                                        return (
                                            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            product.price.toString().includes(searchQuery) // Convert price to string for comparison
                                        );
                                    }
                                }).map((product) => (
                                    <div key={product._id} className="border p-4 rounded">
                                        <img src={`${product.imageURL}`} alt={product.name} className="w-full h-auto" />
                                        <div className="grid grid-cols-2">
                                            <h1 className="text-gray-600">{product.name}</h1>
                                            <p className="text-gray-600">Category: {product.category}</p>
                                            <p className="text-gray-600">Description: {product.description}</p>
                                            <p className="text-gray-600">Price: {product.price}</p>
                                            <h3 className="flex justify-between col-span-2">
                                                <p>
                                                    <Link to={`/prodctpg/${product._id}`}>
                                                        <FaEdit />
                                                    </Link>
                                                </p>
                                                <button type="button" onClick={() => deleteProduct(product._id)}>
                                                    <FaTrashAlt />
                                                </button>
                                            </h3>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Home