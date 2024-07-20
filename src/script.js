import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector("canvas.webgl"));

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import { Sky } from "three/addons/objects/Sky.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import gsap from "gsap";

// /**
//  * Base
//  */
// // Debug
// const gui = new GUI({ closeFolders: true });
// gui.close();
// const guiDOMElement = gui.domElement;

// guiDOMElement.style.width = "60%";
// guiDOMElement.style.minWidth = "200px";
// guiDOMElement.style.maxWidth = "400px";
// guiDOMElement.style.fontSize = "12px";

// const tweaks = {};

// // Canvas
// const canvas = document.querySelector("canvas.webgl");

// // Scene
// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x87ceeb);

// /**
//  * Sound
//  */
// const listener = new THREE.AudioListener();

// const audioLoader = new THREE.AudioLoader();

// const shutterSound = new THREE.PositionalAudio(listener);
// audioLoader.load("sound/Bruitages Volet.mp3", function (buffer) {
//   shutterSound.setBuffer(buffer);
//   shutterSound.setLoop(false);
//   shutterSound.setVolume(1);
// });

// const weathervaneSound = new THREE.PositionalAudio(listener);
// audioLoader.load("sound/Bruitages girouette.mp3", function (buffer) {
//   weathervaneSound.setBuffer(buffer);
//   weathervaneSound.setLoop(false);
//   weathervaneSound.setVolume(1);
// });

// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader();

// // kintoUn
// const gradientTexture = textureLoader.load("textures/gradients/3.jpg");
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// // const kintoUnTexture = textureLoader.load("textures/baked/baked1.jpg");
// // kintoUnTexture.flipY = false;

// /**
//  * Models
//  */

// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath("/draco/");

// const gltfLoader = new GLTFLoader();
// gltfLoader.setDRACOLoader(dracoLoader);

// // Variable for animation function
// let openShutter;
// let weathervaneRotation;

// // Variable for models
// let shutterLeft;
// let shutterRight;
// let weathervane;
// let floor;

// // Kame House
// gltfLoader.load("/gltf/Kame House.glb", (gltf) => {
//   gltf.scene.traverse((child) => {
//     if (child.isMesh) {
//       child.castShadow = true;
//       child.receiveShadow = true;
//     }
//   });

//   // floor
//   floor = gltf.scene.children[1];

//   // Shutter Animation
//   shutterLeft = gltf.scene.children[11];
//   shutterRight = gltf.scene.children[12];
//   openShutter = (leftShutterRotation, rightShutterRotation) => {
//     gsap.to(shutterLeft.rotation, {
//       duration: 1.5,
//       delay: 0,
//       z: leftShutterRotation,
//       ease: true,
//     });
//     gsap.to(shutterRight.rotation, {
//       duration: 1.5,
//       delay: 0,
//       z: rightShutterRotation,
//       ease: "power1.inOut",
//     });
//     shutterLeft.add(shutterSound);
//     shutterSound.play();
//   };

//   // Weathervane Animation
//   weathervane = gltf.scene.children[18];
//   weathervaneRotation = (rotation) => {
//     gsap.to(weathervane.rotation, {
//       duration: 1.5,
//       delay: 0,
//       y: weathervane.rotation.y + rotation,
//       ease: "power1.in",
//     });
//     weathervane.add(weathervaneSound);
//     weathervaneSound.play();
//   };

//   scene.add(gltf.scene);
// });

// tweaks.openShutter = false;
// tweaks.weathervaneRotate = {
//   start: () => {
//     weathervaneRotation((Math.random() + 0.5) * Math.PI * 2);
//   },
// };

// const weathervaneAnimation = gui.addFolder("Weathervane");

// weathervaneAnimation
//   .add(tweaks.weathervaneRotate, "start")
//   .name("Blow on the weathervane");
// const shutter = gui.addFolder("Shutter");

// shutter
//   .add(tweaks, "openShutter")
//   .name("Open the Shutter")
//   .onChange((value) => {
//     if (value) {
//       openShutter(Math.PI / 1.3, Math.PI / 4);
//     } else {
//       openShutter(0, Math.PI / 1.1);
//     }
//   });

// // Palm trees
// tweaks.treeCount = 3;
// let addTree;
// const treeCloneArray = [];
// gltfLoader.load("/gltf/Palm2.glb", (gltf) => {
//   gltf.scene.traverse((child) => {
//     if (child.isMesh) {
//       child.castShadow = true;
//       child.receiveShadow = true;
//     }
//   });

//   addTree = (x) => {
//     for (let clone of treeCloneArray) {
//       scene.remove(clone);
//     }
//     treeCloneArray.length = 0;
//     for (let i = 0; i < x; i++) {
//       const palmClone = gltf.scene.clone();

//       const angle = (Math.random() + 0.3) * Math.PI * 1.2;
//       const radius = 5 + Math.random() * 4;
//       const x = Math.sin(angle) * radius;
//       const z = Math.cos(angle) * radius;

//       palmClone.position.set(x, -1.3, z);
//       palmClone.rotation.x = (Math.random() - 0.5) * 0.4;
//       palmClone.rotation.y = (Math.random() - 0.5) * 0.4;
//       palmClone.rotation.z = (Math.random() - 0.5) * 0.4;

//       treeCloneArray.push(palmClone);
//     }
//     for (let clone of treeCloneArray) {
//       scene.add(clone);
//     }
//   };
//   addTree(tweaks.treeCount);
// });

// const treesTweaks = gui.addFolder("Trees");
// treesTweaks
//   .add(tweaks, "treeCount")
//   .min(3)
//   .max(10)
//   .step(1)
//   .name("Number of Palm")
//   .onFinishChange(() => {
//     addTree(tweaks.treeCount);
//   });

// // Rocks
// tweaks.rocksCount = 7;
// tweaks.rocksScale = 1;

// let addRock;
// let scaleRock;
// const rockCloneArray = [];

// gltfLoader.load("/gltf/rocks.glb", (gltf) => {
//   gltf.scene.traverse((child) => {
//     if (child.isMesh) {
//       child.castShadow = true;
//       child.receiveShadow = true;
//     }
//   });

//   // scale rock function
//   scaleRock = (x) => {
//     for (let clone of rockCloneArray) {
//       clone.scale.setScalar(x);
//     }
//   };

//   // add rock function
//   addRock = (x) => {
//     for (let clone of rockCloneArray) {
//       scene.remove(clone);
//     }
//     rockCloneArray.length = 0;
//     for (let i = 0; i < x; i++) {
//       const rockClone = gltf.scene.children[i % 3].clone();

//       const angle = (Math.random() + 0.3) * Math.PI * 2;
//       const radius = 8 + Math.random() * 2;
//       const x = Math.sin(angle) * radius;
//       const z = Math.cos(angle) * radius;

//       rockClone.position.set(x, -0.5, z);
//       rockClone.rotation.x = (Math.random() - 0.5) * 0.4;
//       rockClone.rotation.y = (Math.random() - 0.5) * 2;
//       rockClone.rotation.z = (Math.random() - 0.5) * 0.4;
//       rockClone.scale.setScalar(tweaks.rocksScale);

//       rockCloneArray.push(rockClone);
//     }
//     for (let clone of rockCloneArray) {
//       scene.add(clone);
//     }
//   };
//   addRock(tweaks.rocksCount);
// });

// const rockTweaks = gui.addFolder("Rocks");
// rockTweaks
//   .add(tweaks, "rocksCount")
//   .min(3)
//   .max(16)
//   .step(1)
//   .name("Number of Rock")
//   .onFinishChange(() => {
//     addRock(tweaks.rocksCount);
//   });

// rockTweaks
//   .add(tweaks, "rocksScale")
//   .min(0.5)
//   .max(2.5)
//   .step(0.001)
//   .name("Rock's scale")
//   .onChange(() => {
//     scaleRock(tweaks.rocksScale);
//   });

// // Flying Nimbus

// // const kintoUnMaterial = new THREE.MeshStandardMaterial({ map: kintoUnTexture });

// const mixer = new THREE.AnimationMixer(scene);
// gltfLoader.load("/gltf/nuage magique animated.glb", (gltf) => {
//   const kintoUn = gltf.scene.children[1];
//   kintoUn.material = new THREE.MeshToonMaterial({
//     color: 0xdddd00,
//     gradientMap: gradientTexture,
//   });

//   scene.add(gltf.scene);
//   gltf.animations.forEach((clip) => {
//     const action = mixer.clipAction(clip);
//     action.play();
//   });
// });

// // 3D Text
// const chars = new THREE.Group();
// const text = "©BILLELTIGHIDET";
// const objectToIntersect = [];

// const fontLoader = new FontLoader();

// const textMaterial = new THREE.MeshToonMaterial({
//   color: 0xf9fafb,
//   gradientMap: gradientTexture,
// });

// fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
//   const textGeometryParameters = {
//     font: font,
//     size: 1.2,
//     depth: 0.2,
//     curveSegments: 5,
//     bevelEnabled: true,
//     bevelThickness: 0.03,
//     bevelSize: 0.02,
//     bevelOffset: 0,
//     bevelSegments: 4,
//   };

//   const letters = Array.from(text);

//   let lXPos = 0;
//   letters.forEach((letter, l) => {
//     const lGeometry = new TextGeometry(letter, textGeometryParameters);

//     lGeometry.computeBoundingBox();

//     const lWidth = lGeometry.boundingBox.max.x - lGeometry.boundingBox.min.x;

//     const lMesh = new THREE.Mesh(lGeometry, textMaterial);

//     lMesh.name = l;

//     lMesh.position.x = lXPos;
//     if (l === 0) {
//       lMesh.position.x = lXPos - 0.5;
//     }
//     if (l >= 7) {
//       lMesh.position.x = lXPos + 0.5;
//     }

//     lXPos += lWidth + 0.3;

//     objectToIntersect.push(lMesh);
//     chars.add(lMesh);
//   });

//   chars.position.set(-19, -1.5, 18.5);

//   scene.add(chars);
// });

// const credits = gui.addFolder("Credits");
// tweaks.goToPortfolio = {
//   start: () => {
//     window.open("https://billeltighidet.com", "_blanck");
//   },
// };

// credits.addColor(textMaterial, "color").name("Text Color");

// credits.add(tweaks.goToPortfolio, "start").name("Visit my portfolio");

// /**
//  * Lights
//  */

// // Ambiant Light
// const ambientLight = new THREE.AmbientLight(0x87ceeb, 1);
// scene.add(ambientLight);

// // Hemisphere light
// const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0xf5deb3, 1);
// scene.add(hemisphereLight);

// // Directional light
// const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
// directionalLight.scale.set(10, 10, 10);
// directionalLight.position.set(5, 11, 11);
// directionalLight.castShadow = true;

// directionalLight.shadow.mapSize.width = 1024;
// directionalLight.shadow.mapSize.height = 1024;
// directionalLight.shadow.camera.top = 15;
// directionalLight.shadow.camera.right = 13;
// directionalLight.shadow.camera.left = -13;
// directionalLight.shadow.camera.near = 4;
// directionalLight.shadow.camera.far = 36;
// directionalLight.shadow.bias = -0.001;

// // const directionalLightShadowMapCamera = new THREE.CameraHelper(
// //   directionalLight.shadow.camera
// // );
// // scene.add(directionalLightShadowMapCamera);

// scene.add(directionalLight);

// /**
//  * Sizes
//  */
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// window.addEventListener("resize", () => {
//   // Update sizes
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   // Update camera
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();

//   // Update renderer
//   renderer.setSize(sizes.width, sizes.height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
// camera.position.x = -10;
// camera.position.y = 4;
// camera.position.z = 15;
// camera.add(listener);
// scene.add(camera);

// // Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
// controls.minDistance = 1;
// controls.maxDistance = 50;
// controls.minPolarAngle = Math.PI / 32;
// controls.maxPolarAngle = Math.PI / 2;
// // controls.enablePan = false;

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
//   antialias: true,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// /**
//  * Raycaster
//  */

// const raycaster = new THREE.Raycaster();

// // Handle mouse & click
// const mouse = new THREE.Vector2();
// let mouseOver = null;

// window.addEventListener("mousemove", (e) => {
//   mouse.x = (e.clientX / sizes.width) * 2 - 1;
//   mouse.y = -(e.clientY / sizes.height) * 2 + 1;
// });

// window.addEventListener("click", () => {
//   if (mouseOver) {
//     const intersectedObject = mouseOver.object;
//     switch (mouseOver.object) {
//       case shutterLeft:
//         if (tweaks.openShutter) {
//           openShutter(0, Math.PI / 1.1);
//           tweaks.openShutter = false;
//         } else {
//           openShutter(Math.PI / 1.3, Math.PI / 4);
//           tweaks.openShutter = true;
//         }
//         break;
//       case shutterRight:
//         if (tweaks.openShutter) {
//           openShutter(0, Math.PI / 1.1);
//           tweaks.openShutter = false;
//         } else {
//           openShutter(Math.PI / 1.3, Math.PI / 4);
//           tweaks.openShutter = true;
//         }
//         break;
//       case weathervane:
//         weathervaneRotation(Math.random() + 0.5 * Math.PI * 2);
//         break;
//       default:
//         break;
//     }
//     if (objectToIntersect.includes(intersectedObject)) {
//       window.open("https://billeltighidet.com/", "_blank");
//     }
//   }
// });

// window.addEventListener("touchup", () => {
//   if (mouseOver) {
//     switch (mouseOver.object) {
//       case shutterLeft:
//         if (tweaks.openShutter) {
//           openShutter(0, Math.PI / 1.1);
//           tweaks.openShutter = false;
//         } else {
//           openShutter(Math.PI / 1.3, Math.PI / 4);
//           tweaks.openShutter = true;
//         }
//         break;
//       case shutterRight:
//         if (tweaks.openShutter) {
//           openShutter(0, Math.PI / 1.1);
//           tweaks.openShutter = false;
//         } else {
//           openShutter(Math.PI / 1.3, Math.PI / 4);
//           tweaks.openShutter = true;
//         }
//         break;
//       case weathervane:
//         weathervaneRotation((Math.random() + 0.5) * Math.PI * 2);
//         break;
//       case objectToIntersect:
//         gsap.to(objectToIntersect.rotation, {
//           duration: 1.5,
//           delay: 0,
//           y: Math.PI * 2,
//           ease: "power1.inOut",
//         });
//         break;
//       default:
//         break;
//     }
//   }
// });

// /**
//  * Shadows
//  */
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// /**
//  * Sky
//  */
// const sky = new Sky();
// sky.scale.set(100, 100, 100);
// scene.add(sky);
// sky.material.uniforms["turbidity"].value = 10;
// sky.material.uniforms["rayleigh"].value = 3;
// sky.material.uniforms["mieCoefficient"].value = 0.01;
// sky.material.uniforms["mieDirectionalG"].value = 0.8;
// sky.material.uniforms["sunPosition"].value.set(5, -0.1, 10);

// /**
//  * Animate
//  */
// const timer = new Timer();

// const tick = () => {
//   // Timer
//   timer.update();
//   const elapsedTime = timer.getElapsed();

//   // Animation imported
//   // mixer.update(0.0075);

//   // Handle raycasting
//   raycaster.setFromCamera(mouse, camera);

//   if (
//     shutterLeft &&
//     shutterRight &&
//     weathervane &&
//     objectToIntersect.length > 0
//   ) {
//     const intersects = raycaster.intersectObjects(
//       [shutterLeft, shutterRight, weathervane].concat(objectToIntersect)
//     );
//     if (intersects.length) {
//       if (mouseOver === null) {
//         const intersectedObject = intersects[0].object;
//         if (objectToIntersect.includes(intersectedObject)) {
//           gsap.to(intersectedObject.rotation, {
//             duration: 2,
//             delay: 0,
//             y: intersectedObject.rotation.y + Math.PI * 2,
//             ease: "power1.inOut",
//           });
//           document.body.classList.add("pointer");
//         }
//       }
//       mouseOver = intersects[0];
//     } else {
//       mouseOver = null;
//       document.body.classList.remove("pointer");
//     }
//   }

//   // Update controls
//   controls.update();

//   // Render
//   renderer.render(scene, camera);

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };

// tick();
