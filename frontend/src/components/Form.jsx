import Spinner from './Spinner';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSendMessageMutation } from '../auth/apiSlice';


function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [sendMessage, { isLoading }] = useSendMessageMutation();

    async function HandleSubmit(event) {
        event.preventDefault();

        try {

            const response = await sendMessage({ name, email, message });

            if (response.data.status === "error") { // Handle specific backend errors
                toast.error(response.data.message); // Display backend error message
            }
            else {
                toast.success('Thank You For your Contacting us. \nWe will respond to you Soon');
                setName('');
                setEmail('');
                setMessage('');
            }
        }
        catch (error) {
            console.error('Error sending data:', error);
            toast.error('An error occurred. Please try again later.');
        }
    }

    return (
        <div className="Form">
            <h1 className="text-4xl text-center my-6 font-serif mt-24">Contact Us</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-12 mx-10">
                <form onSubmit={HandleSubmit} className="mx-12">

                    <div className="row-1">
                        <label htmlFor="name">Name:</label>
                        <br />
                        <input
                            className="bg-gray-200 rounded px-4 py-2 my-4 sm:px-6" // Added responsive padding
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="row-2">
                        <label htmlFor="email">Email:</label>
                        <br />
                        <input
                            className="bg-gray-200 rounded px-4 py-2 my-4 sm:px-6"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="row-start-2">
                        <label htmlFor="message">Message:</label>
                        <br />
                        <textarea
                            className="bg-gray-200 rounded sm:w-80"
                            name="usermessage"
                            value={message}
                            cols="30"
                            rows="5"
                            aria-invalid="false"
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="bg-blue-600 px-4 py-2 rounded-xl col-start-2">Send</button>

                    <ToastContainer />

                    <Spinner loading={isLoading} />

                </form>

                <section className="map mx-10">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d990.403206632233!2d39.281982249841874!3d-6.816855767023816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4f2e13a38a27%3A0xecce4ec45e022a1b!2sWorkspace%20Computers%20Limited!5e0!3m2!1sen!2stz!4v1711569911889!5m2!1sen!2stz"
                        className='sm:p-4'
                        width="100%"
                        height="400"
                        title='maps'
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </section>
            </div>
        </div>
    )
}
export default Form