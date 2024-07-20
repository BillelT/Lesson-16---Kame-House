import * as THREE from "three";
import Experience from "../Experience.js";

export default class NuageMagique {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Setup
    this.resource = this.resources.items.nuageMagique;

    this.setTextures();
    this.setModel();
    this.setAnimation();
  }

  setTextures() {
    this.textures = {};
    this.textures.gradientMap = this.resources.items.nuageMagiqueTexture;
    this.textures.gradientMap.magFilter = THREE.NearestFilter;
    this.textures.gradientMap.generateMipmaps = false;
  }

  setModel() {
    this.model = this.resource.scene;

    // console.log(this.model, this.resource);

    this.model.children[1].material = new THREE.MeshToonMaterial({
      color: 0xcccc00,
      gradientMap: this.textures.gradientMap,
    });

    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    this.animation.actions = {};

    this.resource.animations.forEach((clip) => {
      const action = this.animation.mixer.clipAction(clip);
      action.play();
    });
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
