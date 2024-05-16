import { FaTh } from "react-icons/fa";
import { toast } from "react-toastify";
import { CiLogout } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Spinner from "../../components/Spinner";
import { IoIosAddCircleOutline } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';

function Detailspg() {
  //SideBar Components
  const menuItems = [
    { path: "/adminH", name: "Home", icon: <FaTh className="ml-1" /> },
    { path: "/addItems", name: "Add Product", icon: <IoIosAddCircleOutline size={24} /> },
  ];

  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const categoryOptions = ["Computing", "Networking", "Stationeries"];


  //Get A Single  Product By Id Logic
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Exit early if id is not available

      try {
        setIsLoading(true)
        const url = `https://workspaceb.vercel.app/api/product/${id}`;

        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Request Failed');
        }

        const data = await response.json();
        setProductData(data);
        setName(data.name);
        setCategory(data.category);
        setDescription(data.description);
        setPrice(data.price);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false) // Set loading to true after initiating the fetch
      }
    };

    fetchData();

  }, [id]); // Re-run useEffect when id changes


  // Handle image file selection
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };


  //Handle Update Logic
  async function handleUpdate(event) {
    event.preventDefault();

    const updatingFields = { name, category, description, price, };

    const formData = new FormData();
    formData.append('data', JSON.stringify(updatingFields));
    if (image) formData.append('image', image);

    const url = `https://workspaceb.vercel.app/api/updateProduct/${id}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Update failed!');
      } else {
        // eslint-disable-next-line no-unused-vars
        const updatedProductData = await response.json();
        navigate('/adminH')
        toast.success('Product Updated Succesfully!');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error Updating Product');
    }
  }

 
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

            <button type="button" className="mt-auto mb-10 mr-9 cursor-not-allowed">
              <CiLogout className="inline-block mr-3" size={24} />Log Out
            </button>
          </div>
        </div>

        <main className="flex flex-col ml-64 text-center h-screen justify-center items-center">
          <form onSubmit={handleUpdate}>
            {productData ? (
              <>
                <div className="flex flex-col items-center">
                  <img src={`https://workspaceb.vercel.app/images/${productData.imageURL}`} alt={productData.name} className="h-80 w-96 object-fill rounded-t-xl" />
                  <input type="file" className="mt-3" onChange={handleImageChange} name="image" />
                </div>

                <div className="grid grid-cols-2 gap-4 ml-36">
                  <div className="block">
                    <label className="mr-4">Name:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />

                    <label className="mr-4 mt-4">Description:</label>
                    <textarea
                      type="text"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      cols="30"
                    />
                  </div>

                  <div className="block">
                    <label className="mr-4">Category:</label>
                    <select
                      className="block p-2 rounded-md border border-gray-300  focus:border-sky-500"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}  >
                      {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>


                    <label className="mr-4 mt-4">Price:</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                    />

                  </div>
                </div>
              </>
            ) : (
              <Spinner loading={isLoading} />
            )}

            <div>
              <button type="submit" disabled={isLoading} className="bg-sky-500 m-3 p-2 rounded-lg">
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </main>
      </div >

    </>
  )
}

export default Detailspg