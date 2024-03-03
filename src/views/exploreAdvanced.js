import "../assets/css/progress.css";
import "../assets/css/navBar.css";
import "../assets/css/popup.css";
import "../assets/css/elements.css";

import { Link } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';

import ContentPollingComponent from '../components/ContentPollingComponent';
import ImageHashHandler from '../tools/ImageHashHandler';

import SquareLoading from '../components/loaders/SquareLoader';
import BarLoading from '../components/loaders/BarLoader';
import CircularLoading from "../components/loaders/CircularLoader";
import BounceLoading from '../components/loaders/BounceLoader';
import RiseLoading from '../components/loaders/RiseLoader';

import getApiUrl from '../utility/apiUtils';

// const backendUrl = "http://localhost:5000"

function AdexplorePage() {

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#c320ff");
  const [arDoc, setDocument] = useState(null);
  const [updateContent, setUpdateFlag] = useState(false);


  const arDocRef = useRef(null); // Mutable reference for arDoc
  const modelLoadedRef = useRef(false);
  

  const [progressValue, setProgressValue] = useState(0);

  const handleContentChange = (newDocument) => {
    // Update AR scene with new document data
    modelLoadedRef.current = false;
    setUpdateFlag(true);
    setDocument(newDocument);
    // console.log("Hi the document is"+ JSON.stringify(arDoc));
  };

  const phashId = "1111101001001110010100000000011100100111101100101001101010100000";

 let counter = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          getApiUrl(`content/findv2/${phashId}`)
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

  let mindarThree; // Declare mindarThree in the outer scope

  let markerRoot;

  let renderer, scene, camera; 
  
  useEffect(() => {
    if (!arDoc) return;
    
    arDocRef.current = arDoc;

    let total;

    // Only initialize mindarThree if counter is 1
    if (counter === 1) {
      mindarThree = new MindARThree({
        container: document.querySelector("#container"),
        imageTargetSrc: arDoc.imageTargetSrc
      });

      
      const obj = mindarThree;
      renderer = obj.renderer;
      scene = obj.scene;
      camera = obj.camera;

      let ambientLight = new THREE.AmbientLight(0xcccccc, 1.0);
      scene.add(ambientLight);
  
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1); // Adjust the light direction
      scene.add(directionalLight);

      

      counter++;
    }

    //Models init

    ///////////////////////////////////////////////////////////
    ///////////////// Marker 0 -> targetInfo /////////////////
    ///////////////////////////////////////////////////////////

    markerRoot = mindarThree.addAnchor(1);
     
    var loadingInProcess = false;

    let loadedMesh = null;

    
    // if(updateContent){
    //   console.log("load updated content");
    //   contentLoader();
    //   setUpdateFlag(false);
    // }

    // function contentLoader(){

    //   progressTime('phase 2', 0);

    //   var begin = Date.now();
    //   var end;
    //   let mesh1;
    //   console.log("inside the loader");
    //   if (!modelLoadedRef.current && !loadingInProcess) {
    //     if (loadedMesh) {
    //       markerRoot.group.remove(loadedMesh);
    //       loadedMesh = null;
    //     }
    //     // alert("Inside the loading");
    //     loadingInProcess = true;
    //     setLoading(true);
    //     console.time("Time this");
    //     let loader = new GLTFLoader();

    //     total = arDocRef.current.size

    //     loader.load(arDocRef.current.contentPath, function (gltf) {

    //       mesh1 = gltf.scene;
    //       mesh1.rotation.x = Math.PI / 2;
    //       mesh1.position.y = arDocRef.current.positionY;
    //       mesh1.scale.set(arDocRef.current.scaleSet, arDocRef.current.scaleSet, arDocRef.current.scaleSet);
    //       markerRoot.group.add(mesh1);

    //       console.timeEnd("Time this");
    //       end = Date.now();
    //       var timeSpent = (end - begin);
    //       setLoading(false)
    //       progressTime('phase 2', timeSpent);
          
    //       modelLoadedRef.current = true;
    //       loadingInProcess = false;
    //       loadedMesh = mesh1;

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

    //     function contentLoader(){

    //   progressTime('phase 2', 0);

    //   var begin = Date.now();
    //   var end;
    //   let mesh1;
    //   console.log("inside the loader");
    //   if (!modelLoadedRef.current && !loadingInProcess) {
    //     // alert("Inside the loading");
    //     loadingInProcess = true;
    //     setLoading(true);
    //     console.time("Time this");
    //     let loader = new GLTFLoader();

    //     total = arDocRef.current.size

    //     loader.load(arDocRef.current.contentPath, function (gltf) {

    //       if (loadedMesh) {
    //         markerRoot.group.remove(loadedMesh);
    //         loadedMesh = null;
    //       }

    //       mesh1 = gltf.scene;
    //       mesh1.rotation.x = Math.PI / 2;
    //       mesh1.position.y = arDocRef.current.positionY;
    //       mesh1.scale.set(arDocRef.current.scaleSet, arDocRef.current.scaleSet, arDocRef.current.scaleSet);
    //       markerRoot.group.add(mesh1);

    //       console.timeEnd("Time this");
    //       end = Date.now();
    //       var timeSpent = (end - begin);
    //       setLoading(false)
    //       progressTime('phase 2', timeSpent);
          
    //       modelLoadedRef.current = true;
    //       loadingInProcess = false;
    //       loadedMesh = mesh1;

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

    markerRoot.onTargetFound = () => {
      console.log("markerFound...");
      progressTime('phase 2', 0);

      // console.log("loading Model "+ modelLoadedRef.current + " Loading Document"+ JSON.stringify(arDocRef.current));

      document.getElementById("marker_label").innerHTML = 'Marker Found';

      var begin = Date.now();
      var end;
      let mesh0;

      // alert("Before the loading"+ modelLoaded + " Seccond - " + loadingInProcess);
      if (!modelLoadedRef.current && !loadingInProcess) {
        // alert("Inside the loading");
        if (loadedMesh) {
          markerRoot.group.remove(loadedMesh);
          loadedMesh = null;
        }
        loadingInProcess = true;
        setLoading(true);
        console.time("Time this");
        let loader = new GLTFLoader();

        total = arDocRef.current.size

        loader.load(arDocRef.current.contentPath, function (gltf) {

         

          mesh0 = gltf.scene;
          mesh0.rotation.x = Math.PI / 2;
          mesh0.position.y = arDocRef.current.positionY;
          mesh0.scale.set(arDocRef.current.scaleSet, arDocRef.current.scaleSet, arDocRef.current.scaleSet);
          markerRoot.group.add(mesh0);

          console.timeEnd("Time this");
          end = Date.now();
          var timeSpent = (end - begin);
          setLoading(false)
          progressTime('phase 2', timeSpent);
          
          modelLoadedRef.current = true;
          loadingInProcess = false;
          loadedMesh = mesh0;

        }, onProgress, onError);
      }

      function onProgress(xhr) {
        console.log(xhr);

        if (xhr.total > 0) {
          var percentage = (xhr.loaded / total * 100);
          console.log(percentage + '% loaded');
          setProgressValue(percentage);
          progress('phase 1', percentage);
        } else {
          var percentage = (xhr.loaded / total * 100);
          console.log(percentage + '% loaded');
          setProgressValue(percentage);
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

      setProgressValue(0);
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

    // return () => {
    //   mindarThree.stop();
    //   mindarThree.renderer.setAnimationLoop(null);
    // };
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
      {/* <div>
        <ImageHashHandler />
      </div> */}
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
      {/* <SquareLoading loading={loading} color={color} /> */}
      {/* <BarLoading loading={loading} color={color} /> */}
      {/* <CircularLoading loading={loading} color={color} progress={progressValue} /> */}
      {/* <SquareLoading loading={loading} color={color} /> */}
      {/* <BounceLoading loading={loading} color={color} /> */}
      <RiseLoading loading={loading} color={color} />
    </div>
  );
}

export default AdexplorePage;
