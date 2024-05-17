import Footer from './Footer';
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Spinner from '../components/Spinner'

function Cat2() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const category = "Networking"; // Specify the category here

        const url = `https://workspaceb.vercel.app/api/allProducts?category=${encodeURIComponent(category)}`;

        setIsLoading(true);
        try {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Request Failed');
                    }
                    return response.json();
                })
                .then(data => {
                    setProducts(data.products);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    // You can set an error state here if needed
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            console.error("Error Getting Data", error);
            setIsLoading(false); // Make sure to set isLoading to false in case of an error
        }
    }, []);

    return (
        <div className="Cat2">
            <Navbar />
            <p className="mt-20 text-lg mx-12">
                Our Listed Products are 100% Original and come with a 2 Month Warranty Period, with VAT included.
            </p>
            <h1 className="text-3xl text-center my-10 font-serif">Networking</h1>

            <div className='relative bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl'>
                {isLoading ? (
                    <Spinner loading={isLoading} />
                ) : products.length === 0 ? (
                    <p className="text-center">Products Not Available</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-12 mb-8">
                        {products.map((product) => (
                            <div key={product._id} className="relative cursor-pointer">
                                <img src={`http://localhost:3001/images/${product.imageURL}`} alt={product.name} className="w-full h-64 object-fill" />
                                <div className="block text-center">
                                    <h1 className="text-gray-600 font-bold">{product.name}</h1>
                                    <p className="text-gray-600">{product.description}</p>
                                    <p className="text-gray-600 mt-2">Tshs {product.price}/=</p>
                                </div>
                                <div className="absolute text-sm font-bold rounded-full p-2 top-0 bg-sky-500 ml-2 mt-2">25% Off</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Cat2;
