import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import SolarSystem from "./src/SolarSystem.js";

// Initialise scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#bg")});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(5);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

// Create solar system
const solarSystem = new SolarSystem(scene);
solarSystem.createPlanets();
solarSystem.createStars(200);
solarSystem.createLight();

// Initialise time
let fps = 60.0;
let frameTime = 1.0 / fps;      // Standardised frame time of 60fps
let previousTime = Date.now();
let elapsedTime = 0.0;

// Game loop
function draw()
{    
  let currentTime = Date.now();
  let deltaTime = (currentTime - previousTime) / 1000.0;
  previousTime = currentTime;

  solarSystem.update(1.0, fps);

  elapsedTime += deltaTime;
  //console.log("Elapsed:", elapsedTime);

  controls.update();

  renderer.render(scene, camera);

  // Time between frames is quicker than standardised frame time
  if (deltaTime < frameTime)
  {
    setTimeout(function(){}, parseInt((frameTime - deltaTime) * 1000.0));
  }
  requestAnimationFrame(draw);
}
 
draw();