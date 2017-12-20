import * as CANNON from "cannon";
import * as THREE from "three";
import Widget from '../Widget'

export default function IceLance() {}

IceLance.prototype.emit = function(id, origin, targetMesh) {
  let target = targetMesh.position;

  let direction = origin.distanceTo(target);
  let shape = new CANNON.Sphere(0.1);
  let geometry = new THREE.ConeGeometry(shape.radius, 8 * shape.radius, 32);

  let material = new THREE.MeshLambertMaterial({ color: 0xa5f2f3 });
  let mesh = new THREE.Mesh(geometry, material);

  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.name = "icelance";

  mesh.position.copy(origin);
  mesh.lookAt(target);
  mesh.rotateX(Math.PI / 2);

  mesh.onAfterRender = () => {
    if (mesh.position.distanceTo(target) < 0.05) {
      this.scene.remove(mesh)

      targetMesh.userData.health += -10;

      if (targetMesh.userData.health < 0) {
        this.scene.remove(targetMesh);
        Widget(this.avatar).untarget()
      } else {
        Widget(this.avatar).update(targetMesh)
      }
    } else {
      mesh.position.lerp(target, 0.2);
    }
  };

  this.scene.add(mesh);

  return { mesh };
};