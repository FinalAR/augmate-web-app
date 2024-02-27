import "../assets/css/progress.css";
import "../assets/css/navBar.css";
import "../assets/css/popup.css";
import "../assets/css/elements.css";

import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';

import ContentPollingComponent from '../components/ContentPollingComponent';
import ImageHashHandler from '../tools/ImageHashHandler';

import SquareLoading from '../components/loaders/SquareLoader';

// import dotenv from 'dotenv';
// dotenv.config();

const backendUrl = "http://localhost:5000"

function AdexplorePage() {

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#9003c3");

  const [arDoc, setDocument] = useState(null);

  const handleContentChange = (newDocument) => {
    // Update AR scene with new document data
    setDocument(newDocument);
  };

  const phashId = "1111101001001110010100000000011100100111101100101001101010100000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/api/v1/content/findv2/${phashId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDocument(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!arDoc) return;

    let total;

    const mindarThree = new MindARThree({
      container: document.querySelector("#container"),
      imageTargetSrc: arDoc.imageTargetSrc
    });

    const { renderer, scene, camera } = mindarThree;

    let ambientLight = new THREE.AmbientLight(0xcccccc, 1.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1); // Adjust the light direction
    scene.add(directionalLight);

    //Models init

    ///////////////////////////////////////////////////////////
    ///////////////// Marker 0 -> targetInfo /////////////////
    ///////////////////////////////////////////////////////////

    const markerRoot = mindarThree.addAnchor(1);


    var modelLoaded = false; // Flag to track if the model has been loaded
    var loadingInProcess = false;

    markerRoot.onTargetFound = () => {
      console.log("markerFound...");
      progressTime('phase 2', 0);
      setLoading(true)

      document.getElementById("marker_label").innerHTML = 'Marker Found';

      var begin = Date.now();
      var end;
      let mesh0;

      if (!modelLoaded && !loadingInProcess) {
        loadingInProcess = true;
        console.time("Time this");
        let loader = new GLTFLoader();

        total = arDoc.size

        loader.load(arDoc.contentPath, function (gltf) {
          mesh0 = gltf.scene;
          mesh0.rotation.x = Math.PI / 2;
          mesh0.position.y = arDoc.positionY;
          mesh0.scale.set(arDoc.scaleSet, arDoc.scaleSet, arDoc.scaleSet);
          markerRoot.group.add(mesh0);

          console.timeEnd("Time this");
          end = Date.now();
          var timeSpent = (end - begin);
          setLoading(false)
          progressTime('phase 2', timeSpent);
          modelLoaded = true;
          loadingInProcess = false;

        }, onProgress, onError);
      }

      function onProgress(xhr) {
        console.log(xhr);

        if (xhr.total > 0) {
          var percentage = (xhr.loaded / total * 100);
          console.log(percentage + '% loaded');
          progress('phase 1', percentage);
        } else {
          var percentage = (xhr.loaded / total * 100);
          console.log(percentage + '% loaded');
          progress('phase 1', percentage);
        }
      }

      function onError(xhr) {
        console.log('An error happened');
        progress('phase 1', 'An error happened');
      }
    }

    markerRoot.onTargetLost = () => {
      console.log("Marker Lost...");
      setLoading(false)

      document.getElementById("marker_label").innerHTML = 'Marker Lost';

      progress('phase 1', 0);

      const phase2Label = document.getElementById("phase 2 label");
      phase2Label.textContent += ": Previous log";

    }

    ///////////////////////////////////////////////////////////////
    const start = async () => {
      console.log("Before starting...");
      try {
        await mindarThree.start();
        console.log("After starting...");
        renderer.setAnimationLoop(() => {
          renderer.render(scene, camera);
        });
      } catch (error) {
        console.error("Error in start method:", error);
      }
    };

    const stop = async () => {
      console.log("Before stoping...");
      try {
        mindarThree.stop();
        console.log("After stoping...");
        mindarThree.renderer.setAnimationLoop(null);
      } catch (error) {
        console.error("Error in stop method:", error);
      }
    };

    const startButton = document.querySelector("#startButton");
    const stopButton = document.querySelector("#stopButton");

    startButton.addEventListener("click", () => {
      start();
    });

    // stopButton.addEventListener("click", () => {
    //   stop();
    // });

    stopButton.addEventListener("click", () => {
      console.log("Before Pause")
      mindarThree.pause();
    });

    // stopButton.addEventListener("click", () => {
    //   mindarThree.stop();
    //   mindarThree.renderer.setAnimationLoop(null);
    // });

    ////////////////// Supporting Functions

    //Prgress Loading Function
    function progress(phase, percentage) {
      var elem = document.getElementById(phase);
      var width = Math.floor(window.innerWidth * percentage)

      //var width = Math.floor(percentage * 100);
      //if (width <= 100) {
      elem.style.width = percentage + '%';
      document.getElementById(phase + " label").innerHTML = Math.floor(percentage) + '%';
      //}
      console.log("Progress width: " + width);
      console.log("Progress presentage: " + percentage);
    }

    //Time loading 
    function progressTime(phase, duration) {
      var elem = document.getElementById(phase);

      document.getElementById(phase + " label").innerHTML = " ";

      elem.style.width = '100%';
      document.getElementById(phase + " label").innerHTML = Math.floor(duration) + 'ms' + ' -->' + Math.floor(duration / 1000) + 's';
      console.log("Progress duration: " + duration);
    }

    const handleBack = () => {
      console.log('Button clicked!');
      mindarThree.stop();
      mindarThree.renderer.setAnimationLoop(null);
    };

    const backButton = document.querySelector("#backButton");

    backButton.addEventListener("click", () => {
      handleBack();
    });

    return () => {
      mindarThree.stop();
      mindarThree.renderer.setAnimationLoop(null);
    };
  }, [arDoc]);


  if (!arDoc) {
    return <div>Loading ...</div>; // Render a loading indicator while fetching data
  }

  return (
    <div id="container">
      <Link to='/home'>
        <button id="backButton">HOME</button>
      </Link>
      <div id="control">
        <button id="startButton" className="btn6">Start</button>
        <button id="stopButton" className="btn6">Stop</button>
      </div>
      <div>
        <ImageHashHandler />
      </div>
      <div className="progress">
        <div className='bar' id="phase 1">
          <div className="label" id="phase 1 label">0%</div>
        </div>
      </div>
      <div className="label2">
        <h3>Total Loading Duration</h3>
      </div>
      <div className='progress3'>
        <div className='bar' id="phase 2">
          <div className="label" id="phase 2 label">0ms</div>
        </div>
      </div>
      <footer>
        <div id="marker_label">Marker Not Found</div>
      </footer>
      <ContentPollingComponent
        phashId={arDoc.targetpHash}
        initialDocumentId={arDoc.documentId}
        initialRefVer={arDoc.ref_ver}
        onContentChange={handleContentChange}
      />
      <SquareLoading loading={loading} color={color} />
    </div>
  );
}

export default AdexplorePage;
