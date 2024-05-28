import PropTypes from "prop-types";
import ScaleLoader from "react-spinners/ScaleLoader";

function Spinner({ loading }) {
  Spinner.propTypes = {
    loading: PropTypes.bool,
  };
  return (
    loading && (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-100 z-50">
        <ScaleLoader
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
  );
}

export default Spinner;
