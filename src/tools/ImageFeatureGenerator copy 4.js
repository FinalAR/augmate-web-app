/* global cv */

import React, { useState } from 'react';

const ImageFeatureGenerator = () => {
  const [keypoints, setKeypoints] = useState([]);
  const [descriptors, setDescriptors] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      console.log('File selected:', file);
      // Load the image and extract features
      const { keypoints, descriptors } = await extractORBFeatures(file);
      console.log('Keypoints:', keypoints);
      console.log('Descriptors:', descriptors);
      setKeypoints(keypoints);
      setDescriptors(descriptors);
      setError(null);
    } catch (error) {
      console.error('Error extracting features:', error);
      setError('Error extracting features. Please try again.');
    }
  };

  const extractORBFeatures = async (file) => {
    console.log('Extracting ORB features from file:', file);
    // Load the image using OpenCV.js
    const img = await loadImage(file);
    console.log('Image loaded:', img);

    const gray = cv.imread(img, cv.IMREAD_GRAYSCALE);
    // Convert the image to grayscale
    // const gray = new cv.Mat();
    console.log('Gray image:', gray);

    //cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY, 0);

    // Create ORB detector
    // const orb = new cv.ORB(500, 1.2, 8, 31, 0, 2, cv.ORB_HARRIS_SCORE, 31, 20);

    const orb = new cv.ORB();
    console.log('Before ORB');
    // const orb = new cv.ORB(1000, 2, 8);
    // const orb = cv.AKAZE();
    console.log('ORB detector:', orb);

    // Detect keypoints and compute descriptors
    const keypoints = new cv.KeyPointVector();
    const descriptors = new cv.Mat();

    console.log('Keypoint object:', keypoints);
    console.log('Descriptors object:', descriptors);

    console.log('Before ORB compute');
    orb.detectAndCompute(gray, new cv.Mat(), keypoints, descriptors);

    console.log('Aftr ORB computer');

    console.log('Compute Keypoints:', keypoints);
    console.log('Compute Keypoints size:', keypoints.size());
    console.log('Compute Descriptors:', descriptors);

    console.log('Before JS array convertion');
    // Convert keypoints and descriptors to JavaScript arrays
    const descriptorsArray = descriptors.data32F;
    console.log('Descriptors array:', descriptorsArray);

    // const keypointsArray = keypoints;
    const keypointsArray = [];

    // Iterate over the keypoints object
    for (let i = 0; i < keypoints.size(); i++) {
      const keypoint = keypoints.get(i); // Get the i-th keypoint

      // Extract relevant information from the keypoint object
      const x = keypoint.pt.x; // X-coordinate of the keypoint
      const y = keypoint.pt.y; // Y-coordinate of the keypoint
      const response = keypoint.response; // Response of the keypoint
      // Extract other properties as needed

      // Push the keypoint information into the keypointArray
      keypointsArray.push({ x, y, response });
    }
    //const keypointsArray = keypoints.toArray();
    console.log('Keypoint Array:', keypointsArray);

    console.log('After JS array convertion');



    // Release resources
    gray.delete();
    keypoints.delete();
    descriptors.delete();
    //img.delete();

    return { keypoints: keypointsArray, descriptors: descriptorsArray };
    // return { descriptors: descriptorsArray };
  };

  const loadImage = (file) => {
    console.log('Loading image:', file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <input id="input" type="file" accept="image/*" onChange={handleFileChange} />
      {error && <div>Error: {error}</div>}
      <div>
        <h4>Extracted Features:</h4>
        <ul>
          <li>Number of Keypoints: {keypoints.length}</li>
          {/* Displaying keypoints might not be feasible */}
          <li>Keypoints: {JSON.stringify(keypoints)}</li>
          <li>Number of Descriptors: {descriptors.length}</li>
          {/* Displaying descriptors might not be feasible */}
          <li>Descriptors: {JSON.stringify(descriptors)}</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageFeatureGenerator;
