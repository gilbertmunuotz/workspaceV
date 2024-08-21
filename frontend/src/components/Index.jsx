import Form from "./Form";
import Footer from "./Footer";
import Body from "../pages/user/Body";
import Home from "../pages/user/Home";
import Navbar from "../components/Navbar";

function Index() {
    return (
        <div className="Index">
            <Navbar />
            <Home />
            <Body />
            <Form />
            <Footer />
        </div>
    )
}

export default Index;