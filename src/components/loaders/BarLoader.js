import React from "react";
import BarLoader from "react-spinners/BarLoader";
import "../../assets/css/loader.css";

const BarLoading = ({ loading, color }) => {
  return (
    <div className="loader-container">
      <BarLoader
        color={color || "#ffffff"}
        loading={loading}
        cssOverride={{}}
        height={30}
        width={200}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default BarLoading;
