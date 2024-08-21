/* eslint-disable react/no-unescaped-entities */
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="Notfound">
      <Navbar />
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-lg font-semibold text-sky-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-lg leading-7 text-gray-600">The page you are looking for might be removed or is temporarily unavailable!</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to={"/"} className="rounded-3xl bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Go back home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Notfound;