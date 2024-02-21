import React from "react";
import SquareLoader from "react-spinners/SquareLoader";
import "../../assets/css/loader.css";

const SquareLoading = ({ loading, color }) => {
  return (
    <div className="loader-container">
      <SquareLoader
        color={color || "#ffffff"}
        loading={loading}
        cssOverride={{}}
        size={150}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default SquareLoading;
