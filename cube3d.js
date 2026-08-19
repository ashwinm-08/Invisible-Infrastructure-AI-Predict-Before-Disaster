// 3D Rubik's Cube Viewer and Animator using Three.js

// Premium Color Palette
export const COLORS = {
  U: '#ffd700', // Yellow
  D: '#ffffff', // White
  F: '#009b48', // Green
  B: '#0045ad', // Blue
  L: '#ff5800', // Orange
  R: '#b71234', // Red
  default: '#2a2a2a' // Dark gray for uncolored stickers
};

// Map face letter to color hex for easy presets
export const FACE_COLORS = {
  'U': COLORS.U,
  'D': COLORS.D,
  'F': COLORS.F,
  'B': COLORS.B,
  'L': COLORS.L,
  'R': COLORS.R
};

// Global variables for Three.js
let scene, camera, renderer, controls;
let cubies = []; // Array of 27 cubie Group/Mesh objects
let stickerPlanes = []; // Array of 54 sticker Plane objects (indexed 0-53)
let isAnimating = false;

// Container size
let width, height;

/**
 * Initializes the 3D scene
 * @param {HTMLElement} container - DOM element to render the canvas inside
 * @param {Function} onStickerClick - Callback when a sticker is clicked: (stickerIndex) => {}
 */
export function initCube3D(container, onStickerClick) {
  // Clear container
  container.innerHTML = '';
  
  width = container.clientWidth || 500;
  height = container.clientHeight || 500;

  // Scene
  scene = new THREE.Scene();
  scene.background = null; // Transparent to allow CSS gradients

  // Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(6, 6, 8); // Beautiful angled view

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // OrbitControls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 4;
  controls.maxDistance = 15;
  controls.enablePan = false; // Keep centering on the cube

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  // Main key light
  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight1.position.set(5, 8, 5);
  scene.add(dirLight1);

  // Soft fill light
  const dirLight2 = new THREE.DirectionalLight(0xaaccff, 0.5);
  dirLight2.position.set(-5, -3, -5);
  scene.add(dirLight2);

  // Subtle accent light for premium neon feel
  const pointLight = new THREE.PointLight(0x7f00ff, 0.5, 15);
  pointLight.position.set(0, 4, 0);
  scene.add(pointLight);

  // Build the Cube
  buildCube(onStickerClick);

  // Resize handler
  window.addEventListener('resize', onWindowResize);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

/**
 * Creates the 27 cubies and adds the 54 sticker planes
 */
function buildCube(onStickerClick) {
  cubies = [];
  stickerPlanes = new Array(54);

  const cubieGeometry = new THREE.BoxGeometry(0.92, 0.92, 0.92);
  const cubieMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111, // Sleek black/dark gray body
    roughness: 0.5,
    metalness: 0.2
  });

  // Create 27 cubies
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        // Create cubie mesh
        const cubie = new THREE.Mesh(cubieGeometry, cubieMaterial);
        cubie.position.set(x, y, z);
        scene.add(cubie);
        cubies.push(cubie);
      }
    }
  }

  // Create the 54 sticker planes and add them as children of the respective cubies
  const stickerGeo = new THREE.PlaneGeometry(0.82, 0.82);
  const mapping = getStickerMapping();

  for (let i = 0; i < 54; i++) {
    const map = mapping[i];
    
    // Find the cubie at the target position
    const cubie = cubies.find(c => 
      Math.abs(c.position.x - map.x) < 0.1 && 
      Math.abs(c.position.y - map.y) < 0.1 && 
      Math.abs(c.position.z - map.z) < 0.1
    );

    if (!cubie) continue;

    // Create unique shiny material for this sticker
    const stickerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(COLORS.default),
      roughness: 0.1, // Shiny plastic look
      metalness: 0.0,
      side: THREE.DoubleSide
    });

    const sticker = new THREE.Mesh(stickerGeo, stickerMat);
    sticker.userData = { stickerIndex: i };

    // Position and rotate the sticker relative to the cubie
    const offset = 0.465; // Slightly offset from cubie face to avoid Z-fighting
    switch (map.face) {
      case 'U': // Up (+y)
        sticker.position.set(0, offset, 0);
        sticker.rotation.x = -Math.PI / 2;
        break;
      case 'D': // Down (-y)
        sticker.position.set(0, -offset, 0);
        sticker.rotation.x = Math.PI / 2;
        break;
      case 'R': // Right (+x)
        sticker.position.set(offset, 0, 0);
        sticker.rotation.y = Math.PI / 2;
        break;
      case 'L': // Left (-x)
        sticker.position.set(-offset, 0, 0);
        sticker.rotation.y = -Math.PI / 2;
        break;
      case 'F': // Front (+z)
        sticker.position.set(0, 0, offset);
        // Face has normal along +z, default plane is also +z, so no rotation needed
        break;
      case 'B': // Back (-z)
        sticker.position.set(0, 0, -offset);
        sticker.rotation.y = Math.PI;
        break;
    }

    cubie.add(sticker);
    stickerPlanes[i] = sticker;
  }

  // Set up Raycasting for sticker clicks
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  renderer.domElement.addEventListener('click', (event) => {
    // Only allow clicking if not animating
    if (isAnimating) return;

    // Get click coordinates relative to canvas
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Intersect all children of cubies (which are the stickers)
    const intersects = raycaster.intersectObjects(scene.children, true);

    // Find the first intersected object that has a stickerIndex
    const hit = intersects.find(intersect => 
      intersect.object.userData && intersect.object.userData.stickerIndex !== undefined
    );

    if (hit && onStickerClick) {
      onStickerClick(hit.object.userData.stickerIndex);
    }
  });
}

/**
 * Handle canvas resize
 */
function onWindowResize() {
  const container = renderer.domElement.parentElement;
  if (!container) return;
  width = container.clientWidth;
  height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

/**
 * Sets the color of a specific sticker
 * @param {number} index - Sticker index (0-53)
 * @param {string} colorHex - Color hex string
 */
export function setStickerColor3D(index, colorHex) {
  if (stickerPlanes[index]) {
    stickerPlanes[index].material.color.set(colorHex);
  }
}

/**
 * Sets all sticker colors at once
 * @param {Array} colors - Array of 54 color hex strings
 */
export function setAllStickerColors3D(colors) {
  for (let i = 0; i < 54; i++) {
    setStickerColor3D(i, colors[i] || COLORS.default);
  }
}

/**
 * Resets all stickers to the uncolored (default) state
 */
export function resetColors3D() {
  for (let i = 0; i < 54; i++) {
    setStickerColor3D(i, COLORS.default);
  }
}

/**
 * Resets the physical rotation of all cubies to identity
 */
export function resetCubieRotations3D() {
  cubies.forEach(cubie => {
    // Reset position to original grid coords based on current position
    const x = Math.round(cubie.position.x);
    const y = Math.round(cubie.position.y);
    const z = Math.round(cubie.position.z);
    cubie.position.set(x, y, z);
    
    // Reset rotation
    cubie.rotation.set(0, 0, 0);
    cubie.quaternion.set(0, 0, 0, 1);
  });
}

/**
 * Animates a face turn on the 3D cube
 * @param {string} move - Singmaster notation move (e.g. R, U', F2)
 * @param {number} speed - Animation duration in ms (default 300)
 * @returns {Promise} Resolves when the animation is complete
 */
export function animateMove3D(move, speed = 300) {
  if (isAnimating) return Promise.resolve();
  isAnimating = true;

  return new Promise((resolve) => {
    const face = move[0];
    const modifier = move.substring(1);

    // Determine target axis, layer coordinate, and angle of rotation
    let axis = new THREE.Vector3();
    let coordinateCheck = (pos) => false;
    let angle = -Math.PI / 2; // Default clockwise rotation (looking at face)

    switch (face) {
      case 'R':
        axis.set(1, 0, 0);
        coordinateCheck = (pos) => pos.x > 0.5;
        angle = -Math.PI / 2;
        break;
      case 'L':
        axis.set(1, 0, 0);
        coordinateCheck = (pos) => pos.x < -0.5;
        angle = Math.PI / 2; // Clockwise from Left face is counter-clockwise looking from Right
        break;
      case 'U':
        axis.set(0, 1, 0);
        coordinateCheck = (pos) => pos.y > 0.5;
        angle = -Math.PI / 2;
        break;
      case 'D':
        axis.set(0, 1, 0);
        coordinateCheck = (pos) => pos.y < -0.5;
        angle = Math.PI / 2;
        break;
      case 'F':
        axis.set(0, 0, 1);
        coordinateCheck = (pos) => pos.z > 0.5;
        angle = -Math.PI / 2;
        break;
      case 'B':
        axis.set(0, 0, 1);
        coordinateCheck = (pos) => pos.z < -0.5;
        angle = Math.PI / 2;
        break;
      default:
        isAnimating = false;
        resolve();
        return;
    }

    // Apply modifier
    if (modifier === "'") {
      angle = -angle; // Reverse direction
    } else if (modifier === '2') {
      angle = angle * 2; // Double turn (180 degrees)
    }

    // Find all cubies in this face layer
    const layerCubies = cubies.filter(c => coordinateCheck(c.position));

    // Create a temporary pivot object
    const pivot = new THREE.Object3D();
    pivot.position.set(0, 0, 0);
    scene.add(pivot);

    // Parent the cubies to the pivot
    layerCubies.forEach(c => {
      pivot.attach(c);
    });

    // Animate rotation
    const startRotation = pivot.rotation.clone();
    const startTime = performance.now();

    function update() {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / speed, 1);
      
      // Easing function (easeInOutCubic)
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      // Apply rotation on pivot
      pivot.rotation.set(0, 0, 0); // Reset
      pivot.rotateOnAxis(axis, angle * ease);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Animation complete!
        // Snap final rotation
        pivot.rotation.set(0, 0, 0);
        pivot.rotateOnAxis(axis, angle);
        pivot.updateMatrixWorld();

        // Un-parent cubies back to scene and round coordinates
        layerCubies.forEach(c => {
          scene.attach(c);
          
          // Round positions to avoid floating point drift
          c.position.x = Math.round(c.position.x);
          c.position.y = Math.round(c.position.y);
          c.position.z = Math.round(c.position.z);

          // Round rotation matrix to orthogonal angles
          const euler = new THREE.Euler().setFromQuaternion(c.quaternion, 'XYZ');
          euler.x = Math.round(euler.x / (Math.PI / 2)) * (Math.PI / 2);
          euler.y = Math.round(euler.y / (Math.PI / 2)) * (Math.PI / 2);
          euler.z = Math.round(euler.z / (Math.PI / 2)) * (Math.PI / 2);
          c.rotation.copy(euler);
        });

        // Remove temporary pivot
        scene.remove(pivot);

        isAnimating = false;
        resolve();
      }
    }

    requestAnimationFrame(update);
  });
}

/**
 * Geometrically reads the current sticker colors from the 3D scene.
 * This is the single source of truth for the cube's state.
 * @returns {Array} Array of 54 color hex strings
 */
export function getStickersColors3D() {
  const currentColors = new Array(54);
  const mapping = getStickerMapping();

  // Directions in world space for each face
  const directions = {
    'U': new THREE.Vector3(0, 1, 0),
    'D': new THREE.Vector3(0, -1, 0),
    'R': new THREE.Vector3(1, 0, 0),
    'L': new THREE.Vector3(-1, 0, 0),
    'F': new THREE.Vector3(0, 0, 1),
    'B': new THREE.Vector3(0, 0, -1)
  };

  // Find cubie at target coordinate
  const findCubie = (x, y, z) => {
    return cubies.find(c => 
      Math.abs(c.position.x - x) < 0.3 && 
      Math.abs(c.position.y - y) < 0.3 && 
      Math.abs(c.position.z - z) < 0.3
    );
  };

  for (let i = 0; i < 54; i++) {
    const map = mapping[i]; // Target location (x, y, z) and face
    const cubie = findCubie(map.x, map.y, map.z);
    
    if (!cubie) {
      currentColors[i] = COLORS.default;
      continue;
    }

    // Find the sticker on this cubie whose world normal points in the target direction
    const targetDir = directions[map.face];
    let bestSticker = null;
    let maxDot = -Infinity;

    // Loop through sticker children
    cubie.children.forEach(child => {
      if (child.userData && child.userData.stickerIndex !== undefined) {
        // Compute world position of child sticker and parent cubie
        const childWorldPos = new THREE.Vector3();
        child.getWorldPosition(childWorldPos);

        const cubieWorldPos = new THREE.Vector3();
        cubie.getWorldPosition(cubieWorldPos);

        // Vector pointing from cubie center to sticker center represents its normal direction
        const normal = new THREE.Vector3().subVectors(childWorldPos, cubieWorldPos).normalize();

        const dot = normal.dot(targetDir);
        if (dot > maxDot) {
          maxDot = dot;
          bestSticker = child;
        }
      }
    });

    if (bestSticker && maxDot > 0.7) {
      currentColors[i] = '#' + bestSticker.material.color.getHexString();
    } else {
      currentColors[i] = COLORS.default;
    }
  }

  return currentColors;
}

/**
 * Returns mapping of 54 stickers to cubie coordinates
 * This is exported from solver.js but redefined locally here to avoid dependency issues if needed,
 * or mapped directly.
 */
function getStickerMapping() {
  const mapping = [];
  // U: 0 to 8 (top-left to bottom-right)
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      mapping.push({ x: -1 + c, y: 1, z: -1 + r, face: 'U' });
    }
  }
  // R: 9 to 17
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      mapping.push({ x: 1, y: 1 - r, z: 1 - c, face: 'R' });
    }
  }
  // F: 18 to 26
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      mapping.push({ x: -1 + c, y: 1 - r, z: 1, face: 'F' });
    }
  }
  // D: 27 to 35
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      mapping.push({ x: -1 + c, y: -1, z: 1 - r, face: 'D' });
    }
  }
  // L: 36 to 44
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      mapping.push({ x: -1, y: 1 - r, z: -1 + c, face: 'L' });
    }
  }
  // B: 45 to 53
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      mapping.push({ x: 1 - c, y: 1 - r, z: -1, face: 'B' });
    }
  }
  return mapping;
}
