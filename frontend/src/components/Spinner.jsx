import PropTypes from 'prop-types';
import ScaleLoader from "react-spinners/ScaleLoader";


const override = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.7)",
    zIndex: 9999 // Set a high z-index to ensure it's above other content
};

function Spinner({ loading }) {
    Spinner.propTypes = {
        loading: PropTypes.bool,
    };
    return (
        loading && (
            <div className='loader' style={override}>
                <ScaleLoader
                    loading={loading}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        )
    );
}

export default Spinner;