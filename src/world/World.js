import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

import { SolarSystem } from './systems/solar_system/SolarSystem.js';

// Module scoped (can't access them from outside the module)
let camera;
let controls;
let renderer;
let scene;
let loop;

class World
{
  constructor(container)
  {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    controls = createControls(camera, renderer.domElement);
    loop.updatables.push(controls);

    const { ambientLight } = createLights();
    scene.add(ambientLight);

    const resizer = new Resizer(container, camera, renderer);
  }

  async init()
  {
    // Create solar system
    const solarSystem = new SolarSystem(scene);
    loop.updatables.push(solarSystem);
  }

  render()
  {
    renderer.render(scene, camera);
  }

  start()
  {
    loop.start();
  }

  stop()
  {
    loop.stop();
  }
}

export { World };
