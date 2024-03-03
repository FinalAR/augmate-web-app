
import "../assets/scss/scanner.scss";
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const ScanningPage = () => {
  const containerRef = useRef(null);
  const webcamRef = useRef(null);
  const openCvURL = 'https://docs.opencv.org/4.7.0/opencv.js';

  const [loadedOpenCV, setLoadedOpenCV] = useState(false);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [highlightedImage, setHighlightedImage] = useState(undefined);

  // useEffect(() => {
  //   // eslint-disable-next-line no-undef
  //   const scanner = new jscanify();
  //   loadOpenCv(() => {
  //     if (selectedImage) {
  //       const newImg = document.createElement('img');
  //       newImg.src = selectedImage.src;

  //       newImg.onload = function () {
  //         if (newImg && newImg.complete) {
  //           const resultCanvas = scanner.extractPaper(newImg, 386, 500);
  //           containerRef.current.append(resultCanvas);

  //           const highlightedCanvas = scanner.highlightPaper(newImg);
  //           setHighlightedImage(highlightedCanvas);
  //         } else {
  //           console.error('Error: Image not loaded or incomplete.');
  //         }
  //       };
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedImage]);
  useEffect(() => {
    if (!selectedImage) return; // Add a check to ensure selectedImage is defined
  
    // eslint-disable-next-line no-undef
    const scanner = new jscanify();
    loadOpenCv(() => {
      const newImg = document.createElement('img');
      newImg.src = selectedImage.src;
  
      newImg.onload = function () {
        if (newImg && newImg.complete) {
          const resultCanvas = scanner.extractPaper(newImg, 386, 500);
          if (resultCanvas) {
            containerRef.current.innerHTML = ''; // Clear container before appending
            containerRef.current.append(resultCanvas);
          } else {
            console.error('Error: extractPaper returned null or undefined');
          }
  
          const highlightedCanvas = scanner.highlightPaper(newImg);
          if (highlightedCanvas) {
            setHighlightedImage(highlightedCanvas);
          } else {
            console.error('Error: highlightPaper returned null or undefined');
          }
        } else {
          console.error('Error: Image not loaded or incomplete.');
        }
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  useEffect(() => {
    if (highlightedImage) {
      containerRef.current.innerHTML = '';
      containerRef.current.append(highlightedImage);
    }
  }, [highlightedImage]);

  const loadOpenCv = (onComplete) => {
    const isScriptPresent = !!document.getElementById('open-cv');
    if (isScriptPresent || loadedOpenCV) {
      setLoadedOpenCV(true);
      onComplete();
    } else {
      const script = document.createElement('script');
      script.id = 'open-cv';
      script.src = openCvURL;

      script.onload = function () {
        setTimeout(function () {
          onComplete();
        }, 1000);
        setLoadedOpenCV(true);
      };
      document.body.appendChild(script);
    }
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelectedImage({ src: imageSrc });
  };

  return (
    <>
      <div className="scanner-container">
        <div>
          {!loadedOpenCV && (
            <div>
              <h2>Loading OpenCV...</h2>
            </div>
          )}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
            screenshotQuality={1}
          />
          {/* <div className="container">
            <div className="scan">
            <button onClick={captureImage}><div className="fingerprint">SCAN</div></button>
            <h3></h3>
            </div>
          </div> */}
          <button onClick={captureImage}>SCAN</button>  
        </div>
        <div ref={containerRef} id="result-container"></div>
      </div>
    </>
  );
};

export default ScanningPage;
