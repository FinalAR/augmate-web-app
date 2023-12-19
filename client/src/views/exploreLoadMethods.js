import "../assets/css/progress.css";
import "../assets/css/navBar.css";
import "../assets/css/popup.css";

import React, { useEffect } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {MindARThree} from 'mind-ar/dist/mindar-image-three.prod.js';

function ExploreLoadMethods() {
  useEffect(() => {
    let total;

    const targetInfo1 = {
      meshColor: 0x0000ff,
      modelPath: 'https://finalar.github.io/models/SurveySet/',
      modelFile: 'FoodPackD.glb',
      progressPhase: 'phase 2',
      positionY: 0,
      scaleSet: 0.3,
      size: 11173332
    };

    const targetInfo2 = {
      meshColor: 0x0000ff,
      modelPath: 'https://finalar.github.io/models/SurveySet/',
      modelFile: 'Ironman.glb',
      progressPhase: 'phase 2',
      positionY: 0,
      scaleSet: 0.1,
      size: 18233056
    };

    const targetInfo3 = {
      meshColor: 0x0000ff,
      modelPath: 'https://finalar.github.io/models/SurveySet/',
      modelFile: 'DodgeChallnger.glb',
      progressPhase: 'phase 2',
      positionY: 0,
      scaleSet: 0.2,
      size: 24981632
    };


    const targetInfo4 = {
      meshColor: 0x0000ff,
      modelPath: 'https://finalar.github.io/models/SurveySet/',
      modelFile: 'Prime.glb',
      progressPhase: 'phase 2',
      positionY: 0,
      scaleSet: 0.05,
      size: 44004212
    };

    const targetInfo5 = {
      meshColor: 0x0000ff,
      modelPath: 'https://finalar.github.io/models/SurveySet/',
      modelFile: 'Mercedes.glb',
      progressPhase: 'phase 2',
      positionY: 1,
      scaleSet: 0.45,
      size: 53559160
    };


    const targetInfo6 = {
      meshColor: 0x0000ff,
      modelPath: 'https://finalar.github.io/models/SurveySet/',
      modelFile: 'Helicopter.glb',
      progressPhase: 'phase 2',
      positionY: 0,
      scaleSet: 1,
      size: 79347688
    };

    const mindarThree = new MindARThree({
      container: document.querySelector("#container"),
      imageTargetSrc: "https://finalar.github.io/imageTargets/targets2.mind"
    });

    const { renderer, scene, camera } = mindarThree;

    let ambientLight = new THREE.AmbientLight(0xcccccc, 1.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1); // Adjust the light direction
    scene.add(directionalLight);

    //Models init

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

    // const startButton = document.querySelector("#startButton");
    // const stopButton = document.querySelector("#stopButton");

    // startButton.addEventListener("click", () => {
    //   start();
    // });

    // stopButton.addEventListener("click", () => {
    //   mindarThree.stop();
    //   mindarThree.renderer.setAnimationLoop(null);
    // });

        //////////////////////////////////////////////////////////
          const loadButton = document.querySelector("#startButton")
      
          loadButton.addEventListener("click", () => {
            contentLoadTest();
          });
      
          const contentLoadTest = () => {
            console.log("Loading Started...");
      
            progressTime(targetInfo1.progressPhase, 0);
      
      
            document.getElementById("marker_label").innerHTML = 'Marker Found';
      
            var begin = Date.now();
            var end;
            let mesh0;
      
              console.time("Time this");
              let loader = new GLTFLoader();
      
              total = targetInfo1.size
      
              loader.load(targetInfo1.modelPath + targetInfo1.modelFile, function (gltf) {
                mesh0 = gltf.scene;
                mesh0.rotation.x = Math.PI / 2;
                mesh0.position.y = targetInfo1.positionY;
                mesh0.scale.set(targetInfo1.scaleSet, targetInfo1.scaleSet, targetInfo1.scaleSet);
      
                console.timeEnd("Time this");
                end = Date.now();
                var timeSpent = (end - begin);
                progressTime(targetInfo1.progressPhase, timeSpent);
      
              }, onProgress, onError);
            
      
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

    return () => {
      mindarThree.stop();
      mindarThree.renderer.setAnimationLoop(null);
    };
  }, []);

  const htmlString = `
  <html>
    <head>
        <style>
          body {
            margin: 0;
          }

          #container {
            width: 100vw;
            height: 100vh;
            position: relative;
            overflow: hidden;
          }

          #control {
            display: flex;
            align-items: center;
            /* Center horizontally */
            justify-content: space-evenly;
          }

          .btn6,
          .btn6:link,
          .btn6:visited {
            margin-top: 3px;
            padding: 5px 5px;
            border: 1px solid #333;
            color: #333;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 3px;
            transition: all .2s ease-in-out;

            &:hover {
              background: #333;
              border: 1px solid #333;
              color: #fefefe;
              border-radius: 30px;
            }
          }
          </style>
    </head>
      <body>
        <div id="container">
          <div id="control">
            <button id="startButton" class="btn6">Start</button>
            <button id="stopButton" class="btn6">Stop</button>
          </div>

          <div class="progress">
            <div class='bar' id="phase 1">
              <div class="label" id="phase 1 label">0%</div>
            </div>
          </div>
          <div class='progress2'>
            <div class="label2">
              <h3>Total Loading Duration</h3>
            </div>
          </div>
          <div class='progress3'>
            <div class='bar' id="phase 2">
              <div class="label" id="phase 2 label">0ms</div>
            </div>
          </div>

          <footer>
            <div id="marker_label">Marker Not Found</div>
          </footer>
        </div>
      </body>
    </html>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
}

export default ExploreLoadMethods;
