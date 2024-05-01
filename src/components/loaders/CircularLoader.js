import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../assets/css/loader.css";

const CircularLoading = ({ loading, color, progress }) => {

  const roundedProgress = Math.floor(progress)

  return (
    <div className="loader-container">
      {loading && (
        <CircularProgressbar
          value={progress}
          text={`${roundedProgress}%`} 
          strokeWidth={8} 
          //text={`${progress}%`}
          styles={{
            path: {
              stroke: color || "#ffffff"
            },
            text: {
              fill: color || "#ffffff",
              fontFamily: "Arial, sans-serif", 
              fontSize: "18px", 
              fontWeight: "bold" 
            }
          }}
        />
      )}
    </div>
  );
};

export default CircularLoading;
