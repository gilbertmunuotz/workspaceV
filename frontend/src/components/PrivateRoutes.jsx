import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../auth/authSlice";

function PrivateRoutes({ children }) {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        // Conditional rendering based on authentication state
        isLoggedIn ? children : <Navigate to="/login" replace />
    );
}

PrivateRoutes.propTypes = {
    children: PropTypes.node.isRequired,
};
export default PrivateRoutes