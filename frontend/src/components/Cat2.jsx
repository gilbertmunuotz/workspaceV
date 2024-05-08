import Navbar from "./Navbar";
import Footer from './Footer'

function Cat2() {
    return (
        <div className="Cat2">
            <Navbar />
            <p className="mt-20 text-lg mx-12">
                Our Listed Products are 100% Original and comes with 2 Month Warranty Period, with VAT included.
            </p>

            <h1 className="text-3xl text-center my-10">Product Category</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-12 mb-8">
                <div className='relative bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer'>
                    <div className='ml-2'>
                      

                    </div>
                    <div className="absolute text-sm font-bold rounded-full p-2 top-0 bg-sky-500 ml-2 mt-2">25% Off</div>
                </div>


                <div className='relative bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer'>
                    <div className='ml-2'>
                       

                    </div>
                    <div className="absolute text-sm font-bold rounded-full p-2 top-0 bg-sky-500 ml-2 mt-2">25% Off</div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Cat2