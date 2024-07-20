import Experience from "../Experience.js";
import Environment from "./Environment.js";
import KameHouse from "./KameHouse.js";
import Tree from "./Tree.js";
import Rocks from "./Rocks.js";
import NuageMagique from "./NuageMagique.js";
import Credits from "./Credits.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.kameHouse = new KameHouse();
      this.tree = new Tree();
      this.rocks = new Rocks();
      this.nuageMagique = new NuageMagique();
      this.environment = new Environment();
      this.credits = new Credits();
    });
  }

  update() {
    if (this.nuageMagique) this.nuageMagique.update();
  }
}
