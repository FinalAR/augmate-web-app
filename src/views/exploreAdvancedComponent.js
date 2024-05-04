import "../assets/css/progress.css";
import "../assets/css/navBar.css";
import "../assets/css/popup.css";
import "../assets/css/elements.css";
import "../assets/css/backButton.css";

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

import ProgressObject from '../components/loaders/arLoaders/progLoader';

import InitializeLoader from '../components/loaders/InitializeLoader';


import axios from 'axios';
import getApiUrl from '../utility/apiUtils';
import getUserAgentInfoWithDownloadSpeed from '../utility/userAgentUtil';

function AdexplorePage({ phashIdvalue, onStateChange }) {

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#c320ff");
  const [arDoc, setDocument] = useState(null);
  const [updateContent, setUpdateFlag] = useState(false);
  const [deviceSpec, setDeviceSpec] = useState("Intializing...");
  const [phashId, setPhashId] = useState(phashIdvalue);

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

  const handleStateChange = () => {
    onStateChange(0);
    window.location.reload();
  }
  // const phashId = "1111101001001110010100000000011100100111101100101001101010100000";

  let counter = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {

        const { os, browser, downloadSpeed } = await getUserAgentInfoWithDownloadSpeed(navigator.userAgent);
        console.log('OS:' + os + ' ' + 'Browser:' + browser + ' ' + 'DownloadSpeed:' + downloadSpeed);
        setDeviceSpec('OS:' + os + ' ' + 'Browser:' + browser + ' ' + 'DownloadSpeed(Mbps):' + downloadSpeed * 8);

        //const response = await fetch(getApiUrl(`content/findv2/${phashId}`));
        const params = new URLSearchParams({
          os: os,
          browser: browser,
          downloadSpeed: downloadSpeed
        });

        console.log(`content/findv2/${phashId}?${params.toString()}`);

        const response = await fetch(getApiUrl(`content/findv2/${phashId}?${params.toString()}`));

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

    markerRoot = mindarThree.addAnchor(1);

    var loadingInProcess = false;

    let loadedMesh = null;

    let po = new ProgressObject(1);

    markerRoot.onTargetFound = () => {
      console.log("markerFound...");
      progressTime('phase 2', 0);

      // console.log("loading Model "+ modelLoadedRef.current + " Loading Document"+ JSON.stringify(arDocRef.current));

      document.getElementById("marker_label").innerHTML = '<b>Target Found</b>';

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

        //markerRoot.group.add(po);
        let loadedMesh1 = po;

        loadingInProcess = true;
        setLoading(true);
        console.time("Time this");
        let loader = new GLTFLoader();

        total = arDocRef.current.size

        loader.load(arDocRef.current.contentPath, function (gltf) {

          if (loadedMesh1) {
            markerRoot.group.remove(loadedMesh1);
            loadedMesh1 = null;
          }

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
          po.update(percentage);
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
      console.log("Target Lost...");
      setLoading(false)


      document.getElementById("marker_label").innerHTML = '<b>Target Lost</b>';

      setProgressValue(0);
      progress('phase 1', 0);

      const phase2Label = document.getElementById("phase 2 label");
      phase2Label.textContent += ": Previous log";

    }

    ///////////////////////////////////////////////////////////////
    const start = async () => {
      console.log("Before starting...");
      let clock = new THREE.Clock();
      try {
        await mindarThree.start();
        console.log("After starting...");
        renderer.setAnimationLoop(() => {
          let t = clock.getElapsedTime() * 0.5;
          // po.update(progressValue)
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
    startButton.click();

    // stopButton.addEventListener("click", () => {
    //   stop();
    // });

    // stopButton.addEventListener("click", () => {
    //   console.log("Before Pause")
    //   mindarThree.pause();
    // });

    // stopButton.addEventListener("click", () => {
    //   mindarThree.stop();
    //   mindarThree.renderer.setAnimationLoop(null);
    // });

    ////////////////// Supporting Functions

    //Prgress Loading Function
    function progress(phase, percentage) {
      // var elem = document.getElementById(phase);
      var width = Math.floor(window.innerWidth * percentage)

      //var width = Math.floor(percentage * 100);
      //if (width <= 100) {
      // elem.style.width = percentage + '%';
      // document.getElementById(phase + " label").innerHTML = Math.floor(percentage) + '%';
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

    // const backButton = document.querySelector("#backButton");

    // backButton.addEventListener("click", () => {
    //   handleBack();
    // });

    // return () => {
    //   mindarThree.stop();
    //   mindarThree.renderer.setAnimationLoop(null);
    // };
  }, [arDoc]);


  if (!arDoc) {
    //return <div>Loading ...</div>; // Render a loading indicator while fetching data
    return <InitializeLoader />
  }

  return (
    <div id="container">

      <div id="device_label" style={{ visibility: "hidden" }} >{deviceSpec}</div>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <div className="back-button" onClick={handleStateChange}>
          <div className="arrow-wrap">
            <span className="arrow-part-1"></span>
            <span className="arrow-part-2"></span>
            <span className="arrow-part-3"></span>
          </div>
        </div>
        <div className="rescan-text">Rescan</div>
      </div>

      <ContentPollingComponent
        phashId={arDoc.targetpHash}
        initialDocumentId={arDoc.documentId}
        initialRefVer={arDoc.ref_ver}
        onContentChange={handleContentChange}
      />
      {/* <Link to='https://augmate.netlify.app/adexplore'>
        <button id="backButton">HOME</button>
      </Link> */}

      <div id="control">
        <button id="startButton" className="btn6" style={{ visibility: "hidden" }}>Start</button>
        {/* <button id="stopButton" className="btn6">Stop</button> */}
      </div>
      {/* <div>
        <ImageHashHandler />
      </div> */}
      {/* <div className="progress" style={{visibility:"hidden"}}>
        <div className='bar' id="phase 1">
          <div className="label" id="phase 1 label">0%</div>
        </div>
      </div> */}
      {/* <div className="label2" style={{visibility:"hidden"}}>
        <h4>Duration</h4>
      </div> */}
      <div className='progress3' style={{ visibility: "hidden" }}>
        <div className='bar' id="phase 2">
          <div className="label" id="phase 2 label">0ms</div>
        </div>
      </div>
      <footer>
        <div id="marker_label"><b>Target Not Found</b></div>
      </footer>
      {/* <SquareLoading loading={loading} color={color} style={{ zIndex: 9999 }} /> */}
      {/* <BarLoading loading={loading} color={color} style={{ zIndex: 9999 }} />  */}
      <CircularLoading loading={loading} color={color} progress={progressValue} style={{ zIndex: 9999 }} />
      {/* <SquareLoading loading={loading} color={color} style={{ zIndex: 9999 }} />   */}
      {/* <BounceLoading loading={loading} color={color} style={{ zIndex: 9999 }} />  */}
      {/* <RiseLoading loading={loading} color={color} style={{ zIndex: 9999 }} /> */}
    </div>
  );
}

export default AdexplorePage;
