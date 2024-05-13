import { FaTh } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { NavLink, } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Spinner from "../../components/Spinner";
import { IoIosAddCircleOutline } from "react-icons/io";
// import { toast } from 'react-toastify';

function Detailspg() {
  const menuItems = [
    { path: "/adminH", name: "Home", icon: <FaTh className="ml-1" /> },
    { path: "/addItems", name: "Add Product", icon: <IoIosAddCircleOutline size={24} /> },
  ];

  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Exit early if id is not available

      try {
        setIsLoading(true)
        const url = `http://localhost:3001/api/product/${id}`;
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Request Failed');
        }

        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false) // Set loading to true after initiating the fetch
      }
    };

    fetchData();

  }, [id]); // Re-run useEffect when id changes

  return (
    <>
      <div className='Detailspg'>
        <div className="container flex">
          <div className='fixed bg-black text-white h-full flex flex-col w-64'>
            <div className="top_section flex items-center py-4">
            </div>
            {menuItems.map((item, index) => (
              <NavLink key={index} to={item.path} className='link flex items-center py-3 px-8 gap-4'>
                <div className="icon text-xl mt-3">{item.icon}</div>
                <span className='link_text text-base mt-3'>{item.name}</span>
              </NavLink>
            ))}

            <button type="button" className="mt-auto mb-10 cursor-not-allowed" disabled={true}>
              <CiLogout className="inline-block mr-3" size={24} />Log Out
            </button>
          </div>
        </div>

        <main className="flex flex-col ml-64 text-center h-screen justify-center items-center">
          <form>
            {productData ? (
              <>
                <div className="flex flex-col items-center">
                  <img src={`/${productData.imageURL}`} alt={productData.name} className="h-80 w-96 object-fill rounded-t-xl" />
                  <button type="button" className="bg-sky-400 py-2 px-3 my-2 rounded-lg">
                    Upload Image
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 ml-36">
                  <div className="block">
                    <label className="mr-4">Name:</label>
                    <input
                      type="text"
                      value={productData.name}
                      onChange={(event) => setName(event.target.value)}
                    />
                    <label className="mr-4 mt-4">Description:</label>
                    <textarea
                      type="text"
                      value={productData.description}
                      onChange={(event) => setDescription(event.target.value)}
                      cols="30"
                    />
                  </div>
                  <div className="block">
                    <label className="mr-4">Category:</label>
                    <input
                      type="text"
                      value={productData.category}
                      onChange={(event) => setCategory(event.target.value)}
                    />
                    <label className="mr-4 mt-4">Price:</label>
                    <input
                      type="number"
                      value={productData.price}
                      onChange={(event) => setPrice(event.target.value)}
                    />
                  </div>
                </div>


              </>
            ) : (
              <Spinner loading={isLoading} />
            )}
          </form>

          <div>
            <button type="button" className="bg-sky-500 m-3 p-2 rounded-lg">Update</button>
          </div>
        </main>
      </div>

    </>
  )
}

export default Detailspg