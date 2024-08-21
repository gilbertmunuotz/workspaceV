import { toast } from "react-toastify";
import { IoHome } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Spinner from "../../components/Spinner";
import { BiSolidCategory } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';

function Detailspg() {

  //SideBar Components
  const menuItems = [
    { path: "/adminH", name: "Home", icon: <IoHome className="ml-1" /> },
    { path: "/addCategory", name: "Add Category", icon: <BiSolidCategory size={24} /> },
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
  const [categoryOptions, setCategoryOptions] = useState([]);

  //Get A Single  Product By Id Logic
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Exit early if id is not available

      try {
        setIsLoading(true)
        const url = `/api/product/${id}`;

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

        // Fetch all categories
        const categoriesResponse = await fetch(`/api/allCats`);
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data2 = await categoriesResponse.json();
        setCategoryOptions(data2.categories);

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

    const url = `/api/updateProduct/${id}`;

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


        <main className="flex flex-col text-center h-screen justify-center items-center">
          <form onSubmit={handleUpdate} className="w-full max-w-lg grid grid-cols-3 gap-4">
            {productData ? (
              <>
                <div className="flex flex-col items-center mb-6 w-96">
                  <img
                    src={`http://localhost:8000/images/${productData.imageURL}`}
                    alt={productData.name}
                    className="h-80 w-96 object-fill rounded-t-xl mt-6 mr-48"
                  />
                  <input
                    type="file"
                    onChange={handleImageChange}
                    name="image"
                    className="block w-full text-sm text-gray-500 mt-3 file:mr-4 file:py-2 file:cursor-pointer file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-300 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <div className="products block w-full col-span-2 ml-36">
                  <div className="mb-4">
                    <label className="block text-left mb-2">Name:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="w-full p-2 rounded-md border border-gray-300 focus:border-sky-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-left mb-2">Description:</label>
                    <textarea
                      type="text"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      cols="30"
                      rows="4"
                      className="w-full p-2 rounded-md border border-gray-300 focus:border-sky-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-left mb-2">Category:</label>
                    <select
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="block w-full p-2 rounded-md border border-gray-300 focus:border-sky-500"
                    >
                      {/* Options for the categories of the specific product */}
                      {productData && (
                        <option value={productData.category}>{productData.category}</option>
                      )}
                      {/* Options for all available categories */}
                      {categoryOptions.map((option) => (
                        <option key={option._id} value={option.category}>
                          {option.category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-left mb-2">Price:</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                      className="w-full p-2 rounded-md border border-gray-300 focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-sky-500 m-3 p-2 rounded-lg text-white ml-64"
                  >
                    {isLoading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </>
            ) : (
              <Spinner loading={isLoading} />
            )}
          </form>
        </main>
      </div >
    </>
  )
}

export default Detailspg
