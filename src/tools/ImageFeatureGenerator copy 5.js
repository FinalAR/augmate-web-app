/* global cv */

import React, { useState, useRef } from 'react';

const ImageFeatureGenerator = () => {
  const [keypoints, setKeypoints] = useState([]);
  const [descriptors, setDescriptors] = useState([]);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

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
      drawFeaturePoints(file, keypoints);
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

    const descriptorsArray = descriptors.data32F;

    const keypointsArray = [];
    for (let i = 0; i < keypoints.size(); i++) {
      const keypoint = keypoints.get(i);
      const x = keypoint.pt.x;
      const y = keypoint.pt.y;
      keypointsArray.push({ x, y });
    }

    gray.delete();
    keypoints.delete();
    descriptors.delete();

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

  const drawFeaturePoints = (image, keypoints) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      ctx.fillStyle = 'red';
      ctx.strokeStyle = 'red';
      keypoints.forEach(keypoint => {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    img.src = URL.createObjectURL(image);
  };

  return (
    <div>
      <input id="input" type="file" accept="image/*" onChange={handleFileChange} />
      {error && <div>Error: {error}</div>}
      <div>
        <h4>Extracted Features:</h4>
        <ul>
          <li>Number of Keypoints: {keypoints.length}</li>
          <li>Number of Descriptors: {descriptors.length}</li>
        </ul>
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ImageFeatureGenerator;
