/* global cv */

import React, { useState, useRef } from 'react';

const ImageFeatureGenerator = () => {
  const [keypoints1, setKeypoints1] = useState([]);
  const [descriptors1, setDescriptors1] = useState([]);
  const [keypoints2, setKeypoints2] = useState([]);
  const [descriptors2, setDescriptors2] = useState([]);
  const [error, setError] = useState(null);
  const [canvasSize1, setCanvasSize1] = useState({ width: 300, height: 200 });
  const [canvasSize2, setCanvasSize2] = useState({ width: 300, height: 200 });
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  const handleFileChange = async (event, canvasRef, setCanvasSize) => {
    const file = event.target.files[0];
    try {
      console.log('File selected:', file);
      // Load the image and extract features
      const { keypoints, descriptors } = await extractORBFeatures(file);
      console.log('Keypoints:', keypoints);
      console.log('Descriptors:', descriptors);

      if (canvasRef === canvasRef1) {
        setKeypoints1(keypoints);
        setDescriptors1(descriptors);
        console.log("key:"+keypoints);
        console.log("descrip:"+descriptors);
      } else {
        setKeypoints2(keypoints);
        setDescriptors2(descriptors);
      }

      const img = new Image();
      img.onload = () => {
        setCanvasSize({ width: 150, height: 100 }); // Adjust size here
        drawFeaturePoints(img, keypoints, canvasRef);
      };
      img.src = URL.createObjectURL(file);

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

  const drawFeaturePoints = (image, keypoints, canvasRef) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = canvasSize1.width;
    canvas.height = canvasSize1.height;
    ctx.drawImage(image, 0, 0, canvasSize1.width, canvasSize1.height);

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    keypoints.forEach(keypoint => {
      ctx.beginPath();
      ctx.arc(keypoint.x, keypoint.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  
  const handleMatchFeatures = async () => {
    try {
      let bf = new cv.BFMatcher(); // Use L2 norm and no cross-che
      console.log("bf:"+ bf);

      const matches = new cv.DMatchVectorVector();
      
      const dep1 = new cv.Mat(descriptors1);
      const dep2 = new cv.Mat(descriptors2);
      console.log("matches:"+ matches);
      console.log("descriptor1:"+ descriptors1);
      console.log("descriptor2:"+ descriptors2);
      console.log("dep1:"+ dep1);
      console.log("dep2:"+ dep2);
      bf.knnMatch(dep1, dep2, matches, 2); // k=2 for 2 nearest neighbors
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
      // const numGoodMatches = await performFeatureMatching(descriptors1, descriptors2);
      console.log('Number of good matches:', numGoodMatches);
    } catch (error) {
      console.error('Error matching features:', error);
      setError('Error matching features. Please try again.');
    }
  };

  const performFeatureMatching = async (descriptors1, descriptors2) => {
    try {
        // Perform feature matching using Brute-Force matcher
        let bf = new cv.BFMatcher(); // Use L2 norm and no cross-check
        console.log("bf:"+ bf);

        const matches = new cv.DMatchVectorVector();
        console.log("matches:"+ matches);
        console.log("dep1:"+ descriptors1);
        console.log("dep2:"+ descriptors2);
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
      <input id="input1" type="file" accept="image/*" onChange={(e) => handleFileChange(e, canvasRef1, setCanvasSize1)} />
      <canvas ref={canvasRef1} width={canvasSize1.width} height={canvasSize1.height}></canvas>
      <input id="input2" type="file" accept="image/*" onChange={(e) => handleFileChange(e, canvasRef2, setCanvasSize2)} />
      <canvas ref={canvasRef2} width={canvasSize2.width} height={canvasSize2.height}></canvas>
      {error && <div>Error: {error}</div>}
      <button onClick={handleMatchFeatures}>Match Features</button>
    </div>
  );
};

export default ImageFeatureGenerator;
