import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
// import { FaHome, FaCamera, FaRedo } from "react-icons/fa"; // Import icons
import { FaHome, FaCamera, FaRedo, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import icons
import "./../assets/css/capturing.css";
// import { useHistory } from "react-router-dom"; // Import useHistory hook

// Example image for modal top center
import logo from "./../assets/images/bg/fingerPrintButton2.png";
import axios from 'axios';
import getApiUrl from '../utility/apiUtils';
import identifyImage from './../tools/TargetFinder';

function CapturingComponent({ onStateChange, onPhashChange }) {
    const [capturedImage, setCapturedImage] = useState(null);
    const [capturedImageblob, setCapturedImageblob] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false); // State for loader visibility
    const [message, setMessage] = useState(""); // State for message display
    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const [failureMessage, setFailureMessage] = useState(""); // State for failure message
    const webcamRef = useRef(null);
    // const history = useHistory(); // Initialize useHistory hook

    const [boundaryBox, setBoundaryBox] = useState({
        x: "calc(50% - 100px)",
        y: "calc(50% - 100px)",
        width: "200px",
        height: "200px",
    });

    const chooseFacingMode = async () => {
        const availableDevices = await navigator.mediaDevices.enumerateDevices();
        console.log(JSON.stringify(availableDevices, null, 2));
        const rearCamera = availableDevices.find(device => device.kind === 'videoinput' && device.label.toLowerCase().includes('back'));
        return rearCamera ? 'environment' : 'user';
    };

    // const [videoConstraints, setVideoConstraints] = useState({
    //     facingMode: chooseFacingMode(),
    // });


    // const videoConstraints = {
    //     facingMode: "user",
    // };

     const videoConstraints = {
        facingMode: "environment"
    };


    // const capture = useCallback(async () => {
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     setCapturedImage(imageSrc);
    //     setShowModal(true);
    // }, [webcamRef]);

    const capture = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        // Convert base64 image to Blob
        const blob = await fetch(imageSrc).then((res) => res.blob());
        setCapturedImage(imageSrc);
        setCapturedImageblob(blob);
        setShowModal(true);
    }, [webcamRef]);

    const handleRecapture = () => {
        setCapturedImage(null);
        setShowModal(false);
        setFailureMessage("");
        setMessage(""); 
        setSuccessMessage("");
        setMessage(""); 
    };

    const handleIdentify = async () => {
        setLoading(true); // Show loader

        try {
            // Call the identifyImage function with the capturedImage
            const identificationResult = await identifyImage(capturedImageblob);
            setLoading(false); // Hide loader

            // Check the identification result
            if (identificationResult.status === 'Y') {
                setMessage("Success"); // Display success message
                setSuccessMessage("Identification Successful");
                setFailureMessage("");
                onPhashChange(identificationResult.targetpHash);
                onStateChange(1);

            } else {
                setMessage("Failure"); // Display failure message
                setSuccessMessage("");
                setFailureMessage("Identification Failed");
            }
        } catch (error) {
            console.error('Error identifying image:', error);
            setLoading(false);
            setMessage("Failure");
            setSuccessMessage("");
            setFailureMessage("Identification Failed");
        }
    };

    // const handleIdentify = () => {
    //     setLoading(true); // Show loader
    //     // Simulate identification process delay

    //     setTimeout(() => {
    //         setLoading(false); // Hide loader
    //         //setMessage("Identification successful"); // Display message
    //         setMessage("Success"); // Display message
    //         setSuccessMessage("Identification Successful"); // Display success message
    //         setFailureMessage(""); // Reset failure message
    //         setTimeout(() => {
    //             onPhashChange("1001110100101101011011111111011100111100011110100111101110110010");
    //             //onPhashChange("1111101001001110010100000000011100100111101100101001101010100000");
    //             onStateChange(1);
    //         }, 2000);

    //     }, 3000);


    // };

    // const handleIdentify = async () => {
    //     setLoading(true);
    //     try {
    //         // const response = await axios.post(
    //         // getApiUrl('content/find/identify-image'),
    //         // { image: capturedImage },
    //         // { responseType: 'json' }
    //         //  );

    //         // // const response = await fetch(getApiUrl(`content/find/identify-image?image=${encodeURIComponent(capturedImage)}`));
    //         // if (!response.ok) {
    //         //     throw new Error(`HTTP error! status: ${response.status}`);
    //         // }
    
    //         // const data = await response.json();


    //         console.log('Image identification Details:', data);
    //         console.log('Image identified JSON:', JSON.stringify(data));
    //         setLoading(false);
    //         setMessage("Success");
    //         setSuccessMessage("Identification Successful");
    //         setFailureMessage("");
    //         setTimeout(() => {
    //             onPhashChange("1001110100101101011011111111011100111100011110100111101110110010");
    //             onStateChange(1);
    //         }, 2000);
    //     } catch (error) {
    //         console.error('Error identifying image:', error);
    //         setLoading(false);
    //         setMessage("Failure");
    //         setSuccessMessage("");
    //         setFailureMessage("Identification Failed");
    //     }
    // };
    
    const goToHomePage = () => {
        // history.push("/"); // Redirect to the home page
    };

    // useEffect(() => {
    //   const updateBoundaryBox = () => {
    //     const webcamElement = webcamRef.current.video;
    //     const webcamWidth = webcamElement.videoWidth;
    //     const webcamHeight = webcamElement.videoHeight;
    //     const webcamAspectRatio = webcamWidth / webcamHeight;
    //     const windowAspectRatio = window.innerWidth / window.innerHeight;

    //     let width, height;

    //     if (windowAspectRatio > webcamAspectRatio) {
    //       // Fit to window width
    //       width = window.innerWidth - 20;
    //       height = width / webcamAspectRatio;
    //     } else {
    //       // Fit to window height
    //       height = window.innerHeight - 20;
    //       width = height * webcamAspectRatio;
    //     }

    //     setBoundaryBox({
    //       x: (window.innerWidth - width) / 2,
    //       y: (window.innerHeight - height) / 2,
    //       width: webcamElement.videoWidth,
    //       height: webcamElement.videoHeight,
    //     });
    //   };

    //   updateBoundaryBox();
    //   window.addEventListener("resize", updateBoundaryBox);

    //   return () => {
    //     window.removeEventListener("resize", updateBoundaryBox);
    //   };
    // }, []);

    return (
        <div className="webcontainer">
            <Button className="home-button" onClick={goToHomePage}>
                <FaHome />
            </Button>

            <Webcam
                audio={false}
                mirrored={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="webcam"
            />
            <div
                className="boundary-box border1"
                style={{
                    top: boundaryBox.y,
                    left: boundaryBox.x,
                    width: boundaryBox.width,
                    height: boundaryBox.height,
                }}
            />

            <div className="bottom-bar">
                <div className="photo-button" onClick={capture}>
                    <div className="circle"></div>
                    <div className="ring"></div>
                </div>
            </div>

            <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} style={{backgroundColor:"black"}}>
                {message === "Success" && (
                    <div className="message success">
                        {/* <FaCheckCircle />  */}
                        <span>Identification Successfull</span> {/* Add the success message */}
                    </div>
                )}
                {/* Display the failure message */}
                {message === "Failure" && (
                    <div className="message failure">
                        {/* <FaTimesCircle />  */}
                        <span>Identification Failed</span> {/* Add the failure message */}
                    </div>
                )}
                <img src={logo} alt="Logo" className="modal-logo" />
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Identify Image</h2>
                {/* {message && (
          <div className="message" style={{ color: "green", textAlign: "center" }}>
            {message}
          </div>
        )} */}
                {/* {successMessage && (
          <div className="message success">
            <FaCheckCircle />
            <span>{successMessage}</span>
          </div>
        )}
        {failureMessage && (
          <div className="message failure">
            <FaTimesCircle />
            <span>{failureMessage}</span>
          </div>
        )} */}
                <img src={capturedImage} alt="Captured" className="captured-image" />
                <div className="modal-buttons">
                    <Button variant="primary" onClick={handleIdentify}>
                        <FaCamera /> Identify
                    </Button>
                    <Button variant="danger" onClick={handleRecapture}>
                        <FaRedo /> Recapture
                    </Button>
                </div>
                {loading && (
                    <div className="searchLoading">
                        <span>SEARCHING..</span>
                    </div>
                )}

            </Modal>
        </div>
    );
}

export default CapturingComponent;
