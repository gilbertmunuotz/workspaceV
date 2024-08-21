/* eslint-disable react/no-unescaped-entities */
import Masked from "/2248500.jpg";
import Network from "/network.jpg";
import Printers from "/printers.jpg";
import Desktops from "/desktops.jpg";
import AboutImage from "/WhoAreWe.jpg";
import { useNavigate } from "react-router-dom";

function Body() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="Body">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-0 mx-12">
        <section className="px-12 my-10">
          <img
            src={Masked}
            alt="MaskedImage"
            className="rounded-l-full rounded-tr-full md:mt-20"
            loading="lazy"
          />
        </section>

        <div className="text-xl self-center mx-12 sm:mt-12">
          <h1 className="font-serif">
            "Workspace Computers is a leading provider of wholesale and retail
            ICT devices and equipment, catering to the diverse needs of
            businesses and individuals in Dar es Salaam, Tanzania, and beyond.
            We offer a comprehensive range of products and services, ensuring
            you have access to the latest technology at competitive prices."
          </h1>
        </div>
      </div>

      <div className="categories">
        <h1 className="text-center text-4xl font-bold my-7 font-serif">
          Categories
        </h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mx-12 mb-8">
          <div
            className="relative cursor-pointer"
            onClick={() => handleNavigate("/category1")}
          >
            <img
              loading="lazy"
              src={Desktops}
              alt="MacBook Desktop"
              className="h-72 w-11/12 rounded-sm bg-contain"
            />
            <p className="absolute inset-x-0 bottom-0 text-center m-8 text-white text-lg">
              Laptops & Desktops
            </p>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => handleNavigate("/category2")}
          >
            <img
              loading="lazy"
              src={Network}
              alt="Networking Switch"
              className="h-72 w-11/12 rounded-sm bg-contain"
            />
            <p className="absolute inset-x-0 bottom-0 text-center m-8 text-white text-lg">
              Networking & Communications
            </p>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => handleNavigate("/category3")}
          >
            <img
              loading="lazy"
              src={Printers}
              alt="PrintersImage"
              className="h-72 w-11/12 rounded-sm bg-contain"
            />
            <p className="absolute inset-x-0 bottom-0 text-center m-8 text-white text-lg">
              Printers, Scanners & Photocopies
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-16 mx-12">
        <section className="self-center mx-12">
          <h1 className="text-center text-3xl font-serif">Who Are We...</h1>
          <p className="text-lg font-serif">
            We are a group of dedicated individuals committed to providing the
            best. With years of experience in the industry, we strive to be the
            best in our field and put our customers first. Our team is
            passionate about building relationships with each and every one of
            you and creating an environment where everyone feels welcome. We
            work hard to ensure that your experience with us is perfect, and we
            are here to help you. Thank you for choosing us as your go-to
            provider; we look forward serving you!.
          </p>
        </section>

        <section className="mx-12">
          <div>
            <img
              loading="lazy"
              src={AboutImage}
              alt="AboutImage"
              className="rounded-sm md:mt-24"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Body;