import * as THREE from 'three';


class ProgressObject extends THREE.Object3D{
  constructor(){

    super();

    const geometry1 = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material1 = new THREE.MeshNormalMaterial();
    
    const mesh1 = new THREE.Mesh( geometry1, material1);

    mesh1.position.y = 0.3;
    
    this.add(mesh1);
    
  }
}


export default ProgressObject;

// import * as THREE from 'three';
// import ProgressBar from './cubeLoader';
// import { PlaneGeometry } from 'three';


// class ProgressObject extends THREE.Object3D{
//   constructor(height){

//     super();
  
   
//     let geometry1 = new THREE.PlaneGeometry(1,1, 4,4);
//     let material1 = new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 0.5, transparent: true} );
// 	  let mesh1 = new THREE.Mesh( geometry1, material1 );
// 	  // mesh1.rotation.x = Math.PI/2;
//     mesh1.position.y = 0.1;

//     let pbar = new ProgressBar(_progress);
//     pbar.position.y = height * 1.1;
    
//     this.add(mesh1, pbar);
    
//     this.update = val => {
//       _progress.value = 0.5;
//       // o.scale.y = height * _progress.value;
//     }
//   }
// }


// export default ProgressObject;