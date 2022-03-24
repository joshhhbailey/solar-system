import { AmbientLight } from 'three';

function createLights()
{
  const ambientLight = new AmbientLight(0xffffff);

  return { ambientLight };
}

export { createLights };
