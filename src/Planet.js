import * as THREE from 'three';

export default class Planet
{
  constructor(_diameter, _distance, _orbitTime, _texturePath, _scene)
  {
    this.m_diameter = _diameter;
    this.m_distance = _distance;
    this.m_orbitTime = _orbitTime;
    this.m_texturePath = _texturePath;
    this.m_scene = _scene
    this.m_orbitTheta = 0.0;

    this.createPlanet()
  }

  createPlanet()
  {
    this.m_geometry = new THREE.SphereGeometry(this.m_diameter / 2);
    this.m_texture = new THREE.TextureLoader().load("../textures/planets/" + this.m_texturePath);
    this.m_material = new THREE.MeshStandardMaterial({map: this.m_texture});
    this.m_mesh = new THREE.Mesh(this.m_geometry, this.m_material);

    this.m_mesh.position.set(0, 0, this.m_distance);
    this.m_scene.add(this.m_mesh);

    this.drawOrbitPath(this.m_distance);
  }

  drawOrbitPath(_radius)
  {              
    const points = [];

    for (let i = 0; i <= 360; ++i)
    {
      let x = Math.sin(i * (Math.PI / 180)) * _radius;
      let z = Math.cos(i * (Math.PI / 180)) * _radius;
      points.push(new THREE.Vector3(x, 0, z));
    }
    
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
    const line = new THREE.Line(lineGeometry, lineMaterial);
        
    this.m_scene.add(line);
  }
}