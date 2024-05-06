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
        { path: "/adminH", name: "Home", icon: <FaTh /> },
        { path: "/addItems", name: "Add Product", icon: <IoIosAddCircleOutline size={24} /> },
    ];


    return (
        <div className='Home'>
            <div className="container flex">
                <div className='sidebar bg-black text-white h-screen w-64 flex flex-col'>
                    <div className="top_section flex items-center py-4 px-6">
                    </div>
                    {menuItems.map((item, index) => (
                        <NavLink key={index} to={item.path} className='link flex items-center py-3 px-8 gap-4 hover:bg-[#495057] rounded-lg hover:bg-transparent'>
                            <div className="icon text-xl mt-3">{item.icon}</div>
                            <span className='link_text text-base mt-3'>{item.name}</span>
                        </NavLink>
                    ))}

                    <button type="button" className="mt-auto mb-10 mr-20" onClick={handleLogout}><CiLogout className="inline-block mr-3" size={24} /> Log Out </button>

                </div>

                <main className="">
                    <p className="items-end">Welcome {username}</p>




                </main>
            </div>
        </div>
    )
}

export default Home