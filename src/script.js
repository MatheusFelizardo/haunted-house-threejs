import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sky } from "three/addons/objects/Sky.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Texture loader
const textureLoader = new THREE.TextureLoader();
// Floor
const floorAlphaTexture = textureLoader.load("./floor/alpha.jpg");
const armTexture = textureLoader.load("./floor/coast_sand_rocks/arm.jpg");
const colorTexture = textureLoader.load("./floor/coast_sand_rocks/diff.jpg");
const normalTexture = textureLoader.load("./floor/coast_sand_rocks/normal.jpg");
const displacementTexture = textureLoader.load(
  "./floor/coast_sand_rocks/disp.jpg"
);

colorTexture.colorSpace = THREE.SRGBColorSpace;
colorTexture.repeat.set(8, 8);
colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;

normalTexture.repeat.set(8, 8);
normalTexture.wrapS = THREE.RepeatWrapping;
normalTexture.wrapT = THREE.RepeatWrapping;

displacementTexture.repeat.set(8, 8);
displacementTexture.wrapS = THREE.RepeatWrapping;
displacementTexture.wrapT = THREE.RepeatWrapping;

armTexture.repeat.set(8, 8);
armTexture.wrapS = THREE.RepeatWrapping;
armTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 10, 10),
  new THREE.MeshStandardMaterial({
    color: "#ffffff",
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: colorTexture,
    aoMap: armTexture,
    roughnessMap: armTexture,
    metalnessMap: armTexture,
    normalMap: normalTexture,
    displacementMap: displacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.18,
  })
);

gui.add(floor.material, "displacementScale").min(0).max(1).step(0.001);
gui.add(floor.material, "displacementBias").min(-1).max(1).step(0.001);

floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const house = new THREE.Group();
scene.add(house);

// Walls
const wallsTexture = textureLoader.load("./house/wall/diff.jpg");
const wallsNormalTexture = textureLoader.load("./house/wall/normal.jpg");
const wallArmTexture = textureLoader.load("./house/wall/arm.jpg");

wallsTexture.colorSpace = THREE.SRGBColorSpace;
wallsTexture.wrapS = THREE.RepeatWrapping;
wallsTexture.wrapT = THREE.RepeatWrapping;

wallsNormalTexture.wrapS = THREE.RepeatWrapping;
wallsNormalTexture.wrapT = THREE.RepeatWrapping;

wallArmTexture.wrapS = THREE.RepeatWrapping;
wallArmTexture.wrapT = THREE.RepeatWrapping;

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallsTexture,
    aoMap: wallArmTexture,
    roughnessMap: wallArmTexture,
    metalnessMap: wallArmTexture,
    normalMap: wallsNormalTexture,
  })
);
walls.position.y = 1.25;
house.add(walls);

// Roof
const roofTexture = textureLoader.load("./house/roof/diff.jpg");
const roofNormalTexture = textureLoader.load("./house/roof/normal.jpg");
const roofArmTexture = textureLoader.load("./house/roof/arm.jpg");

roofTexture.colorSpace = THREE.SRGBColorSpace;
roofTexture.repeat.set(3, 1);
roofTexture.wrapS = THREE.RepeatWrapping;
roofTexture.wrapT = THREE.RepeatWrapping;

roofNormalTexture.repeat.set(3, 1);
roofNormalTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapT = THREE.RepeatWrapping;

roofArmTexture.repeat.set(3, 1);
roofArmTexture.wrapS = THREE.RepeatWrapping;
roofArmTexture.wrapT = THREE.RepeatWrapping;

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({
    map: roofTexture,
    aoMap: roofArmTexture,
    roughnessMap: roofArmTexture,
    metalnessMap: roofArmTexture,
  })
);
roof.position.y = 2.5 + 0.75;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// Door
const doorAlphaTexture = textureLoader.load("./house/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./house/door/ambientOcclusion.jpg"
);
const doorColorTexture = textureLoader.load("./house/door/color.jpg");
const doorHeightTexture = textureLoader.load("./house/door/height.jpg");
const doorMetalness = textureLoader.load("./house/door/metalness.jpg");
const doorNormalTexture = textureLoader.load("./house/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("./house/door/roughness.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
doorColorTexture.wrapS = THREE.RepeatWrapping;
doorColorTexture.wrapT = THREE.RepeatWrapping;

doorAlphaTexture.wrapS = THREE.RepeatWrapping;
doorAlphaTexture.wrapT = THREE.RepeatWrapping;

doorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
doorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;

doorHeightTexture.wrapS = THREE.RepeatWrapping;
doorHeightTexture.wrapT = THREE.RepeatWrapping;

doorMetalness.wrapS = THREE.RepeatWrapping;
doorMetalness.wrapT = THREE.RepeatWrapping;

doorNormalTexture.wrapS = THREE.RepeatWrapping;
doorNormalTexture.wrapT = THREE.RepeatWrapping;

doorRoughnessTexture.wrapS = THREE.RepeatWrapping;
doorRoughnessTexture.wrapT = THREE.RepeatWrapping;

const door = new THREE.Mesh(
  new THREE.BoxGeometry(2.2, 2.2, 0.0001),
  new THREE.MeshStandardMaterial({
    color: "red",
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    metalnessMap: doorMetalness,
    normalMap: doorNormalTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.position.y = 1;
door.position.z = 2.01;
house.add(door);

// Bushes
const bushArmTexture = textureLoader.load("./bush/arm.jpg");
const bushColorTexture = textureLoader.load("./bush/diff.jpg");
const bushNormalTexture = textureLoader.load("./bush/norm.jpg");

bushColorTexture.colorSpace = THREE.SRGBColorSpace;
bushColorTexture.wrapS = THREE.RepeatWrapping;
bushColorTexture.wrapT = THREE.RepeatWrapping;

bushArmTexture.wrapS = THREE.RepeatWrapping;
bushArmTexture.wrapT = THREE.RepeatWrapping;

bushNormalTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.wrapT = THREE.RepeatWrapping;

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: "#ccffcc",
  map: bushColorTexture,
  aoMap: bushArmTexture,
  roughnessMap: bushArmTexture,
  metalnessMap: bushArmTexture,
  normalMap: bushNormalTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.y = 0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.y = 0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.rotation.y = 0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.set(-1, 0.05, 2.6);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.rotation.y = 0.75;

house.add(bush1, bush2, bush3, bush4);

// Graves
const graveColorTexture = textureLoader.load("./graves/diff.jpg");
const graveNormalTexture = textureLoader.load("./graves/norm.jpg");
const graveArmTexture = textureLoader.load("./graves/arm.jpg");

graveColorTexture.colorSpace = THREE.SRGBColorSpace;

graveColorTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);
graveArmTexture.repeat.set(0.3, 0.4);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  normalMap: graveNormalTexture,
  aoMap: graveArmTexture,
  roughnessMap: graveArmTexture,
  metalnessMap: graveArmTexture,
});
const graves = new THREE.Group();
scene.add(graves);
const graveAmount = 30;

for (let i = 0; i < graveAmount; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;
  const positionX = Math.cos(angle) * radius;
  const positionZ = Math.sin(angle) * radius;
  grave.position.x = positionX;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = positionZ;
  grave.rotation.x = (Math.random() - 0.5) * 4;
  grave.rotation.y = (Math.random() - 0.5) * 4;
  grave.rotation.z = (Math.random() - 0.5) * 4;

  graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.1);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Door light
const doorLight = new THREE.PointLight("#ff7d46", 5);
doorLight.position.set(0, 2.2, 2.5);
house.add(doorLight);

// Ghost
const ghost1 = new THREE.PointLight("#ff00ff", 6);
scene.add(ghost1);
const ghost2 = new THREE.PointLight("#00ffff", 6);
scene.add(ghost2);
const ghost3 = new THREE.PointLight("#ffff00", 6);
scene.add(ghost3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 8;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Cast and receive shadows
directionalLight.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
floor.receiveShadow = true;

graves.children.forEach((grave) => {
  grave.castShadow = true;
  grave.receiveShadow = true;
});

directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

// Sky
const sky = new Sky();
sky.scale.setScalar(90);
scene.add(sky);

sky.material.uniforms.turbidity.value = 10;
sky.material.uniforms.rayleigh.value = 3;
sky.material.uniforms.mieCoefficient.value = 0.1;
sky.material.uniforms.mieDirectionalG.value = 0.95;
sky.material.uniforms.sunPosition.value.set(0.3, -0.038, -0.95);

// Fog
scene.fog = new THREE.FogExp2("#0a343f", 0.1);

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update Ghost
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.13) * 4;

  const ghost2Angle = elapsedTime * 0.32;
  ghost2.position.x = -(Math.cos(ghost2Angle) * 4);
  ghost2.position.z = -(Math.sin(ghost2Angle) * 6) * Math.sin(ghost2Angle * 2);

  const ghost3Angle = elapsedTime * 0.18;
  ghost3.position.x = Math.cos(ghost3Angle) * 6;
  ghost3.position.z = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 3);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
