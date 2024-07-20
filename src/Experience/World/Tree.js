import * as THREE from "three";
import Experience from "../Experience.js";

export default class Tree {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Setup
    this.resource = this.resources.items.tree;

    this.treeCloneArray = [];

    this.debugObjects = {
      treeCount: 3,
    };

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Tree");
      this.setNewTree();
    }

    this.setModel(this.debugObjects.treeCount);
  }

  setModel(x) {
    this.model = this.resource.scene;

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    for (let clone of this.treeCloneArray) {
      this.scene.remove(clone);
    }
    this.treeCloneArray.length = 0;
    for (let i = 0; i < x; i++) {
      const treeClone = this.model.clone();

      const angle = (Math.random() + 0.3) * Math.PI * 1.25;
      const radius = 7 + Math.random() * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      treeClone.position.set(x, -1.5, z);
      treeClone.rotation.x = (Math.random() - 0.5) * 0.4;
      treeClone.rotation.y = (Math.random() - 0.5) * 2;
      treeClone.rotation.z = (Math.random() - 0.5) * 0.4;

      this.treeCloneArray.push(treeClone);
    }
    for (let clone of this.treeCloneArray) {
      this.scene.add(clone);
    }
  }

  setNewTree() {
    //Debug
    this.debugFolder
      .add(this.debugObjects, "treeCount")
      .min(3)
      .max(10)
      .step(1)
      .name("Number of Palm")
      .onFinishChange(() => {
        this.setModel(this.debugObjects.treeCount);
      });
  }
}
