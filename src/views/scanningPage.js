import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const ScanningPage = () => {
  const containerRef = useRef(null);
  const webcamRef = useRef(null);
  const openCvURL = 'https://docs.opencv.org/4.7.0/opencv.js';

  const [loadedOpenCV, setLoadedOpenCV] = useState(false);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [highlightedImage, setHighlightedImage] = useState(undefined);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const scanner = new jscanify();
    loadOpenCv(() => {
      if (selectedImage) {
        const newImg = document.createElement('img');
        newImg.src = selectedImage.src;

        newImg.onload = function () {
          if (newImg && newImg.complete) {
            const resultCanvas = scanner.extractPaper(newImg, 386, 500);
            containerRef.current.append(resultCanvas);

            const highlightedCanvas = scanner.highlightPaper(newImg);
            setHighlightedImage(highlightedCanvas);
          } else {
            console.error('Error: Image not loaded or incomplete.');
          }
        };
      }
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
          />
          <button onClick={captureImage}>Capture Image</button>
        </div>
        <div ref={containerRef} id="result-container"></div>
      </div>
    </>
  );
};

export default ScanningPage;
