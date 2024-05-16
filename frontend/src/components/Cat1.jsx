import Footer from './Footer';
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Spinner from '../components/Spinner'

function Cat1() {

    const [products, setProducts] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // Set loading to false after 1 minute
        }, 90 * 1000);

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
                });
        } catch (error) {
            console.error("Error Getting Data", error);
        }

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="Cat1">
            <Navbar />
            <p className="mt-20 text-lg mx-12">
                Our Listed Products are 100% Original and comes with 2 Month Warranty Period, with VAT included.
            </p>

            <h1 className="text-3xl text-center my-10">Computing</h1>

            <div className='relative bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl'>
                {isLoading ? (
                    <Spinner loading={isLoading} />
                ) : products.length === 0 ? (
                    <p className="text-center">No products found.</p>
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

export default Cat1