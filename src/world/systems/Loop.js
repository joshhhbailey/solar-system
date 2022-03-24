import { Clock } from 'three';

const clock = new Clock();

class Loop
{
  constructor(camera, scene, renderer)
  {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start()
  {
    this.renderer.setAnimationLoop(() => {
      // Update animated objects
      this.tick();

      // Render new frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop()
  {
    this.renderer.setAnimationLoop(null);
  }

  tick()
  {
    // Get time between frames (ms)
    const delta = clock.getDelta();

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { Loop };
