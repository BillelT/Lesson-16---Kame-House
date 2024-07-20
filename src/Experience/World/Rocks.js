import * as THREE from "three";
import Experience from "../Experience.js";

export default class Rocks {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Setup
    this.resource = this.resources.items.rocks;

    this.rocksCloneArray = [];

    this.debugObjects = {
      rocksCount: 7,
      rocksScale: 1,
    };

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("rocks");
      this.setNewRocks();
    }

    this.setModel(this.debugObjects.rocksCount);
  }

  setModel(x) {
    this.model = this.resource.scene;
    for (let clone of this.rocksCloneArray) {
      this.scene.remove(clone);
    }
    this.rocksCloneArray.length = 0;
    for (let i = 0; i < x; i++) {
      const rockClone = this.model.children[i % 3].clone();

      const angle = (Math.random() + 0.3) * Math.PI * 2;
      const radius = 8 + Math.random() * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      rockClone.position.set(x, -0.5, z);
      rockClone.rotation.x = (Math.random() - 0.5) * 0.4;
      rockClone.rotation.y = (Math.random() - 0.5) * 2;
      rockClone.rotation.z = (Math.random() - 0.5) * 0.4;
      rockClone.scale.setScalar(this.debugObjects.rocksScale);

      this.rocksCloneArray.push(rockClone);
    }
    for (let clone of this.rocksCloneArray) {
      this.scene.add(clone);
    }

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  setNewRocks() {
    //Debug
    this.debugFolder
      .add(this.debugObjects, "rocksCount")
      .min(3)
      .max(16)
      .step(1)
      .name("Number of Rock")
      .onFinishChange(() => {
        this.setModel(this.debugObjects.rocksCount);
      });

    this.debugFolder
      .add(this.debugObjects, "rocksScale")
      .min(0.5)
      .max(2.5)
      .step(0.001)
      .name("Rock's scale")
      .onChange(() => {
        this.setScaleRocks(this.debugObjects.rocksScale);
      });
  }

  setScaleRocks(x) {
    for (let clone of this.rocksCloneArray) {
      clone.scale.setScalar(x);
    }
  }
}
