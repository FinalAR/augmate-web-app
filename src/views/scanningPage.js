// import "../assets/css/progress.css";
// import "../assets/css/navBar.css";
// import "../assets/css/popup.css";
// import "../assets/css/elements.css";
// import { loadImage } from 'canvas'
// import { writeFileSync } from 'fs';
// import { writeFileSyncNEW } from 'file-system';

import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

// import { hash } from 'sharp-phash';
// import { hash , distance } from 'imghash';

// import { hash } from 'imghash';
// import { distance } from 'imghash';

// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import {MindARThree} from 'mind-ar/dist/mindar-image-three.prod.js';
// const imghash = require("imghash");

// const { getHash, hammingDistanceFromHash } = require('img-hasher');
// import { generateHash } from "perceptual-hash/index.ts";

// function hashingHandler() {
//     const hash1 = getHash('../assets/images/scanning/Original.jpg');
//     const hash2 = getHash('../assets/images/scanning/test1.jpg');

//     const distance = hammingDistanceFromHash(hash1, hash2);
//     console.log(distance);

//     return distance;
// }

function ScanningPage() {


  useEffect(() => {

    // hashingHandler();
    
    
    // const loadImageAndHash = async () => {
    //   const img1 = await loadImage("../assets/images/scanning/Original.jpg");
    //   const img2 = await loadImage("../assets/images/scanning/test1.jpg");
    //   // const img3 = await loadImage("./Lenna-sepia.jpg");
  
    //   const hash1 = await hash(img1);
    //   const hash2 = await hash(img2);
    //   // const hash3 = await hash(img3);
  
    //   // Now you have the perceptual hashes of the images
    //   console.log('Hash of image 1:', hash1);
    //   console.log('Hash of image 2:', hash2);
    //   // console.log('Hash of image 3:', hash3);
  
    //   // Compare the hashes to determine image similarity
    //   const similarity1_2 = await distance(hash1, hash2);
    //   // const similarity2_3 = await distance(hash2, hash3);
    //   // const similarity3_1 = await distance(hash3, hash1);
  
    //   console.log('Similarity between image 1 and image 2:', similarity1_2);
    //   // console.log('Similarity between image 2 and image 3:', similarity2_3);
    //   // console.log('Similarity between image 3 and image 1:', similarity3_1);
    // };
  
    // loadImageAndHash();

    // let total;

    // const targetMeta = {
    //   meshColor: 0x0000ff,
    //   progressPhase: 'phase 2',
    // }

    // const targetInfo = {
    //   contentPath: 'https://finalar.github.io/models/SurveySet/FoodPackD.glb',
    //   positionY: 0,
    //   scaleSet: 0.3,
    //   size: 11173332
    // };


    // const mindarThree = new MindARThree({
    //   container: document.querySelector("#container"),
    //   imageTargetSrc: "https://finalar.github.io/imageTargets/targets2.mind"
    // });

    // const { renderer, scene, camera } = mindarThree;

    // let ambientLight = new THREE.AmbientLight(0xcccccc, 1.0);
    // scene.add(ambientLight);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(1, 1, 1); // Adjust the light direction
    // scene.add(directionalLight);

    // //Models init

    // ///////////////////////////////////////////////////////////
    // ///////////////// Marker 0 -> targetInfo /////////////////
    // ///////////////////////////////////////////////////////////

    // const markerRoot = mindarThree.addAnchor(2);

    // let model = null;

    // var modelLoaded = false; // Flag to track if the model has been loaded
    // var loadingInProcess = false;

    // markerRoot.onTargetFound = () => {
    //   console.log("markerFound...");
    //   progressTime(targetMeta.progressPhase, 0);


    //   document.getElementById("marker_label").innerHTML = 'Marker Found';

    //   var begin = Date.now();
    //   var end;
    //   let mesh0;

    //   if (!modelLoaded && !loadingInProcess) {
    //     loadingInProcess = true;
    //     console.time("Time this");
    //     let loader = new GLTFLoader();

    //     total = targetInfo.size

    //     loader.load(targetInfo.contentPath, function (gltf) {
    //       mesh0 = gltf.scene;
    //       mesh0.rotation.x = Math.PI / 2;
    //       mesh0.position.y = targetInfo.positionY;
    //       mesh0.scale.set(targetInfo.scaleSet, targetInfo.scaleSet, targetInfo.scaleSet);
    //       markerRoot.group.add(mesh0);

    //       console.timeEnd("Time this");
    //       end = Date.now();
    //       var timeSpent = (end - begin);
    //       progressTime(targetMeta.progressPhase, timeSpent);
    //       modelLoaded = true;
    //       loadingInProcess = false;

    //     }, onProgress, onError);
    //   }

    //   function onProgress(xhr) {
    //     console.log(xhr);

    //     if (xhr.total > 0) {
    //       var percentage = (xhr.loaded / total * 100);
    //       console.log(percentage + '% loaded');
    //       progress('phase 1', percentage);
    //     } else {
    //       var percentage = (xhr.loaded / total * 100);
    //       console.log(percentage + '% loaded');
    //       progress('phase 1', percentage);
    //     }
    //   }

    //   function onError(xhr) {
    //     console.log('An error happened');
    //     progress('phase 1', 'An error happened');
    //   }
    // }

    // markerRoot.onTargetLost = () => {
    //   console.log("Marker Lost...");

    //   document.getElementById("marker_label").innerHTML = 'Marker Lost';

    //   progress('phase 1', 0);

    //   const phase2Label = document.getElementById("phase 2 label");
    //   phase2Label.textContent += ": Previous log";

    // }

    // ///////////////////////////////////////////////////////////////
    // const start = async () => {
    //   console.log("Before starting...");
    //   try {
    //     await mindarThree.start();
    //     console.log("After starting...");
    //     renderer.setAnimationLoop(() => {
    //       renderer.render(scene, camera);
    //     });
    //   } catch (error) {
    //     console.error("Error in start method:", error);
    //   }
    // };

    // const stop = async () => {
    //   console.log("Before stoping...");
    //   try {
    //     mindarThree.stop();
    //     console.log("After stoping...");
    //     mindarThree.renderer.setAnimationLoop(null);
    //   } catch (error) {
    //     console.error("Error in stop method:", error);
    //   }
    // };

    // const startButton = document.querySelector("#startButton");
    // const stopButton = document.querySelector("#stopButton");

    // startButton.addEventListener("click", () => {
    //   start();
    // });

    // // stopButton.addEventListener("click", () => {
    // //   stop();
    // // });

    // stopButton.addEventListener("click", () => {
    //   console.log("Before Pause")
    //   mindarThree.pause();
    // });

    // // stopButton.addEventListener("click", () => {
    // //   mindarThree.stop();
    // //   mindarThree.renderer.setAnimationLoop(null);
    // // });

    // ////////////////// Supporting Functions

    // //Prgress Loading Function
    // function progress(phase, percentage) {
    //   var elem = document.getElementById(phase);
    //   var width = Math.floor(window.innerWidth * percentage)

    //   //var width = Math.floor(percentage * 100);
    //   //if (width <= 100) {
    //   elem.style.width = percentage + '%';
    //   document.getElementById(phase + " label").innerHTML = Math.floor(percentage) + '%';
    //   //}
    //   console.log("Progress width: " + width);
    //   console.log("Progress presentage: " + percentage);
    // }

    // //Time loading 
    // function progressTime(phase, duration) {
    //   var elem = document.getElementById(phase);

    //   document.getElementById(phase + " label").innerHTML = " ";

    //   elem.style.width = '100%';
    //   document.getElementById(phase + " label").innerHTML = Math.floor(duration) + 'ms' + ' -->' + Math.floor(duration / 1000) + 's';
    //   console.log("Progress duration: " + duration);
    // }

    // const handleBack = () => {
    //   console.log('Button clicked!');
    //   mindarThree.stop();
    //   mindarThree.renderer.setAnimationLoop(null);
    // };

    // const backButton = document.querySelector("#backButton");

    // backButton.addEventListener("click", () => {
    //   handleBack();
    // });

    // return () => {
    //   mindarThree.stop();
    //   mindarThree.renderer.setAnimationLoop(null);
    // };
  }, []);



  return (
    <div id="container">
      <Link to='/home'>
        <button id="backButton">HOME</button>
      </Link>
      <img src="../assets/images/scanning/test1.jpg" id="image" />
    </div>
  );
}

export default ScanningPage;
