function mindAR(target, content) {
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
}

export { mindAR };
