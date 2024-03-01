import React from "react";
import RiseLoader from "react-spinners/RiseLoader";
import "../../assets/css/loader.css";

const RiseLoading = ({ loading, color }) => {
  return (
    <div className="loader-container">
      {/* <SquareLoader
        color={color || "#ffffff"}
        loading={loading}
        cssOverride={{}}
        size={150}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
      <RiseLoader
        color={color || "#7e14a4"}
        cssOverride={{}}
        loading={loading}
        margin={0}
        size={30}
        speedMultiplier={1}
      />
    </div>
  );
};

export default RiseLoading;
