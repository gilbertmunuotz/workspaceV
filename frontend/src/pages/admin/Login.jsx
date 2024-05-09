import { useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import Spinner from '../../components/Spinner';
import { credentials } from '../../auth/authSlice';
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../auth/apiSlice';


function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginUser, { isLoading, }] = useLoginMutation();


    async function handleSubmit(event) {
        event.preventDefault()

        try {
            // Trigger the registerUser mutation with user data
            const response = await loginUser({ email, password });

            if (response.error) { // Handle RTK Query error (if any)
                toast.error(response.error.data.message); // Display backend error message
            } else if (response.data.status === "error") { // Handle specific backend errors
                toast.error(response.data.message); // Display backend error message
            }
            else {
                navigate('/adminH');
                dispatch(credentials(response.data.user)); // Dispatch credentials action with user data
            }

        } catch (error) {
            console.error('Error sending data:', error);
            toast.error('An error occurred. Please try again later.'); // Display error toast
        }

    }


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-sky-300 z-50">
            <div className="container mx-auto max-w-sm flex items-center justify-center h-full">
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-full px-8 py-10">
                    <h2 className="text-2xl font-bold text-sky-500 text-center mb-8">Welcome Admin</h2>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name='username'
                            value={email}
                            placeholder="Type Email" required
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />

                        <input
                            type="password"
                            name='password'
                            value={password}
                            placeholder="Type password" required
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />

                        <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline" type="submit">
                            Log In
                        </button>

                        <Spinner loading={isLoading} />
                    </form>

                    <p className="text-center mt-4 text-gray-500">
                        No account? <Link to="/register" className="text-sky-500 hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login