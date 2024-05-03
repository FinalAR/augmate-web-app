/* global cv */

import React, { useState } from 'react';

const ImageFeatureGenerator = () => {
  const [keypoints, setKeypoints] = useState([]);
  const [descriptors, setDescriptors] = useState([]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      // Ensure that cv is available
      await waitForCv();

      // Extract ORB features
      const { keypoints, descriptors } = await extractORBFeatures(file);
      setKeypoints(keypoints);
      setDescriptors(descriptors);
    } catch (error) {
      console.error('Error extracting features:', error);
    }
  };

  const extractORBFeatures = async (file) => {
    // Load the image using OpenCV.js
    const img = await cv.imread(file);

    // Convert the image to grayscale
    const gray = new cv.Mat();
    cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY, 0);

    // Create ORB detector
    const orb = new cv.ORB();

    // Detect keypoints and compute descriptors
    const keypoints = new cv.KeyPointVector();
    const descriptors = new cv.Mat();
    orb.detectAndCompute(gray, new cv.Mat(), keypoints, descriptors);

    // Convert keypoints and descriptors to JavaScript arrays
    const keypointsArray = keypoints.toArray();
    const descriptorsArray = descriptors.data32F;

    // Release resources
    gray.delete();
    keypoints.delete();
    descriptors.delete();
    img.delete();

    return { keypoints: keypointsArray, descriptors: descriptorsArray };
  };

  const waitForCv = async () => {
    // Ensure that cv is available
    while (!window.hasOwnProperty('cv')) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  return (
    <div>
      <input id="input" type="file" accept="image/*" onChange={handleFileChange} />
      <div>
        <h4>Extracted Features:</h4>
        <ul>
          <li>Number of Keypoints: {keypoints.length}</li>
          {/* Displaying keypoints might not be feasible */}
          {/* <li>Keypoints: {JSON.stringify(keypoints)}</li> */}
          <li>Number of Descriptors: {descriptors.length}</li>
          {/* Displaying descriptors might not be feasible */}
          {/* <li>Descriptors: {JSON.stringify(descriptors)}</li> */}
        </ul>
      </div>
    </div>
  );
};

export default ImageFeatureGenerator;
