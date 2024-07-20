import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import Experience from "../Experience.js";
import gsap from "gsap";

export default class Credits {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Credits");
    }

    // Setup
    this.resource = this.resources.items.nuageMagique;

    this.setTextures();
    this.setText();
  }

  setTextures() {
    this.textures = {};
    this.textures.gradientMap = this.resources.items.nuageMagiqueTexture;
    this.textures.gradientMap.magFilter = THREE.NearestFilter;
    this.textures.gradientMap.generateMipmaps = false;
  }

  setText() {
    const chars = new THREE.Group();
    const text = "©BT";
    this.objectToIntersect = [];

    const fontLoader = new FontLoader();

    const textMaterial = new THREE.MeshToonMaterial({
      color: 0xf9fafb,
      gradientMap: this.textures.gradientMap,
    });

    fontLoader.load("/fonts/Libre Baskerville_Regular.json", (font) => {
      const textGeometryParameters = {
        font: font,
        size: 1.6,
        depth: 0.2,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4,
      };

      const letters = Array.from(text);

      let lXPos = 0;
      letters.forEach((letter, l) => {
        const lGeometry = new TextGeometry(letter, textGeometryParameters);

        lGeometry.computeBoundingBox();

        const lWidth =
          lGeometry.boundingBox.max.x - lGeometry.boundingBox.min.x;

        const lMesh = new THREE.Mesh(lGeometry, textMaterial);

        lMesh.name = l;

        lMesh.position.x = lXPos;
        if (l === 0) {
          lMesh.position.x = lXPos - 0.5;
        }
        if (l >= 7) {
          lMesh.position.x = lXPos + 0.5;
        }

        lXPos += lWidth + 0.3;

        this.objectToIntersect.push(lMesh);
        chars.add(lMesh);
      });

      chars.position.set(-19, -1.5, 18.5);

      this.scene.add(chars);
    });

    // Debug
    if (this.debug.active) {
      const debugObject = {
        goToPortfolio: {
          start: () => {
            window.open("https://billeltighidet.com", "_blanck");
          },
        },
      };
      this.debugFolder.addColor(textMaterial, "color").name("Text Color");
      this.debugFolder
        .add(debugObject.goToPortfolio, "start")
        .name("Visit my portfolio");
    }
  }

  rotateText(object) {
    gsap.to(object.rotation, {
      duration: 2,
      delay: 0,
      y: Math.PI * 2,
      ease: "power1.inOut",
      onComplete: () => {
        object.rotation.y -= Math.PI * 2;
      },
    });
  }
}
