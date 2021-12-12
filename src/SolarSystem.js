import * as THREE from "three";

import Planet from "./Planet.js";

export default class SolarSystem
{
  constructor(_scene)
  {
    this.m_scene = _scene;

    // Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
    this.m_planets = [];

    // 1 : 10,000 scale, km
    // https://www.jpl.nasa.gov/edu/pdfs/scaless_reference.pdf
    this.m_diameters = [0.4879, 1.2104, 1.2756, 0.6792, 14.2984, 12.0536, 5.1118, 4.9528];

    // 1 : 10,000,000 scale, km
    // https://www.jpl.nasa.gov/edu/pdfs/scaless_reference.pdf
    this.m_distancesFromSun = [5.79, 10.82, 14.96, 22.79, 77.86, 143.35, 287.25, 449.51];

    // 1 : 10 scale, days
    // https://spaceplace.nasa.gov/years-on-other-planets/sp/
    this.m_orbitTimes = [8.8, 22.5, 36.5, 68.7, 433.3, 1075.9, 3068.7, 6019.0];

    // https://www.solarsystemscope.com/textures/
    this.m_texturePaths = 
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
  }

  createPlanets()
  {
    for (let i = 0; i < 8; ++i)
    {
      let planet = new Planet(this.m_diameters[i], this.m_distancesFromSun[i], this.m_orbitTimes[i], this.m_texturePaths[i], this.m_scene);
      this.m_planets.push(planet);
    }
  }

  createStars(_totalStars)
  {
    for (let i = 0; i < _totalStars; ++i)
    {
      const geometry = new THREE.SphereGeometry(0.1, 3, 2);
      const material = new THREE.MeshBasicMaterial({color: 0xffffff});
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

      star.position.set(x, y, z);
      this.m_scene.add(star);
    }
  }

  createLight()
  {
    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.m_scene.add(ambientLight);
  }

  update(_speed)
  {
    for (let i = 0; i < this.m_planets.length; ++i)
    {
      // Orbits - Degrees per second (radians)
      this.m_planets[i].m_theta += ((360 / this.m_orbitTimes[i]) * (Math.PI / 180)) * _speed;

      this.m_planets[i].m_mesh.position.x = Math.sin(this.m_planets[i].m_theta) * this.m_planets[i].m_distance;
      this.m_planets[i].m_mesh.position.z = Math.cos(this.m_planets[i].m_theta) * this.m_planets[i].m_distance;

      if (this.m_planets[i].m_theta >= 2 * Math.PI)
      {
        this.m_planets[i].m_theta = 0.0;
      }

      // Axis rotation
      // ...
    }
  }
}