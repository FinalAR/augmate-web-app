import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../assets/css/loader.css";

const CircularLoading = ({ loading, color, progress }) => {
  return (
    <div className="loader-container">
      {loading && (
        <CircularProgressbar
          value={progress}
        //   text={`${progress}%`}
          styles={{
            path: {
              stroke: color || "#ffffff"
            },
            text: {
              fill: color || "#ffffff"
            }
          }}
        />
      )}
    </div>
  );
};

export default CircularLoading;
