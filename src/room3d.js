import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './room3d.css';

const materialSets = {
  warm: {
    wall: 0xd8c9b5,
    floor: 0x6f4f3a,
    sofa: 0xc4aa8a,
    accent: 0x7a5036,
    metal: 0xb88a52
  },
  minimal: {
    wall: 0xe7e4dd,
    floor: 0x9c9387,
    sofa: 0xcfcac1,
    accent: 0x56514a,
    metal: 0x8f8a82
  },
  luxe: {
    wall: 0xb9aa99,
    floor: 0x3b312b,
    sofa: 0x63564c,
    accent: 0x2d2622,
    metal: 0xc5a56d
  }
};

export function initRoomExperience() {
  const stage = document.querySelector('#room-stage');
  if (!stage) return;

  const fallback = stage.querySelector('.room-fallback');
  const loader = stage.querySelector('.room-loader');
  const status = document.querySelector('#room-status');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (error) {
    fallback?.classList.add('visible');
    loader?.classList.add('ready');
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  stage.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x151511, 12, 24);

  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
  camera.position.set(7.6, 5.1, 9.2);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1.55, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.065;
  controls.enablePan = false;
  controls.minDistance = 6.5;
  controls.maxDistance = 12.5;
  controls.minPolarAngle = Math.PI * 0.24;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.minAzimuthAngle = -Math.PI * 0.28;
  controls.maxAzimuthAngle = Math.PI * 0.28;
  controls.autoRotate = !motionQuery.matches;
  controls.autoRotateSpeed = 0.32;

  const materials = {
    wall: new THREE.MeshStandardMaterial({ color: materialSets.warm.wall, roughness: 0.95 }),
    floor: new THREE.MeshStandardMaterial({ color: materialSets.warm.floor, roughness: 0.62, metalness: 0.04 }),
    sofa: new THREE.MeshStandardMaterial({ color: materialSets.warm.sofa, roughness: 0.88 }),
    accent: new THREE.MeshStandardMaterial({ color: materialSets.warm.accent, roughness: 0.74 }),
    metal: new THREE.MeshStandardMaterial({ color: materialSets.warm.metal, roughness: 0.28, metalness: 0.72 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0xdde8eb, transparent: true, opacity: 0.28, roughness: 0.08, transmission: 0.72 }),
    fabric: new THREE.MeshStandardMaterial({ color: 0xe3d7c4, roughness: 1 }),
    green: new THREE.MeshStandardMaterial({ color: 0x526046, roughness: 0.9 })
  };

  const room = new THREE.Group();
  scene.add(room);

  function box(name, size, position, material, rotation = [0, 0, 0], radius = 0) {
    const geometry = radius > 0
      ? new THREE.BoxGeometry(size[0], size[1], size[2], 4, 4, 4)
      : new THREE.BoxGeometry(...size);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    room.add(mesh);
    return mesh;
  }

  box('floor', [10, 0.18, 8], [0, -0.1, 0], materials.floor);
  box('back-wall', [10, 5.8, 0.18], [0, 2.8, -4], materials.wall);
  box('side-wall', [0.18, 5.8, 8], [-5, 2.8, 0], materials.wall);
  box('ceiling-beam', [10, 0.18, 0.5], [0, 5.65, -3.75], materials.accent);

  const windowFrame = box('window-frame', [4.2, 3.35, 0.12], [2.35, 3.05, -3.88], materials.accent);
  const glass = box('window-glass', [3.72, 2.87, 0.08], [2.35, 3.05, -3.8], materials.glass);
  box('window-mullion-v', [0.08, 2.9, 0.14], [2.35, 3.05, -3.72], materials.metal);
  box('window-mullion-h', [3.75, 0.08, 0.14], [2.35, 3.05, -3.72], materials.metal);

  box('tv-panel', [3.2, 2.45, 0.25], [-2.95, 2.35, -3.68], materials.accent);
  box('tv', [2.35, 1.35, 0.1], [-2.95, 2.55, -3.5], new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.15, metalness: 0.15 }));
  box('console', [3.4, 0.42, 0.7], [-2.75, 0.55, -3.18], materials.floor);

  box('sofa-seat', [4.2, 0.55, 1.35], [-0.25, 0.68, 1.25], materials.sofa);
  box('sofa-back', [4.2, 1.15, 0.38], [-0.25, 1.38, 1.82], materials.sofa, [-0.08, 0, 0]);
  box('sofa-arm-left', [0.35, 0.85, 1.45], [-2.35, 0.9, 1.25], materials.sofa);
  box('sofa-arm-right', [0.35, 0.85, 1.45], [1.85, 0.9, 1.25], materials.sofa);
  box('cushion-a', [0.92, 0.5, 0.18], [-1.1, 1.55, 1.58], materials.fabric, [-0.14, 0.08, -0.06]);
  box('cushion-b', [0.92, 0.5, 0.18], [0.35, 1.55, 1.58], materials.accent, [-0.14, -0.06, 0.04]);

  box('rug', [5.3, 0.04, 3.5], [0.15, 0.03, 0.05], new THREE.MeshStandardMaterial({ color: 0xc5b7a0, roughness: 1 }));
  box('coffee-table-top', [2.4, 0.16, 1.05], [0.1, 0.55, -0.1], materials.floor);
  box('coffee-leg-a', [0.12, 0.5, 0.12], [-0.85, 0.28, -0.45], materials.metal);
  box('coffee-leg-b', [0.12, 0.5, 0.12], [1.05, 0.28, 0.25], materials.metal);

  box('shelf', [1.15, 3.2, 0.45], [4.25, 1.7, -3.45], materials.accent);
  for (let y = 0.45; y < 3.1; y += 0.78) {
    box(`shelf-${y}`, [1.05, 0.08, 0.55], [4.25, y, -3.2], materials.metal);
  }

  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.42, 0.12, 32), materials.metal);
  lampBase.position.set(3.35, 0.08, 1.85);
  lampBase.castShadow = true;
  room.add(lampBase);
  box('lamp-stem', [0.08, 2.35, 0.08], [3.35, 1.23, 1.85], materials.metal);
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.72, 0.85, 32, 1, true), materials.fabric);
  shade.position.set(3.35, 2.45, 1.85);
  shade.rotation.x = Math.PI;
  shade.castShadow = true;
  room.add(shade);

  const planter = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.32, 0.75, 24), materials.accent);
  planter.position.set(-4.15, 0.37, -2.85);
  planter.castShadow = true;
  room.add(planter);
  for (let i = 0; i < 7; i += 1) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 10), materials.green);
    const angle = (i / 7) * Math.PI * 2;
    leaf.scale.set(0.48, 1.15, 0.25);
    leaf.position.set(-4.15 + Math.cos(angle) * 0.28, 1.05 + (i % 3) * 0.22, -2.85 + Math.sin(angle) * 0.2);
    leaf.rotation.z = angle * 0.45;
    leaf.castShadow = true;
    room.add(leaf);
  }

  const hemi = new THREE.HemisphereLight(0xf3eadc, 0x3f352d, 1.55);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xffe4bc, 4.2);
  sun.position.set(4, 7, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -8;
  sun.shadow.camera.right = 8;
  sun.shadow.camera.top = 8;
  sun.shadow.camera.bottom = -8;
  scene.add(sun);

  const interiorLight = new THREE.PointLight(0xffc882, 42, 11, 2);
  interiorLight.position.set(-0.3, 4.5, 0.5);
  interiorLight.castShadow = true;
  scene.add(interiorLight);

  const lampLight = new THREE.PointLight(0xffb86c, 18, 5.5, 2);
  lampLight.position.set(3.35, 2.2, 1.85);
  scene.add(lampLight);

  let lightingMode = 'day';

  function applyLighting(mode) {
    lightingMode = mode;
    if (mode === 'day') {
      scene.fog.color.set(0x151511);
      renderer.toneMappingExposure = 1.08;
      hemi.intensity = 1.55;
      sun.intensity = 4.2;
      interiorLight.intensity = 18;
      lampLight.intensity = 8;
      glass.material.color.set(0xdde8eb);
      status.textContent = 'Daylight reveals the warmth of wood, stone and layered neutral finishes.';
    } else {
      scene.fog.color.set(0x090b12);
      renderer.toneMappingExposure = 0.78;
      hemi.intensity = 0.38;
      sun.intensity = 0.35;
      interiorLight.intensity = 54;
      lampLight.intensity = 36;
      glass.material.color.set(0x213453);
      status.textContent = 'Evening mode shifts the room into a softer, intimate atmosphere.';
    }
  }

  function applyMaterialSet(key) {
    const set = materialSets[key];
    if (!set) return;
    materials.wall.color.setHex(set.wall);
    materials.floor.color.setHex(set.floor);
    materials.sofa.color.setHex(set.sofa);
    materials.accent.color.setHex(set.accent);
    materials.metal.color.setHex(set.metal);
    status.textContent = key === 'warm'
      ? 'Warm contemporary combines natural timber, soft upholstery and calm neutral tones.'
      : key === 'minimal'
        ? 'Soft minimal reduces contrast and lets proportion, daylight and texture lead.'
        : 'Modern luxe deepens the palette with darker timber, richer upholstery and brass detail.';
  }

  document.querySelectorAll('[data-room-material]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-room-material]').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      applyMaterialSet(button.dataset.roomMaterial);
    });
  });

  document.querySelectorAll('[data-room-light]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-room-light]').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      applyLighting(button.dataset.roomLight);
    });
  });

  document.querySelectorAll('.room-hotspot').forEach((button) => {
    button.addEventListener('click', () => {
      const messages = {
        lighting: 'Layered lighting balances natural daylight, ambient warmth and focused task light.',
        storage: 'Integrated storage keeps the architecture visually calm while supporting everyday routines.',
        comfort: 'Proportion, circulation and furniture depth are considered before finishes are selected.'
      };
      status.textContent = messages[button.dataset.hotspot];
    });
  });

  const resize = () => {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  resize();

  let visible = true;
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  }, { threshold: 0.05 });
  observer.observe(stage);

  const clock = new THREE.Clock();
  const render = () => {
    requestAnimationFrame(render);
    if (!visible) return;
    const elapsed = clock.getElapsedTime();
    if (!motionQuery.matches) {
      shade.rotation.y = Math.sin(elapsed * 0.32) * 0.018;
      interiorLight.intensity += (lightingMode === 'day' ? 18 : 54) - interiorLight.intensity > 0.1 ? 0.015 : 0;
    }
    controls.update();
    renderer.render(scene, camera);
  };

  render();
  loader?.classList.add('ready');

  stage.addEventListener('pointerdown', () => {
    controls.autoRotate = false;
  }, { once: true });

  window.addEventListener('pagehide', () => {
    resizeObserver.disconnect();
    observer.disconnect();
    controls.dispose();
    renderer.dispose();
  }, { once: true });
}
