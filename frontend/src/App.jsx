import Login from "./pages/admin/Login";
import Index from "./components/Index";
import Category1 from "./components/Cat1";
import Category2 from "./components/Cat2";
import Category3 from "./components/Cat3";
import AdminHome from "./pages/admin/Home";
import Notfound from "./components/Notfound";
import Register from "./pages/admin/Register";
import { ToastContainer } from 'react-toastify';
import PrivateRoutes from "./components/PrivateRoutes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Index />, errorElement: <Notfound /> },
  { path: "/category1", element: <Category1 />, errorElement: <Notfound /> },
  { path: "/category2", element: <Category2 />, errorElement: <Notfound /> },
  { path: "/category3", element: <Category3 />, errorElement: <Notfound /> },
  { path: "/adminH", element: (<PrivateRoutes><AdminHome /></PrivateRoutes>), errorElement: <Notfound /> },
  { path: "/register", element: <Register />, errorElement: <Register /> },
  { path: "/login", element: <Login />, errorElement: <Notfound /> },
]);
function App() {
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}


export default App;
