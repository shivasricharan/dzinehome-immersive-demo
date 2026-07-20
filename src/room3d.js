import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './room3d.css';

const views = {
  living: { camera: [7.7, 4.3, 9.3], target: [0, 1.45, -.25], copy: 'Living room · layered timber, linen and warm terracotta.' },
  dining: { camera: [5.2, 3.6, 3.9], target: [1.2, 1.35, -2.7], copy: 'Dining · a warm gathering space framed by brick and pendant light.' },
  material: { camera: [-5.4, 3.1, 4.9], target: [-3.2, 1.7, -3.7], copy: 'Material story · timber grain, linen texture and grounded earth tones.' }
};

export function initRoomExperience() {
  const stage = document.querySelector('#room-stage');
  if (!stage) return;
  const fallback = stage.querySelector('.room-fallback');
  const loader = stage.querySelector('.room-loader');
  const status = document.querySelector('#room-status');
  const progress = document.querySelector('#tour-progress');
  const count = document.querySelector('#tour-count');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compact = matchMedia('(max-width: 900px), (pointer: coarse)').matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: !compact, alpha: false, powerPreference: compact ? 'default' : 'high-performance' });
  } catch (error) {
    fallback?.classList.add('visible'); loader?.classList.add('ready'); return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, compact ? 1.15 : 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = !compact;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  stage.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x28241d);
  scene.fog = new THREE.Fog(0x28241d, 13, 25);
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 50);
  camera.position.fromArray(views.living.camera);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.fromArray(views.living.target);
  controls.enableDamping = true; controls.dampingFactor = .07; controls.enablePan = false;
  controls.minDistance = 5.8; controls.maxDistance = 12;
  controls.minPolarAngle = Math.PI * .25; controls.maxPolarAngle = Math.PI * .49;
  controls.minAzimuthAngle = -Math.PI * .34; controls.maxAzimuthAngle = Math.PI * .34;

  const mat = (color, roughness=.8, metalness=0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const materials = {
    plaster: mat(0x93836f,.98), timber: mat(0x3c271b,.62), timber2: mat(0x211711,.7), brick: mat(0x713d2c,.96),
    floor: mat(0x756655,.66), linen: mat(0xc3ad8c,1), olive: mat(0x484b31,.9), black: mat(0x171713,.34,.28),
    brass: mat(0xa67b43,.28,.72), rug: mat(0x8d7c64,1), leaf: mat(0x485b36,.92), ceramic: mat(0x8c6d52,.75)
  };
  const room = new THREE.Group(); scene.add(room);
  function box(size, pos, material, rotation=[0,0,0], parent=room) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    mesh.position.set(...pos); mesh.rotation.set(...rotation); mesh.castShadow=!compact; mesh.receiveShadow=!compact; parent.add(mesh); return mesh;
  }
  function cylinder(radius, height, pos, material, sides=compact?16:28, parent=room) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,height,sides),material);
    mesh.position.set(...pos); mesh.castShadow=!compact; mesh.receiveShadow=!compact; parent.add(mesh); return mesh;
  }

  // Architectural shell and a layered, earthy material story inspired by the project imagery.
  box([11,.18,8.5],[0,-.1,0],materials.floor);
  box([11,5.9,.18],[0,2.85,-4.2],materials.plaster);
  box([.18,5.9,8.5],[-5.5,2.85,0],materials.timber2);
  box([11,.15,1.1],[0,5.7,-3.7],materials.timber2);
  box([7.2,.12,4.6],[.3,5.45,-.8],materials.plaster);
  // Timber wall panel rhythm.
  for(let x=-5.25;x<-1.85;x+=.48) box([.42,4.7,.13],[x,2.42,-4.02],materials.timber);
  // Terracotta feature wall made from lightweight courses.
  for(let y=.22;y<4.7;y+=.29){
    const offset=(Math.round(y*10)%2)*.22;
    for(let x=-1.5+offset;x<3.1;x+=.47) box([.42,.22,.1],[x,y,-4],materials.brick);
  }
  // Large glazed opening and black mullions.
  const glassMat=new THREE.MeshPhysicalMaterial({color:0xb9ced1,transparent:true,opacity:.28,roughness:.1,transmission:.55});
  box([3.05,4.7,.06],[4.05,2.45,-4.03],glassMat);
  for(const x of [2.55,3.55,4.55,5.53]) box([.055,4.75,.11],[x,2.45,-3.96],materials.black);
  box([3.1,.07,.11],[4.04,.2,-3.96],materials.black);

  // Living room: low sectional, cushions, rug and sculptural table.
  box([5.15,.07,3.55],[-.75,.04,.7],materials.rug);
  const sofa=new THREE.Group(); room.add(sofa);
  box([4.4,.48,1.18],[-1.05,.54,1.2],materials.linen,[0,0,0],sofa);
  box([4.4,1.02,.28],[-1.05,1.14,1.65],materials.linen,[-.08,0,0],sofa);
  box([1.45,.48,2.4],[-2.55,.54,.62],materials.linen,[0,0,0],sofa);
  box([.25,.78,1.25],[1.15,.72,1.2],materials.linen,[0,0,0],sofa);
  for(const [x,c] of [[-1.8,materials.olive],[-.65,materials.ceramic],[.35,materials.linen]]) box([.8,.52,.18],[x,1.35,1.52],c,[-.12,.03,0],sofa);
  cylinder(1.05,.19,[.15,.52,-.25],materials.timber2,compact?20:40);
  cylinder(.13,.46,[.15,.25,-.25],materials.black,16);

  // Dining zone and pendants.
  box([3.5,.18,1.28],[.8,.78,-2.8],materials.timber2);
  for(const x of [-.55,2.15]) for(const z of [-3.25,-2.35]) box([.1,.74,.1],[x,.39,z],materials.black);
  const chairPositions=[[-.25,-2.0],[.85,-2.0],[1.95,-2.0],[-.25,-3.62],[.85,-3.62],[1.95,-3.62]];
  chairPositions.forEach(([x,z],i)=>{box([.62,.12,.62],[x,.52,z],materials.olive);box([.62,.75,.12],[x,.9,z+(i<3?.28:-.28)],materials.timber,[i<3?-.08:.08,0,0]);});
  for(const x of [.15,1.45]){
    box([.025,1.55,.025],[x,4.48,-2.78],materials.black);
    const shade=new THREE.Mesh(new THREE.ConeGeometry(.48,.35,compact?20:36,1,true),materials.black);shade.position.set(x,3.72,-2.78);shade.rotation.x=Math.PI;room.add(shade);
  }
  // Art, console and planting.
  box([1.35,1.7,.09],[-4.45,2.65,-3.91],materials.brass);
  box([1.18,1.52,.07],[-4.45,2.65,-3.82],mat(0xada088,1));
  box([1.8,.16,.46],[-3.95,.72,-3.55],materials.timber);
  const planter=cylinder(.42,.72,[3.65,.36,-3.25],materials.ceramic,20);
  for(let i=0;i<(compact?7:11);i++){
    const leaf=new THREE.Mesh(new THREE.SphereGeometry(.28,compact?10:16,8),materials.leaf);
    const a=i*2.2;leaf.scale.set(.48,1.35,.25);leaf.position.set(3.65+Math.cos(a)*.32,1.0+(i%4)*.28,-3.25+Math.sin(a)*.24);leaf.rotation.z=Math.sin(a)*.7;room.add(leaf);
  }

  const hemi=new THREE.HemisphereLight(0xf7e5c8,0x2b241d,1.45);scene.add(hemi);
  const sun=new THREE.DirectionalLight(0xffecd1,3.15);sun.position.set(6,7,6);sun.castShadow=!compact;
  if(!compact){sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-8;sun.shadow.camera.right=8;sun.shadow.camera.top=8;sun.shadow.camera.bottom=-8;}scene.add(sun);
  const ambient=new THREE.PointLight(0xffb979,compact?8:14,12,2);ambient.position.set(.6,4.3,-2.2);scene.add(ambient);
  const windowLight=new THREE.RectAreaLight(0xcce3ff,compact?5:8,3.5,4);windowLight.position.set(4.2,2.7,-2.9);windowLight.lookAt(0,1,0);scene.add(windowLight);

  let targetPosition=new THREE.Vector3().fromArray(views.living.camera);
  let targetLook=new THREE.Vector3().fromArray(views.living.target);
  let guided=true;
  function chooseView(key){
    const view=views[key]; if(!view)return; guided=true; controls.enabled=false;
    targetPosition.fromArray(view.camera);targetLook.fromArray(view.target);status.textContent=view.copy;
    const keys=Object.keys(views),index=keys.indexOf(key);
    count.textContent=`0${index+1} / 03`;progress.style.width=`${(index+1)*33.333}%`;
    document.querySelectorAll('.viewpoint').forEach(button=>{const active=button.dataset.view===key;button.classList.toggle('active',active);button.querySelector('small').textContent=active?'Current view':'View →';});
  }
  document.querySelectorAll('.viewpoint').forEach(button=>button.addEventListener('click',()=>chooseView(button.dataset.view)));
  document.querySelectorAll('[data-room-light]').forEach(button=>button.addEventListener('click',()=>{
    const evening=button.dataset.roomLight==='evening';document.querySelectorAll('[data-room-light]').forEach(item=>item.classList.toggle('active',item===button));
    scene.background.set(evening?0x111522:0x28241d);scene.fog.color.copy(scene.background);renderer.toneMappingExposure=evening?.72:1.05;
    hemi.intensity=evening?.3:1.45;sun.intensity=evening?.18:3.15;ambient.intensity=evening?(compact?52:72):(compact?8:14);windowLight.intensity=evening?1.2:(compact?5:8);
    status.textContent=evening?'Evening · warm pendants soften the material palette.':views[document.querySelector('.viewpoint.active')?.dataset.view||'living'].copy;
  }));
  renderer.domElement.addEventListener('pointerdown',()=>{guided=false;controls.enabled=true;},{passive:true});

  function resize(){const w=stage.clientWidth,h=stage.clientHeight;camera.aspect=w/Math.max(h,1);camera.updateProjectionMatrix();renderer.setSize(w,h,false);}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(stage);resize();
  let visible=true;const visibilityObserver=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting},{threshold:.02});visibilityObserver.observe(stage);
  const tick=()=>{requestAnimationFrame(tick);if(!visible)return;if(guided&&!reducedMotion){camera.position.lerp(targetPosition,.045);controls.target.lerp(targetLook,.045);if(camera.position.distanceTo(targetPosition)<.035){guided=false;controls.enabled=true;}}controls.update();renderer.render(scene,camera)};
  tick();
  loader?.classList.add('ready');
  setTimeout(() => loader?.remove(), 750);
  addEventListener('pagehide',()=>{resizeObserver.disconnect();visibilityObserver.disconnect();controls.dispose();renderer.dispose();},{once:true});
}
