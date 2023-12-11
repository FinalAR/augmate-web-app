import "../assets/css/progress.css";
import "../assets/css/navBar.css";
import "../assets/css/popup.css";

import React, { useEffect } from 'react';
// import * as THREE from 'three';
import { GLTFLoader } from 'https://finalar.github.io/js/GLTFLoader.js';
import { MindARThree } from 'https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-image-three.prod.js';
import * as THREE from 'https://finalar.github.io/build/three.module.js';

function ExploreWindow() {
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

    const start = async () => {
      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };

    const startButton = document.querySelector("#startButton");
    const stopButton = document.querySelector("#stopButton");

    startButton.addEventListener("click", () => {
      start();
    });

    stopButton.addEventListener("click", () => {
      mindarThree.stop();
      mindarThree.renderer.setAnimationLoop(null);
    });

    // ... (rest of your code)

    return () => {
      mindarThree.stop();
      mindarThree.renderer.setAnimationLoop(null);
    };
  }, []); 

  const htmlString = `
  <html>
<head>
	<script type="module">

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

		///////////////////////////////////////////////////////////
		///////////////// Marker 0 -> targetInfo1 /////////////////
		///////////////////////////////////////////////////////////

		const markerRoot = mindarThree.addAnchor(2);


		//const geometry = new THREE.PlaneGeometry(1, 0.55);
		// const geometry = new THREE.PlaneBufferGeometry(0.5, 0.5, 4, 4);
		// const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, opacity: 0.5 });
		// const plane = new THREE.Mesh(geometry, material);
		// markerRoot.group.add(plane);

		let model = null;

		var modelLoaded = false; // Flag to track if the model has been loaded
		var loadingInProcess = false;

		markerRoot.onTargetFound = () => {
			console.log("markerFound...");
			progressTime(targetInfo1.progressPhase, 0);


			document.getElementById("marker_label").innerHTML = 'Marker Found';

			var begin = Date.now();
			var end;
			let mesh0;

			if (!modelLoaded && !loadingInProcess) {
				loadingInProcess = true;
				console.time("Time this");
				let loader = new GLTFLoader();

				total = targetInfo1.size

				loader.load(targetInfo1.modelPath + targetInfo1.modelFile, function (gltf) {
					mesh0 = gltf.scene;
					mesh0.rotation.x = Math.PI / 2;
					mesh0.position.y = targetInfo1.positionY;
					mesh0.scale.set(targetInfo1.scaleSet, targetInfo1.scaleSet, targetInfo1.scaleSet);
					markerRoot.group.add(mesh0);

					console.timeEnd("Time this");
					end = Date.now();
					var timeSpent = (end - begin);
					progressTime(targetInfo1.progressPhase, timeSpent);

					// Set the modelLoaded flag to true once the model is loaded
					modelLoaded = true;
					loadingInProcess = false;

				}, onProgress, onError);
			}


			// function onProgress(xhr) {
			// 	console.log(xhr);
			// 	console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			// 	progress('phase 1', xhr.loaded / xhr.total * 100);
			// }

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
					// console.log('Total size is 0; unable to calculate percentage.');
					// progressBug('phase 1');
				}
			}

			function onError(xhr) {
				console.log('An error happened');
				progress('phase 1', 'An error happened');
			}
		}

		markerRoot.onTargetLost = () => {
			console.log("Marker Lost...");

			document.getElementById("marker_label").innerHTML = 'Marker Lost';

			progress('phase 1', 0);

			const phase2Label = document.getElementById("phase 2 label");
			phase2Label.textContent += ": Previous log";

		}

		///////////////////////////////////////////////////////////


		///////////////////////////////////////////////////////////
		///////////////// Marker 1 -> targetInfo2 /////////////////
		///////////////////////////////////////////////////////////

		const markerRoot1 = mindarThree.addAnchor(3);

		// markerRoot1.group.add(plane);

		let model1 = null;

		var modelLoaded1 = false; // Flag to track if the model has been loaded
		var loadingInProcess1 = false;

		markerRoot1.onTargetFound = () => {
			console.log("markerFound...");
			progressTime(targetInfo2.progressPhase, 0);


			document.getElementById("marker_label").innerHTML = 'Marker Found';

			var begin = Date.now();
			var end;
			let mesh0;

			if (!modelLoaded1 && !loadingInProcess1) {
				loadingInProcess1 = true;
				console.time("Time this");
				let loader = new GLTFLoader();

				total = targetInfo2.size

				loader.load(targetInfo2.modelPath + targetInfo2.modelFile, function (gltf) {
					mesh0 = gltf.scene;
					mesh0.rotation.x = Math.PI / 2;
					mesh0.position.y = targetInfo2.positionY;
					mesh0.scale.set(targetInfo2.scaleSet, targetInfo2.scaleSet, targetInfo2.scaleSet);
					markerRoot1.group.add(mesh0);

					console.timeEnd("Time this");
					end = Date.now();
					var timeSpent = (end - begin);
					progressTime(targetInfo2.progressPhase, timeSpent);

					// Set the modelLoaded flag to true once the model is loaded
					modelLoaded1 = true;
					loadingInProcess1 = false;

				}, onProgress, onError);
			}


			// function onProgress(xhr) {
			// 	console.log(xhr);
			// 	console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			// 	progress('phase 1', xhr.loaded / xhr.total * 100);
			// }

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
					// console.log('Total size is 0; unable to calculate percentage.');
					// progressBug('phase 1');
				}
			}

			function onError(xhr) {
				console.log('An error happened');
				progress('phase 1', 'An error happened');
			}
		}

		markerRoot1.onTargetLost = () => {
			console.log("Marker Lost...");

			document.getElementById("marker_label").innerHTML = 'Marker Lost';

			progress('phase 1', 0);

			const phase2Label = document.getElementById("phase 2 label");
			phase2Label.textContent += ": Previous log";

		}

		///////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////
		///////////////// Marker 2 -> targetInfo3 /////////////////
		///////////////////////////////////////////////////////////

		const markerRoot2 = mindarThree.addAnchor(1);

		// markerRoot2.group.add(plane);

		let model2 = null;

		var modelLoaded2 = false; // Flag to track if the model has been loaded
		var loadingInProcess2 = false;

		markerRoot2.onTargetFound = () => {
			console.log("markerFound...");
			progressTime(targetInfo3.progressPhase, 0);


			document.getElementById("marker_label").innerHTML = 'Marker Found';

			var begin = Date.now();
			var end;
			let mesh0;

			if (!modelLoaded2 && !loadingInProcess2) {
				loadingInProcess2 = true;
				console.time("Time this");
				let loader = new GLTFLoader();

				total = targetInfo3.size

				loader.load(targetInfo3.modelPath + targetInfo3.modelFile, function (gltf) {
					mesh0 = gltf.scene;
					mesh0.rotation.x = Math.PI / 2;
					mesh0.position.y = targetInfo2.positionY;
					mesh0.scale.set(targetInfo3.scaleSet, targetInfo3.scaleSet, targetInfo3.scaleSet);
					markerRoot2.group.add(mesh0);

					console.timeEnd("Time this");
					end = Date.now();
					var timeSpent = (end - begin);
					progressTime(targetInfo3.progressPhase, timeSpent);

					// Set the modelLoaded flag to true once the model is loaded
					modelLoaded2 = true;
					loadingInProcess2 = false;

				}, onProgress, onError);
			}


			// function onProgress(xhr) {
			// 	console.log(xhr);
			// 	console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			// 	progress('phase 1', xhr.loaded / xhr.total * 100);
			// }

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
					// console.log('Total size is 0; unable to calculate percentage.');
					// progressBug('phase 1');
				}
			}

			function onError(xhr) {
				console.log('An error happened');
				progress('phase 1', 'An error happened');
			}
		}

		markerRoot2.onTargetLost = () => {
			console.log("Marker Lost...");

			document.getElementById("marker_label").innerHTML = 'Marker Lost';

			progress('phase 1', 0);

			const phase2Label = document.getElementById("phase 2 label");
			phase2Label.textContent += ": Previous log";

		}

		///////////////////////////////////////////////////////////

		///////////////////////////////////////////////////////////
		///////////////// Marker 3 -> targetInfo4 /////////////////
		///////////////////////////////////////////////////////////

		const markerRoot3 = mindarThree.addAnchor(7);

		// markerRoot3.group.add(plane);

		let model3 = null;

		var modelLoaded3 = false; // Flag to track if the model has been loaded
		var loadingInProcess3 = false;

		markerRoot3.onTargetFound = () => {
			console.log("markerFound...");
			progressTime(targetInfo4.progressPhase, 0);


			document.getElementById("marker_label").innerHTML = 'Marker Found';

			var begin = Date.now();
			var end;
			let mesh0;

			if (!modelLoaded3 && !loadingInProcess3) {
				loadingInProcess3 = true;
				console.time("Time this");
				let loader = new GLTFLoader();

				total = targetInfo4.size

				loader.load(targetInfo4.modelPath + targetInfo4.modelFile, function (gltf) {
					mesh0 = gltf.scene;
					mesh0.rotation.x = Math.PI / 2;
					mesh0.position.y = targetInfo4.positionY;
					mesh0.scale.set(targetInfo4.scaleSet, targetInfo4.scaleSet, targetInfo4.scaleSet);
					markerRoot3.group.add(mesh0);

					console.timeEnd("Time this");
					end = Date.now();
					var timeSpent = (end - begin);
					progressTime(targetInfo4.progressPhase, timeSpent);

					// Set the modelLoaded flag to true once the model is loaded
					modelLoaded3 = true;
					loadingInProcess3 = false;

				}, onProgress, onError);
			}


			// function onProgress(xhr) {
			// 	console.log(xhr);
			// 	console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			// 	progress('phase 1', xhr.loaded / xhr.total * 100);
			// }

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
					// console.log('Total size is 0; unable to calculate percentage.');
					// progressBug('phase 1');
				}
			}

			function onError(xhr) {
				console.log('An error happened');
				progress('phase 1', 'An error happened');
			}
		}

		markerRoot3.onTargetLost = () => {
			console.log("Marker Lost...");

			document.getElementById("marker_label").innerHTML = 'Marker Lost';

			progress('phase 1', 0);

			const phase2Label = document.getElementById("phase 2 label");
			phase2Label.textContent += ": Previous log";

		}

		///////////////////////////////////////////////////////////

		///////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////
		///////////////// Marker 4 -> targetInfo5 /////////////////
		///////////////////////////////////////////////////////////

		const markerRoot4 = mindarThree.addAnchor(5);

		// markerRoot4.group.add(plane);

		let model4 = null;

		var modelLoaded4 = false; // Flag to track if the model has been loaded
		var loadingInProcess4 = false;

		markerRoot4.onTargetFound = () => {
			console.log("markerFound...");
			progressTime(targetInfo5.progressPhase, 0);


			document.getElementById("marker_label").innerHTML = 'Marker Found';

			var begin = Date.now();
			var end;
			let mesh0;

			if (!modelLoaded4 && !loadingInProcess4) {
				loadingInProcess4 = true;
				console.time("Time this");
				let loader = new GLTFLoader();

				total = targetInfo5.size

				loader.load(targetInfo5.modelPath + targetInfo5.modelFile, function (gltf) {
					mesh0 = gltf.scene;
					mesh0.rotation.x = Math.PI / 2;
					mesh0.position.y = targetInfo5.positionY;
					mesh0.scale.set(targetInfo5.scaleSet, targetInfo5.scaleSet, targetInfo5.scaleSet);
					markerRoot4.group.add(mesh0);

					console.timeEnd("Time this");
					end = Date.now();
					var timeSpent = (end - begin);
					progressTime(targetInfo5.progressPhase, timeSpent);

					// Set the modelLoaded flag to true once the model is loaded
					modelLoaded4 = true;
					loadingInProcess4 = false;

				}, onProgress, onError);
			}


			// function onProgress(xhr) {
			// 	console.log(xhr);
			// 	console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			// 	progress('phase 1', xhr.loaded / xhr.total * 100);
			// }

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
					// console.log('Total size is 0; unable to calculate percentage.');
					// progressBug('phase 1');
				}
			}

			function onError(xhr) {
				console.log('An error happened');
				progress('phase 1', 'An error happened');
			}
		}

		markerRoot4.onTargetLost = () => {
			console.log("Marker Lost...");

			document.getElementById("marker_label").innerHTML = 'Marker Lost';

			progress('phase 1', 0);

			const phase2Label = document.getElementById("phase 2 label");
			phase2Label.textContent += ": Previous log";

		}

		///////////////////////////////////////////////////////////

		///////////////////////////////////////////////////////////
		///////////////// Marker 5 -> targetInfo6 /////////////////
		///////////////////////////////////////////////////////////

		const markerRoot5 = mindarThree.addAnchor(8);

		// markerRoot5.group.add(plane);

		let model5 = null;

		var modelLoaded5 = false; // Flag to track if the model has been loaded
		var loadingInProcess5 = false;

		markerRoot5.onTargetFound = () => {
			console.log("markerFound...");
			progressTime(targetInfo6.progressPhase, 0);


			document.getElementById("marker_label").innerHTML = 'Marker Found';

			var begin = Date.now();
			var end;
			let mesh0;

			if (!modelLoaded5 && !loadingInProcess4) {
				loadingInProcess5 = true;
				console.time("Time this");
				let loader = new GLTFLoader();

				total = targetInfo6.size

				loader.load(targetInfo6.modelPath + targetInfo6.modelFile, function (gltf) {
					mesh0 = gltf.scene;
					mesh0.rotation.x = Math.PI / 2;
					mesh0.position.y = targetInfo6.positionY;
					mesh0.scale.set(targetInfo6.scaleSet, targetInfo6.scaleSet, targetInfo6.scaleSet);
					markerRoot5.group.add(mesh0);

					console.timeEnd("Time this");
					end = Date.now();
					var timeSpent = (end - begin);
					progressTime(targetInfo6.progressPhase, timeSpent);

					// Set the modelLoaded flag to true once the model is loaded
					modelLoaded5 = true;
					loadingInProcess5 = false;

				}, onProgress, onError);
			}


			// function onProgress(xhr) {
			// 	console.log(xhr);
			// 	console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			// 	progress('phase 1', xhr.loaded / xhr.total * 100);
			// }

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
					// console.log('Total size is 0; unable to calculate percentage.');
					// progressBug('phase 1');
				}
			}

			function onError(xhr) {
				console.log('An error happened');
				progress('phase 1', 'An error happened');
			}
		}

		markerRoot5.onTargetLost = () => {
			console.log("Marker Lost...");

			document.getElementById("marker_label").innerHTML = 'Marker Lost';

			progress('phase 1', 0);

			const phase2Label = document.getElementById("phase 2 label");
			phase2Label.textContent += ": Previous log";

		}

		///////////////////////////////////////////////////////////

		const start = async () => {
			await mindarThree.start();
			renderer.setAnimationLoop(() => {
				renderer.render(scene, camera);
			});
		}


		const startButton = document.querySelector("#startButton");
		startButton.addEventListener("click", () => {
			start();
		});
    const stopButton = document.querySelector("#stopButton");
		stopButton.addEventListener("click", () => {
			mindarThree.stop();
			mindarThree.renderer.setAnimationLoop(null);
		});

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

		function progressBug(phase) {
			var elem = document.getElementById(phase);

			elem.style.width = '100%';
			document.getElementById(phase + " label").innerHTML = 'loading ... unable to calculate percentage.';

		}

		//Time loading 
		function progressTime(phase, duration) {
			var elem = document.getElementById(phase);

			document.getElementById(phase + " label").innerHTML = " ";

			elem.style.width = '100%';
			document.getElementById(phase + " label").innerHTML = Math.floor(duration) + 'ms' + ' -->' + Math.floor(duration / 1000) + 's';
			console.log("Progress duration: " + duration);
		}


	</script>
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

export default ExploreWindow;
