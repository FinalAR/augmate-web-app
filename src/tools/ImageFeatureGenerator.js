/* global cv */

import React, { useState, useRef } from 'react';
import axios from 'axios';

const ImageFeatureGenerator = () => {
  const [keypoints1, setKeypoints1] = useState([]);
  const [descriptors1, setDescriptors1] = useState([]);
  const [keypoints2, setKeypoints2] = useState([]);
  const [descriptors2, setDescriptors2] = useState([]);

  const [error, setError] = useState(null);
  const [inputImage, setInputImage] = useState(null);
  const [matchedTarget, setMatchedTarget] = useState(null);


  const descriptors1Ref = useRef(null); // Ref for storing descriptors of image 1
  const descriptors2Ref = useRef(null); // Ref for storing descriptors of image 2



  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    
    try {
      console.log('File selected:', file);
      // Load the image and extract features
      const { keypoints, descriptors } = await extractORBFeatures(file);
      console.log('Keypoints1:', keypoints);
      console.log('Descriptors1:', descriptors);

      // cv.FileStorage_BASE64(descriptors);

      // const convertJSON = matToJson(descriptors);

      // console.log("Dep1 JSON object: " + JSON.stringify(convertJSON));

     
        setKeypoints1(keypoints);
        setDescriptors1(descriptors)

        descriptors1Ref.current= descriptors;

        // console.log("key:" + keypoints);
        // console.log("descrip:" + descriptors);

      setError(null);
      setInputImage(file);
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

    console.log("default descriptors:" + descriptors);

    const descriptorsArray = descriptors;
    // const descriptorsArray = JSON.stringify(descriptors);

    // console.log("JSON descriptors:"+ descriptorsArray);

    // console.log("rebuild descripts:"+JSON.parse(descriptorsArray));

    const keypointsArray = [];
    for (let i = 0; i < keypoints.size(); i++) {
      const keypoint = keypoints.get(i);
      const x = keypoint.pt.x;
      const y = keypoint.pt.y;
      keypointsArray.push({ x, y });
    }

    gray.delete();
    keypoints.delete();
    //descriptors.delete();

    return { keypoints: keypointsArray, descriptors: descriptorsArray };
  };

  const loadImage = (file) => {
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


  const handleMatchFeatures = async () => {
    try {
      if (!inputImage) {
        setError('Please select an input image.');
        return;
      }
  
      // Get target images from the API
      const axiosResponse = await axios.get('http://localhost:5000/api/v1/content/list/targets');
      const targetImages = axiosResponse.data.data;
  
      for (const target of targetImages) {
        const filePath = target.targetImage;
        console.log("File Path:"+filePath);

        try {
          // Fetch the target image file
          const fetchResponse = await fetch(filePath);
          const blob = await fetchResponse.blob();
          const file = new File([blob], 'targetImage.jpg', { type: 'image/jpeg' });
  
          console.log('File selected:', file);
  
          // Load the image and extract features
          const { keypoints: keypoints2, descriptors: descriptors2 } = await extractORBFeatures(file);
          console.log('Keypoints2:', keypoints2);
          console.log('Descriptors2:', descriptors2);
  
          // Set keypoints and descriptors
          setKeypoints2(keypoints2);
          setDescriptors2(descriptors2);
          descriptors2Ref.current = descriptors2;
  
          setError(null);
        } catch (error) {
          console.error('Error extracting features:', error);
          setError('Error extracting features. Please try again.');
        }
  
        // Perform feature matching with the input image
        console.log('Descriptors1:', descriptors1);
        console.log('Descriptors2:', descriptors2);
        console.log('Descriptors2Ref:', descriptors2Ref.current);
        const numGoodMatches = await performImageMatching(descriptors1, descriptors2Ref.current);
        console.log("Matches Number:" + numGoodMatches);

        if (numGoodMatches > 10) {
          setMatchedTarget(target);
          setError(null);
          return; // Stop matching process after finding the first match
        }
      }
  
      // If no match found
      setError('No matching target found.');
    } catch (error) {
      console.error('Error matching features:', error);
      setError('Error matching features. Please try again.');
    }
  };
  
  const performImageMatching = async (descriptors1, descriptors2) => {
    try {
      // Perform feature matching using Brute-Force matcher
      let bf = new cv.BFMatcher(); // Use L2 norm and no cross-check
      console.log("bf:" + bf);

      const matches = new cv.DMatchVectorVector();
      console.log("matches:" + matches);
      console.log("dep1:" + descriptors1);
      console.log("dep2:" + descriptors2);
      bf.knnMatch(descriptors1, descriptors2, matches, 2); // k=2 for 2 nearest neighbors
      console.log("going for loop");
      // Apply ratio test and count good matches
      let numGoodMatches = 0;

      for (let i = 0; i < matches.size(); i++) {
        const match = matches.get(i);
        const m = match.get(0);
        const n = match.get(1);
        if (m.distance < 0.75 * n.distance) { // threshold of ratio testing
          numGoodMatches++;
        }
      }

      return numGoodMatches;
    } catch (error) {
      throw new Error('Error performing feature matching: ' + error);
    }
  };

  return (
    <div>
      <input id="input1" type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleMatchFeatures}>Match Features</button>
      {matchedTarget && (
        <div>
          <h2>Matched Target:</h2>
          <img src={matchedTarget.targetImage} alt="Matched Target" />
          <p>TargetpHash: {matchedTarget.targetpHash}</p>
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default ImageFeatureGenerator;
