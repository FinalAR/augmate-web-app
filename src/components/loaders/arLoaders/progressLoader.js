import * as THREE from 'three';

class ProgressBar extends THREE.Sprite{
  constructor(_progress){
    super();
    this.scale.set(1.5, 0.075);
    this.material = new THREE.SpriteMaterial({
      onBeforeCompile: shader => {
        shader.uniforms.progress = _progress;
        shader.fragmentShader = `
          #define ss(a, b, c) smoothstep(a, b, c)
          uniform float progress;
          ${shader.fragmentShader}
        `.replace(
          `outgoingLight = diffuseColor.rgb;`,
          `outgoingLight = diffuseColor.rgb;
            vec3 backColor = mix(vec3(0), vec3(0, 0.5, 0), progress);
            float pb = step(progress, vUv.x);
            outgoingLight.rgb = mix(vec3(0, 1, 0), backColor, pb);
          `
        );
        console.log(shader.fragmentShader);
      }
    });
    this.material.defines = {"USE_UV" : ""};
    this.center.set(0.5, 0);
  }
}

export default ProgressBar;