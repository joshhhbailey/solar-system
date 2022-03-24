import { SphereGeometry, BufferGeometry, 
         MeshStandardMaterial, LineBasicMaterial,
         Mesh, Line, Vector3,
         TextureLoader
       } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

class Planet
{
  constructor(_diameter, _distance, _orbitTime, _texturePath, _scene)
  {
    this.diameter = _diameter;
    this.distance = _distance;
    this.orbitTime = _orbitTime;
    this.texturePath = _texturePath;
    this.scene = _scene
    this.orbitTheta = 0.0;

    this.createPlanet()
  }

  createPlanet()
  {
    this.geometry = new SphereGeometry(this.diameter / 2);
    this.texture = new TextureLoader().load("../assets/textures/planets/" + this.texturePath);
    this.material = new MeshStandardMaterial({map: this.texture});
    this.mesh = new Mesh(this.geometry, this.material);

    this.mesh.position.set(0, 0, this.distance);
    this.scene.add(this.mesh);

    this.drawOrbitPath(this.distance);
  }

  drawOrbitPath(_radius)
  {              
    const points = [];

    for (let i = 0; i <= 360; ++i)
    {
      let x = Math.sin(degToRad(i)) * _radius;
      let z = Math.cos(degToRad(i)) * _radius;
      points.push(new Vector3(x, 0, z));
    }
    
    const lineGeometry = new BufferGeometry().setFromPoints(points);
    const lineMaterial = new LineBasicMaterial({color: 0xffffff});
    const line = new Line(lineGeometry, lineMaterial);
        
    this.scene.add(line);
  }
}

export { Planet };
