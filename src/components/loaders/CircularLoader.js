import React from "react";
// import { CircularProgressbar } from "react-circular-progressbar";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../assets/css/loader.css";
import preloadSupporterGif from "../../assets/animation/preload_supporter.gif";

const CircularLoading = ({ loading, color, progress }) => {

  const roundedProgress = Math.floor(progress)

  // return (
  //   <div className="loader-container">
  //     {loading && (
  //       <CircularProgressbar
  //         value={progress}
  //         text={`${roundedProgress}%`} 
  //         strokeWidth={5} 
  //         //text={`${progress}%`}
  //         styles={{
  //           path: {
  //             stroke: color || "#ffffff"
  //           },
  //           text: {
  //             fill: color || "#ffffff",
  //             fontFamily: "Arial, sans-serif", 
  //             fontSize: "16px", 
  //             fontWeight: "bold" 
  //           }
  //         }}
  //       />
  //     )}
  //   </div>
  // );
  return (
    <div className="loader-container">
      {loading && (
        <CircularProgressbarWithChildren
          value={progress}
          // text={`${roundedProgress}%`}
          strokeWidth={4.5}
          styles={{
            path: {
              stroke: color || "#ffffff"
            },
            // text: {
            //   fill: color || "#ffffff",
            //   fontFamily: "Arial, sans-serif", // Change the font family
            //   fontSize: "15px", // Change the font size
            //   fontWeight: "bold" // Change the font weight
            //   // You can add more styling properties as needed
            // }
          }}
        >
          {/* Add the animated GIF as a child component */}
          <img
            src={preloadSupporterGif}
            // src="../../assets/animation/preload_supporter.gif" 
            alt="Please wait..."
            style={{ width: "50px", height: "50px" }} 
          />
           <div style={{ fill: color || "#ffffff",
              fontFamily: "Arial, sans-serif", // Change the font family
              fontSize: "25px", // Change the font size
              fontWeight: "bold" }}>

              <p>{`${roundedProgress}%`}</p>
            </div>
        </CircularProgressbarWithChildren>
      )}
    </div>
  );
};

export default CircularLoading;
