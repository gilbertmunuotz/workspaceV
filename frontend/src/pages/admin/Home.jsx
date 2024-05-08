import { FaTh } from "react-icons/fa";
import { toast } from 'react-toastify';
import { CiLogout } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux';
import { IoIosAddCircleOutline } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from "../../auth/apiSlice";
import { clearPersistedState } from "../../auth/authSlice";

function Home() {

    const userInfo = useSelector(state => state.auth.userInfo)
    const username = userInfo?.username;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

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


    return (
        <div className='Home'>
            <div className="container flex">
                <div className='sidebar bg-black text-white h-screen w-64 flex flex-col'>
                    <div className="top_section flex items-center py-4">
                    </div>
                    {menuItems.map((item, index) => (
                        <NavLink key={index} to={item.path} className='link flex items-center py-3 px-8 gap-4'>
                            <div className="icon text-xl mt-3">{item.icon}</div>
                            <span className='link_text text-base mt-3'>{item.name}</span>
                        </NavLink>
                    ))}

                    <button type="button" className="mt-auto mb-10 mr-20" onClick={handleLogout}><CiLogout className="inline-block mr-3" size={24} /> Log Out </button>
                </div>


                <main className="flex flex-col flex-grow  pt-2 pl-8">
                    <h1 className="self-end text-3xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text my-2">Welcome, {username}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="left bg-gray-200 p-4">Left Content</div>
                        <div className="center bg-gray-300 p-4">Center Content</div>
                        <div className="right bg-gray-400 p-4">Right Content</div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home