/* global cv */
import axios from 'axios';
import getApiUrl from '../utility/apiUtils';

async function identifyImage(capturedImage) {
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
  
      const keypointsArray = [];
      for (let i = 0; i < keypoints.size(); i++) {
        const keypoint = keypoints.get(i);
        const x = keypoint.pt.x;
        const y = keypoint.pt.y;
        keypointsArray.push({ x, y });
      }
  
      gray.delete();
      keypoints.delete();
  
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
        console.log("Maching number of points:"+numGoodMatches);
        return numGoodMatches;
      } catch (error) {
        throw new Error('Error performing feature matching: ' + error);
      }
    };

    try {
        // Load the image and extract features
        const { keypoints: keypoints1, descriptors: descriptors1 } = await extractORBFeatures(capturedImage);

        // Get target images from the API
        const axiosResponse = await axios.get(getApiUrl('content/list/targets'));
        const targetImages = axiosResponse.data.data;

        // Loop through target images and perform feature matching
        for (const target of targetImages) {
            // Fetch the target image file
            const fetchResponse = await fetch(target.targetImage);
            const blob = await fetchResponse.blob();
            const file = new File([blob], 'targetImage.jpg', { type: 'image/jpeg' });

            // Load the image and extract features
            const { keypoints: keypoints2, descriptors: descriptors2 } = await extractORBFeatures(file);

            // Perform feature matching with the input image
            const numGoodMatches = await performImageMatching(descriptors1, descriptors2);

            if (numGoodMatches > 10) {
                return {
                    status: 'Y',
                    targetpHash: target.targetpHash
                };
            }
        }

        // If no match found
        return {
            status: 'N',
            targetpHash: null
        };
    } catch (error) {
        console.error('Error identifying image:', error);
        throw new Error('Error identifying image: ' + error);
    }
}

export default identifyImage;
