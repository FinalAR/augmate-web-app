import * as THREE from 'three';
import ProgressBar from './progressLoader'


class ProgressObject extends THREE.Object3D{
  constructor(height){
    //const rand = Math.random() * 100;
    // const noise = createNoise2D();
    super();
    let _progress = {value: 0.0};
    // let og = new THREE.BoxGeometry().translate(0, 0.5, 0);
    // let om = new THREE.MeshLambertMaterial();
    // let o = new THREE.Mesh(og, om);
    // o.scale.y = height;
    
    // let lg = new THREE.EdgesGeometry(new THREE.BoxGeometry());
    // lg.translate(0, 0.5, 0);
    // lg.scale(1, height, 1);
    // let lm = new THREE.LineBasicMaterial({color: new THREE.Color(Math.random() * 0xffffff).multiplyScalar(0.5).addScalar(0.5)});
    // let l = new THREE.LineSegments(lg, lm);
   
    let geometry1 = new THREE.PlaneGeometry(1,1, 4,4);
    let material1 = new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 0.5, transparent: true} );
	  let mesh1 = new THREE.Mesh( geometry1, material1 );
	  // mesh1.rotation.x = Math.PI/2;
    mesh1.position.y = 0.1;

    let pbar = new ProgressBar(_progress);
    pbar.position.y = 1.0;
    
    this.add(mesh1, pbar);
    
    this.update = val => {
      _progress.value = val/100;
      console.log("# Augment Prec: "+  val);
    }
  }
}


export default ProgressObject;