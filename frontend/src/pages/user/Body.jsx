import React from 'react'
import { Link } from "react-router-dom";
import Masked from '../../assets/2248500.jpg'
import Network from "../../assets/network.jpg"
import Printers from "../../assets/printers.jpg"
import Desktops from "../../assets/desktops.jpg"
import AboutImage from "../../assets/WhoAreWe.jpg"

function Body() {
    return (
        <div className="Body">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-0 mx-12">
                <section className="px-12 my-10">
                    <img src={Masked} alt="MaskedImage" className="rounded-l-full rounded-tr-full md:mt-20" />
                </section>

                <div className="text-xl self-center mx-12 sm:mt-12">
                    <h1 className="font-serif">
                        "Workspace Computers is a leading provider of wholesale and retail ICT devices and equipment, catering to the diverse needs of businesses and individuals in Dar es Salaam, Tanzania, and beyond.
                        We offer a comprehensive range of products and services, ensuring you have access to the latest technology at competitive prices."
                    </h1>
                </div>
            </div>

            <div className="categories">
                <h1 className="text-center text-4xl font-bold my-7 font-serif">Categories</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mx-12 mb-8">
                    <Link to={"/category1"}>
                        <div className="relative cursor-pointer">
                            <img src={Desktops} alt="MacBook Desktop" className="h-72 w-11/12 rounded-sm bg-contain" />
                            <p className="absolute inset-x-0 bottom-0 text-center m-8 text-white text-lg">Laptops & Desktops</p>
                        </div>
                    </Link>
                    <Link to={"/category2"}>
                        <div className="relative cursor-pointer">
                            <img src={Network} alt="Networking Switch" className="h-72 w-11/12 rounded-sm bg-contain" />
                            <p className="absolute inset-x-0 bottom-0 text-center m-8 text-white text-lg">Networking & Communications</p>
                        </div>
                    </Link>
                    <Link to={"/category3"}>
                        <div className="relative cursor-pointer">
                            <img src={Printers} alt="PrintersImage" className="h-72 w-11/12 rounded-sm bg-contain" />
                            <p className="absolute inset-x-0 bottom-0 text-center m-8 text-white text-lg">Printers, Scanners & Photocopies</p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-16 mx-12">
                <section className="self-center mx-12">
                    <h1 className="text-center text-3xl font-serif">Who Are We...</h1>
                    <p>We are a group of dedicated individuals committed to providing the best. With years of experience in the industry, we strive to be the best in our field and put our customers first. Our team is passionate about building relationships with each and every one of you and creating an environment where everyone feels welcome. We work hard to ensure that your experience with us is perfect, and we are here to help you. Thank you for choosing us as your go-to provider; we look forward serving you!.</p>
                </section>

                <section className="mx-12">
                    <div>
                        <img src={AboutImage} alt="AboutImage" className="rounded-sm md:mt-24" />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Body