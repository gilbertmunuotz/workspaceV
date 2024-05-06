import React from 'react'
import Navbar from "./Navbar";
import Footer from './Footer'
import Fibres from "../assets/C_cables.jpg";
import Ethernet from "../assets/Ethernet.jpg";


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
                    <img src={Fibres} alt="Pilau" className='w-full h-80 bg-cover' />
                    <div className='ml-2'>
                        <span className='text-center'>
                            <h1 className="font-bold text-lg">Fibre Optic Cable</h1>
                            <p>
                                2 Cores Cable with PMMA 2 material, Fluorinated Polymer PE/PVC Light-weight, flexible, high resist flutter and determinate cleavage, durability & Optimum bandwidth
                            </p>
                        </span>

                        <span className='flex items-center justify-center'>
                            <p className="ml-2 mt-2">1,000/= Tshs @Meter</p>
                        </span>
                    </div>
                    <div className="absolute text-sm font-bold rounded-full p-2 top-0 bg-sky-500 ml-2 mt-2">25% Off</div>
                </div>


                <div className='relative bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer'>
                    <img src={Ethernet} alt="Pilau" className='w-full h-80 bg-cover' />
                    <div className='ml-2'>
                        <span className='text-center'>
                            <h1 className="font-bold text-lg">Fibre Optic Cable</h1>
                            <p>
                            Available Classes (Cat5, Cat5e, Cat6, Cat6a, Cat7), 100 m Distance
                            </p>
                        </span>

                        <span className='flex items-center justify-center'>
                            <p className="ml-2 mt-2">1,000/= Tshs @Meter</p>
                        </span>
                    </div>
                    <div className="absolute text-sm font-bold rounded-full p-2 top-0 bg-sky-500 ml-2 mt-2">25% Off</div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Cat2