import * as THREE from "three";
import { Sky } from "three/addons/objects/Sky.js";
import Experience from "../Experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    this.setSky();
    this.setAmbientLight();
    this.setHemisphereLight();
    this.setDirectionalLight();
  }

  setSky() {
    this.sky = new Sky();
    this.sky.scale.setScalar(100);
    this.scene.add(this.sky);
    this.sky.material.uniforms["turbidity"].value = 1;
    this.sky.material.uniforms["rayleigh"].value = 1;
    this.sky.material.uniforms["mieCoefficient"].value = 0.005;
    this.sky.material.uniforms["mieDirectionalG"].value = 0.9;
    this.sky.material.uniforms["sunPosition"].value.set(5, -0.1, 10);
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(0x87ceeb, 0.6);
    this.scene.add(this.ambientLight);
  }

  setHemisphereLight() {
    this.hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0xf5deb3, 0.6);
    this.scene.add(this.hemisphereLight);
  }

  setDirectionalLight() {
    this.directionalLight = new THREE.DirectionalLight("#ffffff", 1);
    this.directionalLight.scale.set(10, 10, 10);
    this.directionalLight.position.set(5, 11, 11);

    const debugObjects = {
      bias: -0.002,
      normalBias: 0.01,
    };

    // Shadow map
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 1024;
    this.directionalLight.shadow.mapSize.height = 1024;
    this.directionalLight.shadow.camera.top = 15;
    this.directionalLight.shadow.camera.right = 13;
    this.directionalLight.shadow.camera.left = -13;
    this.directionalLight.shadow.camera.near = 4;
    this.directionalLight.shadow.camera.far = 36;
    this.directionalLight.shadow.bias = debugObjects.bias;
    this.directionalLight.shadow.normalBias = debugObjects.normalBias;

    // if (this.debug.active) {
    //   this.debugFolder = this.debug.ui.addFolder("Shadows");
    //   this.debugFolder
    //     .add(debugObjects, "bias")
    //     .min(-0.05)
    //     .max(0.05)
    //     .step(0.001)
    //     .onChange(() => {
    //       this.directionalLight.shadow.bias = debugObjects.bias;
    //     });
    //   this.debugFolder
    //     .add(debugObjects, "normalBias")
    //     .min(-0.05)
    //     .max(0.05)
    //     .step(0.001)
    //     .onChange(() => {
    //       this.directionalLight.shadow.normalBias = debugObjects.normalBias;
    //     });
    // }

    // this.directionalLightShadowMapCamera = new THREE.CameraHelper(
    //   this.directionalLight.shadow.camera
    // );
    // this.scene.add(this.directionalLightShadowMapCamera);

    this.scene.add(this.directionalLight);
  }
}
