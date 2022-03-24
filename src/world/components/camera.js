import { PerspectiveCamera } from 'three';

function createCamera()
{
  const camera = new PerspectiveCamera(75, 1, 0.1, 1000);

  camera.position.set(0, 0, 5);

  return camera;
}

export { createCamera };
