import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas)
{
  const controls = new OrbitControls(camera, canvas);

  // Controls settings
  controls.enableDamping = true;

  // Forward controls.update to our custom .tick method
  controls.tick = () => controls.update();

  return controls;
}

export { createControls };
