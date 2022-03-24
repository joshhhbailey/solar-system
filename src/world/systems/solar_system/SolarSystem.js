import { SphereGeometry, MeshBasicMaterial, Mesh } from "three";
import { degToRad, randFloatSpread } from "three/src/math/MathUtils";

import { Planet } from './Planet.js';

class SolarSystem
{
  constructor(_scene)
  {
    this.scene = _scene;

    // Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
    this.planets = [];

    // 1 : 10,000 scale, km
    // https://www.jpl.nasa.gov/edu/pdfs/scaless_reference.pdf
    this.diameters = [0.4879, 1.2104, 1.2756, 0.6792, 14.2984, 12.0536, 5.1118, 4.9528];

    // 1 : 10,000,000 scale, km
    // https://www.jpl.nasa.gov/edu/pdfs/scaless_reference.pdf
    this.distancesFromSun = [5.79, 10.82, 14.96, 22.79, 77.86, 143.35, 287.25, 449.51];

    // 1 : 10 scale, earth days to complete orbit
    // https://spaceplace.nasa.gov/years-on-other-planets/en/
    this.orbitTimes = [8.8, 22.5, 36.5, 68.7, 433.3, 1075.9, 3068.7, 6019.0];

    // 1 : 0.1 scale, earth days to complete rotation
    // https://spaceplace.nasa.gov/days/en/
    this.rotationTimes = [586.7, 2430, 10, 10.4, 4.17, 4.58, 7.08, 6.7];

    // https://www.solarsystemscope.com/textures/
    this.texturePaths = 
    [
      "2k_mercury.jpg",
      "2k_venus_surface.jpg",
      "2k_earth_daymap.jpg",
      "2k_mars.jpg",
      "2k_jupiter.jpg",
      "2k_saturn.jpg",
      "2k_uranus.jpg",
      "2k_neptune.jpg"
    ];

    this.createPlanets();
    this.createStars(200);
  }

  createPlanets()
  {
    for (let i = 0; i < 8; ++i)
    {
      let planet = new Planet(this.diameters[i], this.distancesFromSun[i], this.orbitTimes[i], this.texturePaths[i], this.scene);
      this.planets.push(planet);
    }
  }

  createStars(_totalStars)
  {
    for (let i = 0; i < _totalStars; ++i)
    {
      const geometry = new SphereGeometry(0.1, 3, 2);
      const material = new MeshBasicMaterial({color: 0xffffff});
      const star = new Mesh(geometry, material);

      const [x, y, z] = Array(3).fill().map(() => randFloatSpread(100));

      star.position.set(x, y, z);
      this.scene.add(star);
    }
  }

  tick(delta)
  {
    for (let i = 0; i < this.planets.length; ++i)
    {
      // Orbit
      this.planets[i].orbitTheta += (degToRad(360 / this.orbitTimes[i]) * delta);
      this.planets[i].mesh.position.x = Math.sin(this.planets[i].orbitTheta) * this.planets[i].distance;
      this.planets[i].mesh.position.z = Math.cos(this.planets[i].orbitTheta) * this.planets[i].distance;

      if (this.planets[i].orbitTheta >= 2 * Math.PI)
      {
        this.planets[i].orbitTheta %= 2 * Math.PI;
      }

      // Axis rotation
      let rotationsPerSecond = (this.orbitTimes[i] / this.rotationTimes[i]) / this.orbitTimes[i];
      let rotationsInRadians = degToRad(rotationsPerSecond * 360) * delta;
      this.planets[i].mesh.rotation.y += rotationsInRadians;

      if (this.planets[i].mesh.rotation.y >= 2 * Math.PI)
      {
        this.planets[i].mesh.rotation.y %= 2 * Math.PI;
      }
    }
  }
}

export { SolarSystem };
