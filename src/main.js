import { World } from './world/World.js';

async function main()
{
  // Get reference to container element
  const container = document.querySelector('#scene-container');

  // Create world
  const world = new World(container);

  // Execute async tasks
  await world.init();

  // Start animation loop
  world.start();
}

// Basic error handling
main().catch((err) => {
  console.error(err);
});
