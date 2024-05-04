/* global cv */

// ImageFeatureExtractor.js
import React, { useState } from 'react';

const ImageFeatureExtractor = ({ onDescriptorsExtracted }) => {
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      console.log('File selected:', file);
      // Load the image and extract features
      const { keypoints, descriptors } = await extractORBFeatures(file);
      console.log('Keypoints:', keypoints);
      console.log('Descriptors:', descriptors);

      onDescriptorsExtracted(descriptors);
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
    const orb = new cv.ORB();
    const keypoints = new cv.KeyPointVector();
    const descriptors = new cv.Mat();

    orb.detectAndCompute(gray, new cv.Mat(), keypoints, descriptors);

    console.log("default descriptors:"+ descriptors);

    const descriptorsArray = descriptors;
    // const descriptorsArray = JSON.stringify(descriptors);

    // console.log("JSON descriptors:"+ descriptorsArray);

    // console.log("rebuild descripts:"+JSON.parse(descriptorsArray));

    // const keypointsArray = [];
    // for (let i = 0; i < keypoints.size(); i++) {
    //   const keypoint = keypoints.get(i);
    //   const x = keypoint.pt.x;
    //   const y = keypoint.pt.y;
    //   keypointsArray.push({ x, y });
    // }

    gray.delete();
    keypoints.delete();
    //descriptors.delete();

    return { descriptors: descriptorsArray };
  };
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default ImageFeatureExtractor;

