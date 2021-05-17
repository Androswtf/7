

import * as THREE from 'three';
import { Loader } from 'three';

window.onload = () => {

let w = innerWidth,
    h = innerHeight;

const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 2000);
camera.position.set(0,0,0);
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(w,h);

document.body.appendChild(renderer.domElement);

let light = new THREE.PointLight(0xffffff,1)
light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.position.set(0,5,-3);

scene.add(light);

light = new THREE.AmbientLight(0xffffff, .5);
light.position.set(-2,-.5,-3);
scene.add(light)

let geom = new THREE.BoxGeometry(1,1,1, 100, 1, 1);
let material = new THREE.MeshPhongMaterial({
    specular: 0x222222,
});
let cube = new THREE.Mesh(geom, material);
cube.position.setZ(-4);
cube.castShadow = true;
cube.receiveShadow = true;

scene.add(cube);

let text = new THREE.TextureLoader();

text.load('/normal.jpg', function(text) {
    cube.material = new THREE.MeshPhongMaterial({
        ...cube.material,
        normalMap: text,
        normalScale: new THREE.Vector2(2,2)
    })
});

text.load('/base.jpg', function(text) {
    cube.material = new THREE.MeshPhongMaterial({
        ...cube.material,
        map: text,
    });
});

text.load('/ao.jpg', function(text) {
    cube.material = new THREE.MeshPhongMaterial({
        ...cube.material,
        aoMap: text
    });
});

let planeGeom = new THREE.PlaneGeometry(4,4);
let planeMat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
});
let plane = new THREE.Mesh(planeGeom, planeMat);

plane.rotateX(2);
plane.position.set(0,-1, -4);

plane.castShadow = false;
plane.receiveShadow = true;


scene.add(plane);

renderer.setClearColor(0x000000);
camera.position.set(0,1,-6);



let startPos = camera.position.x;
let time = 0;

controls = new THREE.OrbitControls( camera, renderer.domElement );

function loop() {
    time++;
    cube.rotateX(0.01);
    cube.rotateY(0.01);

    camera.position.setX(startPos + Math.sin(time/100));
    camera.lookAt(0,0,-4);
    renderer.clear();
    renderer.render(scene, camera);

    requestAnimationFrame(loop);
}

loop();

}


