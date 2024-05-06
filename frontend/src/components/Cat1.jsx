import React from 'react'
import Footer from './Footer';
import Navbar from "./Navbar";
import Lii from "../assets/liii.png";
import ulii from "../assets/ulii.png";
import Cada from "../assets/cardano.jpg";

function Cat1() {
    return (
        <div className="Cat1">
            <Navbar />
            <p className="mt-20 text-lg mx-12">
                Our Listed Products are 100% Original and comes with 2 Month Warranty Period, with VAT included.
            </p>

            <h1 className="text-3xl text-center my-10">Product Category</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-12 mb-8">

                <div className='relative bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer'>
                    <img src={Lii} alt="Pilau" className='w-full h-80' />
                    <div className='ml-2'>
                        <span className='text-center'>
                            <h1 className="font-bold text-lg">HP Elite Book</h1>
                            <p>Windows 11 Pro or other operating systems13th Generation Intel® Core™ i3, i5, or i7 processors15.6" diagonal FHD (1920 x 1080)</p>
                        </span>

                        <span className='flex items-center justify-center'>
                            <s className="mt-2">750,000/= Tshs</s>  <p className="ml-2 mt-2">650,000/= Tshs</p>
                        </span>
                    </div>
                    <div className="absolute text-sm font-bold rounded-full p-2 top-0 bg-sky-500 ml-2 mt-2">25% Off</div>
                </div>

                <div className='relative bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer'>
                    <img src={Cada} alt="Pilau" className='w-full h-80' />
                    <div className='ml-2'>
                        <span className='text-center'>
                            <h1 className="font-bold text-lg">HP Elite Book</h1>
                            <p>Windows 11 Pro or other operating systems13th Generation Intel® Core™ i3, i5, or i7 processors15.6" diagonal FHD (1920 x 1080)</p>
                        </span>

                        <span className='flex items-center justify-center'>
                            <s className="mt-2">750,000/= Tshs</s>  <p className="ml-2 mt-2">650,000/= Tshs</p>
                        </span>
                    </div>
                    <div className="absolute text-sm font-bold uppercase rounded-full p-2 top-0 bg-sky-500 ml-2 mt-2">25% Off</div>
                </div>

                <div className='relative bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer'>
                    <img src={ulii} alt="Pilau" className='w-full h-80' />
                    <div className='ml-2'>
                        <span className='text-center'>
                            <h1 className="font-bold text-lg">HP Elite Book</h1>
                            <p>Windows 11 Pro or other operating systems13th Generation Intel® Core™ i3, i5, or i7 processors15.6" diagonal FHD (1920 x 1080)</p>
                        </span>

                        <span className='flex items-center justify-center'>
                            <s className="mt-2">750,000/= Tshs</s>  <p className="ml-2 mt-2">650,000/= Tshs</p>
                        </span>
                    </div>
                    <div className="absolute text-sm font-bold uppercase rounded-full p-2 top-0 bg-sky-500 ml-2 mt-2">25% Off</div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cat1