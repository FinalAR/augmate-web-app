import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import "../../assets/css/loader.css";

const BounceLoading = ({ loading, color }) => {
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

      <BounceLoader
        color={color || "#ec35f7"}
        cssOverride={{}}
        loading={loading}
        size={70}
        speedMultiplier={1}
      />
    </div>
  );
};

export default BounceLoading;
