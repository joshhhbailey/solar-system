import "./style.css"

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Initialisation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(5);

renderer.render(scene, camera);

// Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
const planets = [];

// 1 : 10,000 scale, km
// https://www.jpl.nasa.gov/edu/pdfs/scaless_reference.pdf
const diameters = [0.4879, 1.2104, 1.2756, 0.6792, 14.2984, 12.0536, 5.1118, 4.9528];

// 1 : 10,000,000 scale, km
// https://www.jpl.nasa.gov/edu/pdfs/scaless_reference.pdf
const distancesFromSun = [5.79, 10.82, 14.96, 22.79, 77.86, 143.35, 287.25, 449.51];

// 1 : 10 scale, days
// https://spaceplace.nasa.gov/years-on-other-planets/sp/
const orbitTimes = [8.8, 22.5, 36.5, 68.7, 433.3, 1075.9, 3068.7, 6019.0];

class Planet
{
  constructor(_diameter, _distance, _orbitTime)
  {
    this.m_diameter = _diameter;
    this.m_distance = _distance;
    this.m_orbitTime = _orbitTime;
    this.m_theta = 0.0;

    this.createPlanet()
  }

  createPlanet()
  {
    this.m_geometry = new THREE.SphereGeometry(this.m_diameter / 2);
    this.m_material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    this.m_mesh = new THREE.Mesh(this.m_geometry, this.m_material);

    this.m_mesh.position.set(0, 0, this.m_distance);

    scene.add(this.m_mesh);
  }
}

for (let i = 0; i < 8; ++i)
{
  let planet = new Planet(diameters[i], distancesFromSun[i], orbitTimes[i]);
  planets.push(planet);
}

/*function createStar()
{
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(createStar);*/

// Debug grid
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

let fps = 60.0;
let frameTime = 1.0 / fps;      // Standardised frame time of 60fps
let previousTime = Date.now();
let elapsedTime = 0.0;

let speed = 0.25;

// Game loop
function draw()
{
  requestAnimationFrame(draw);
     
  let currentTime = Date.now();
  let deltaTime = (currentTime - previousTime) / 1000.0;
  previousTime = currentTime;

  // Update planets
  for (let i = 0; i < planets.length; ++i)
  {
    // Degrees per second (radians)
    planets[i].m_theta += ((360 / orbitTimes[i]) * (Math.PI / 180)) * speed;

    planets[i].m_mesh.position.x = Math.sin(planets[i].m_theta) * planets[i].m_distance;
    planets[i].m_mesh.position.z = Math.cos(planets[i].m_theta) * planets[i].m_distance;

    if (planets[i].m_theta >= 2 * Math.PI)
    {
      planets[i].m_theta = 0.0;
    }
  }

  elapsedTime += deltaTime;
  //console.log("Elapsed: ", elapsedTime);

  controls.update();

  renderer.render(scene, camera);

  // Time between frames is quicker than standardised frame time
  if (deltaTime < frameTime)
  {
    setTimeout(function(){}, parseInt((frameTime - deltaTime) * 1000.0));
  }
}
 
draw();