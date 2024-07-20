import * as THREE from "three";
import Experience from "../Experience.js";

export default class Raycaster {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;
    this.world = this.experience.world;
    this.resources = this.experience.resources;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.mouseOver = null;

    // Event listeners
    this.canvas.addEventListener("mousemove", (e) => {
      this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1;
    });

    this.canvas.addEventListener("click", () => {
      if (this.mouseOver) {
        const intersectedObject = this.mouseOver.object;
        switch (this.mouseOver.object) {
          case this.kamehouse.model.children[11]:
            if (this.kamehouse.debugObjects.openShutter) {
              this.kamehouse.openShutter(0, Math.PI / 1.1);
              this.kamehouse.debugObjects.openShutter = false;
            } else {
              this.kamehouse.openShutter(Math.PI / 1.3, Math.PI / 4);
              this.kamehouse.debugObjects.openShutter = true;
            }
            break;
          case this.kamehouse.model.children[12]:
            if (this.kamehouse.debugObjects.openShutter) {
              this.kamehouse.openShutter(0, Math.PI / 1.1);
              this.kamehouse.debugObjects.openShutter = false;
            } else {
              this.kamehouse.openShutter(Math.PI / 1.3, Math.PI / 4);
              this.kamehouse.debugObjects.openShutter = true;
            }
            break;
          case this.kamehouse.model.children[18]:
            this.kamehouse.weathervaneRotation(
              Math.random() + 0.5 * Math.PI * 2
            );
            break;
          default:
            break;
        }
        if (this.credits.objectToIntersect.includes(intersectedObject)) {
          window.open("https://billeltighidet.com/", "_blank");
        }
      }
    });
  }

  //   onClick(event) {
  //     event.preventDefault();
  //     this.checkIntersects(true);
  //   }

  update() {
    if (this.world.kameHouse) {
      this.kamehouse = this.world.kameHouse;
      this.credits = this.world.credits;
      this.raycaster.setFromCamera(this.mouse, this.camera.instance);

      const intersects = this.raycaster.intersectObjects(
        [
          this.kamehouse.model.children[11],
          this.kamehouse.model.children[12],
          this.kamehouse.model.children[18],
        ].concat(this.credits.objectToIntersect)
      );
      if (intersects.length) {
        if (this.mouseOver === null) {
          const intersectedObject = intersects[0].object;
          if (this.credits.objectToIntersect.includes(intersectedObject)) {
            this.credits.rotateText(intersectedObject);
            document.body.classList.add("pointer");
          }
        }
        this.mouseOver = intersects[0];
      } else {
        this.mouseOver = null;
        document.body.classList.remove("pointer");
      }
    }
  }
}
