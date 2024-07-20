import * as THREE from "three";
import Experience from "../Experience.js";
import gsap from "gsap";

export default class KameHouse {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("kameHouse");
    }

    // Setup
    this.resource = this.resources.items.kameHouse;

    this.setModel();
    this.setAnimation();

    // Sound
    const listener = new THREE.AudioListener();

    const audioLoader = new THREE.AudioLoader();

    this.shutterSound = new THREE.PositionalAudio(listener);

    audioLoader.load("sound/Bruitages Volet.mp3", (buffer) => {
      this.shutterSound.setBuffer(buffer);
      this.shutterSound.setLoop(false);
      this.shutterSound.setVolume(1);
    });

    this.weathervaneSound = new THREE.PositionalAudio(listener);
    audioLoader.load("sound/Bruitages girouette.mp3", (buffer) => {
      this.weathervaneSound.setBuffer(buffer);
      this.weathervaneSound.setLoop(false);
      this.weathervaneSound.setVolume(1);
    });
  }

  setModel() {
    this.model = this.resource.scene;
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  openShutter(leftShutterRotation, rightShutterRotation) {
    const shutterLeft = this.model.children[11];
    const shutterRight = this.model.children[12];

    gsap.to(shutterLeft.rotation, {
      duration: 1.5,
      delay: 0,
      z: leftShutterRotation,
      ease: true,
    });
    gsap.to(shutterRight.rotation, {
      duration: 1.5,
      delay: 0,
      z: rightShutterRotation,
      ease: "power1.inOut",
    });
    shutterRight.add(this.shutterSound);
    this.shutterSound.play();
  }

  weathervaneRotation(rotation) {
    const weathervane = this.model.children[18];

    gsap.to(weathervane.rotation, {
      duration: 1.5,
      delay: 0,
      y: weathervane.rotation.y + rotation,
      ease: "power1.in",
    });

    weathervane.add(this.weathervaneSound);
    this.weathervaneSound.play();
  }

  setAnimation() {
    // Debug
    if (this.debug.active) {
      this.debugObjects = {};
      this.debugObjects.openShutter = false;

      this.debugObjects.weathervaneRotate = {
        start: () => {
          this.weathervaneRotation((Math.random() + 0.5) * Math.PI * 2);
        },
      };

      this.debugFolder
        .add(this.debugObjects, "openShutter")
        .name("Open the Shutter")
        .onChange((value) => {
          if (value) {
            this.openShutter(Math.PI / 1.3, Math.PI / 4);
          } else {
            this.openShutter(0, Math.PI / 1.1);
          }
        });

      this.debugFolder
        .add(this.debugObjects.weathervaneRotate, "start")
        .name("Blow on the weathervane");
    }
  }
}
