// Main application controller for Rubik's Cube Solver
import { initCube3D, setStickerColor3D, setAllStickerColors3D, resetColors3D, resetCubieRotations3D, animateMove3D, getStickersColors3D, COLORS, FACE_COLORS } from './cube3d.js';
import { validateCube, solveCube } from './solver.js';
import { PATTERNS } from './patterns.js';

// Application state
let activeColor = COLORS.U; // Default paint color
let stickerColors = new Array(54).fill(COLORS.default);
let solutionMoves = [];
let solutionExplanations = [];
let currentStep = -1; // -1 means start state (unsolved)
let playbackInterval = null;
let playbackSpeed = 500; // Animation speed in ms
let currentMode = 'edit'; // 'edit', 'solve', 'pattern'

// Center piece indices (which are fixed/locked)
const CENTER_INDICES = [4, 13, 22, 31, 40, 49];
const CENTER_FACES = {
  4: 'U',
  13: 'R',
  22: 'F',
  31: 'D',
  40: 'L',
  49: 'B'
};

// Correct PRESET_SCRAMBLE to use actual COLORS
const VALID_PRESET = [
  COLORS.U, COLORS.R, COLORS.B, COLORS.L, COLORS.U, COLORS.F, COLORS.R, COLORS.F, COLORS.U, // U
  COLORS.F, COLORS.U, COLORS.L, COLORS.B, COLORS.R, COLORS.D, COLORS.R, COLORS.D, COLORS.D, // R
  COLORS.B, COLORS.L, COLORS.R, COLORS.U, COLORS.F, COLORS.F, COLORS.L, COLORS.R, COLORS.B, // F
  COLORS.D, COLORS.B, COLORS.D, COLORS.D, COLORS.D, COLORS.L, COLORS.L, COLORS.U, COLORS.B, // D
  COLORS.U, COLORS.F, COLORS.D, COLORS.R, COLORS.L, COLORS.B, COLORS.F, COLORS.F, COLORS.F, // L
  COLORS.B, COLORS.D, COLORS.U, COLORS.L, COLORS.B, COLORS.R, COLORS.L, COLORS.U, COLORS.L  // B
];


document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Initialize sticker colors with centers set
  resetToDefaultColors();

  // Initialize 3D Cube
  const container = document.getElementById('canvas-container');
  initCube3D(container, handleStickerClick3D);
  syncAllStickersTo3D();

  // Draw 2D Net editor
  build2DNet();

  // Setup Event Listeners
  setupEventListeners();

  // Load Preset Scramble (for quick testing)
  loadPresetList();
}

/**
 * Resets stickerColors array to default with centers pre-colored
 */
function resetToDefaultColors() {
  stickerColors.fill(COLORS.default);
  // Pre-color centers
  CENTER_INDICES.forEach(index => {
    const face = CENTER_FACES[index];
    stickerColors[index] = FACE_COLORS[face];
  });
}

/**
 * Syncs the logical stickerColors array to the 3D scene
 */
function syncAllStickersTo3D() {
  setAllStickerColors3D(stickerColors);
}

/**
 * Builds the 2D Net Editor DOM structure dynamically
 */
function build2DNet() {
  const faces = ['u', 'l', 'f', 'r', 'b', 'd'];
  
  faces.forEach(face => {
    const faceEl = document.querySelector(`.face-net.face-${face}`);
    faceEl.innerHTML = ''; // Clear

    // Get offset index for this face
    let offset = 0;
    switch (face.toUpperCase()) {
      case 'U': offset = 0; break;
      case 'R': offset = 9; break;
      case 'F': offset = 18; break;
      case 'D': offset = 27; break;
      case 'L': offset = 36; break;
      case 'B': offset = 45; break;
    }

    // Add 9 stickers to the face
    for (let i = 0; i < 9; i++) {
      const stickerIdx = offset + i;
      const isCenter = i === 4;

      const btn = document.createElement('button');
      btn.className = 'sticker-net';
      btn.dataset.index = stickerIdx;
      
      if (isCenter) {
        btn.classList.add('center-sticker');
        btn.style.backgroundColor = FACE_COLORS[face.toUpperCase()];
      } else {
        btn.style.backgroundColor = stickerColors[stickerIdx];
        btn.addEventListener('click', () => handleStickerClick2D(stickerIdx));
      }

      faceEl.appendChild(btn);
    }
  });
}

/**
 * Updates a single sticker in 2D Net view
 */
function update2DNetSticker(index, color) {
  const btn = document.querySelector(`.sticker-net[data-index="${index}"]`);
  if (btn) {
    btn.style.backgroundColor = color;
  }
}

/**
 * Updates all stickers in 2D Net view
 */
function updateAll2DNet() {
  for (let i = 0; i < 54; i++) {
    update2DNetSticker(i, stickerColors[i]);
  }
}

/**
 * Handles clicks on the color palette buttons
 */
function handlePaletteClick(colorHex, btnElement) {
  activeColor = colorHex;
  // Update active border
  document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');
}

/**
 * Handles sticker paint clicks in 3D view
 */
function handleStickerClick3D(index) {
  if (currentMode !== 'edit') return;
  // Ignore center pieces (locked)
  if (CENTER_INDICES.includes(index)) return;

  // Set logical color
  stickerColors[index] = activeColor;

  // Set 3D color
  setStickerColor3D(index, activeColor);

  // Sync with 2D net
  update2DNetSticker(index, activeColor);

  // Clear solution if any colors changed
  clearSolution();
}

/**
 * Handles sticker paint clicks in 2D net view
 */
function handleStickerClick2D(index) {
  if (currentMode !== 'edit') return;
  // Ignore center pieces
  if (CENTER_INDICES.includes(index)) return;

  // Set logical color
  stickerColors[index] = activeColor;

  // Set 3D color
  setStickerColor3D(index, activeColor);

  // Sync with 2D net
  update2DNetSticker(index, activeColor);

  // Clear solution if any colors changed
  clearSolution();
}

/**
 * Loads predefined patterns into the right sidebar presets panel
 */
function loadPresetList() {
  const listEl = document.getElementById('presets-list');
  listEl.innerHTML = '';

  PATTERNS.forEach(pattern => {
    const card = document.createElement('div');
    card.className = 'preset-card';
    card.innerHTML = `
      <div class="preset-name">${pattern.name}</div>
      <div class="preset-desc">${pattern.description}</div>
    `;
    card.addEventListener('click', () => applyPattern(pattern));
    listEl.appendChild(card);
  });
}

/**
 * Sets up all general UI event listeners
 */
function setupEventListeners() {
  // Tab/Mode switching
  document.getElementById('tab-edit').addEventListener('click', () => switchMode('edit'));
  document.getElementById('tab-solve').addEventListener('click', () => switchMode('solve'));
  document.getElementById('tab-pattern').addEventListener('click', () => switchMode('pattern'));

  // Color Palette Buttons
  document.querySelectorAll('.color-btn[data-color]').forEach(btn => {
    const colorHex = btn.dataset.color;
    btn.style.backgroundColor = colorHex;
    btn.addEventListener('click', () => handlePaletteClick(colorHex, btn));
  });

  // Eraser button
  document.getElementById('eraser-btn').addEventListener('click', (e) => {
    handlePaletteClick(COLORS.default, e.currentTarget);
  });

  // Action Buttons
  document.getElementById('btn-clear').addEventListener('click', clearCube);
  document.getElementById('btn-preset-scramble').addEventListener('click', loadPresetScramble);
  document.getElementById('btn-solve').addEventListener('click', triggerSolver);

  // Playback Control Buttons
  document.getElementById('playback-first').addEventListener('click', () => jumpToStep(-1));
  document.getElementById('playback-prev').addEventListener('click', stepBackward);
  document.getElementById('playback-play').addEventListener('click', togglePlay);
  document.getElementById('playback-next').addEventListener('click', stepForward);
  document.getElementById('playback-last').addEventListener('click', () => jumpToStep(solutionMoves.length - 1));

  // Speed Slider
  const speedSlider = document.getElementById('speed-slider');
  speedSlider.addEventListener('input', (e) => {
    playbackSpeed = parseInt(e.target.value);
    document.getElementById('speed-val').textContent = `${(playbackSpeed / 1000).toFixed(1)}s`;
    
    // Restart interval if playing
    if (playbackInterval) {
      pausePlayback();
      startPlayback();
    }
  });

  // Timeline Click listener
  document.getElementById('timeline-container').addEventListener('click', (e) => {
    const stepBtn = e.target.closest('.timeline-move');
    if (stepBtn) {
      const stepIdx = parseInt(stepBtn.dataset.step);
      jumpToStep(stepIdx);
    }
  });

  // HUD camera rotate triggers
  const hudMoves = {
    'hud-u': 'U', 'hud-u-prime': "U'",
    'hud-d': 'D', 'hud-d-prime': "D'",
    'hud-r': 'R', 'hud-r-prime': "R'",
    'hud-l': 'L', 'hud-l-prime': "L'",
    'hud-f': 'F', 'hud-f-prime': "F'",
    'hud-b': 'B', 'hud-b-prime': "B'"
  };

  Object.entries(hudMoves).forEach(([id, move]) => {
    document.getElementById(id).addEventListener('click', () => {
      // Execute 3D move immediately
      animateMove3D(move, 250).then(() => {
        // If in edit mode, sync colors back to logical state
        if (currentMode === 'edit') {
          stickerColors = getStickersColors3D();
          updateAll2DNet();
        }
      });
    });
  });
}

/**
 * Switches the primary application mode
 * @param {string} mode - 'edit', 'solve', or 'pattern'
 */
function switchMode(mode) {
  if (currentMode === mode) return;

  // Manage UI panels
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`tab-${mode}`).classList.add('active');

  // Toggle panel visibility
  const editPanel = document.getElementById('panel-edit-controls');
  const patternPanel = document.getElementById('panel-pattern-controls');
  const netPanel = document.getElementById('net-panel');

  if (mode === 'edit') {
    editPanel.classList.remove('hidden');
    patternPanel.classList.add('hidden');
    netPanel.classList.remove('hidden');
    
    // Stop solution playback if active
    pausePlayback();
    clearSolution();
    
    // Restore cube state to edit representation (often needs cubies snapped back to identity)
    resetCubieRotations3D();
    syncAllStickersTo3D();
  } else if (mode === 'pattern') {
    editPanel.classList.add('hidden');
    patternPanel.classList.remove('hidden');
    netPanel.classList.add('hidden');
    
    pausePlayback();
    clearSolution();
  } else if (mode === 'solve') {
    // Attempting to solve
    editPanel.classList.remove('hidden');
    patternPanel.classList.add('hidden');
    netPanel.classList.remove('hidden');
    
    // Trigger solver
    triggerSolver();
  }

  currentMode = mode;
}

/**
 * Loads the valid preset scramble
 */
function loadPresetScramble() {
  stickerColors = [...VALID_PRESET];
  syncAllStickersTo3D();
  updateAll2DNet();
  clearSolution();
  showStatus("Preset scramble loaded. Click 'Solve Cube' to calculate solution.", 'success');
}

/**
 * Clears the cube colors, resetting to uncolored
 */
function clearCube() {
  resetToDefaultColors();
  syncAllStickersTo3D();
  updateAll2DNet();
  clearSolution();
  resetCubieRotations3D();
  showStatus("Cube colors cleared. Click stickers to paint.", 'info');
}

/**
 * Runs the solver, handles loading transitions and errors
 */
async function triggerSolver() {
  showStatus("Calculating solution...", 'info');
  pausePlayback();

  // If we are solving, make sure we align the 3D meshes first in case we performed HUD moves
  resetCubieRotations3D();

  // Read current colors from 3D scene (just in case they rotated and synced)
  stickerColors = getStickersColors3D();

  try {
    const result = await solveCube(stickerColors);
    solutionMoves = result.moves;
    solutionExplanations = result.explanations;
    currentStep = -1; // Ready for step-by-step

    // Show solution HUD
    renderSolutionUI();
    showStatus(`Solution found! (${solutionMoves.length} moves)`, 'success');
    
    // Automatically switch to solve tab UI style
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('tab-solve').classList.add('active');
    currentMode = 'solve';

  } catch (err) {
    showStatus(err.message, 'error');
    
    // Fall back tab UI to edit
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('tab-edit').classList.add('active');
    currentMode = 'edit';
  }
}

/**
 * Renders the step-by-step solution player UI
 */
function renderSolutionUI() {
  const panel = document.getElementById('solution-playback-panel');
  panel.classList.remove('hidden');

  // Stats
  document.getElementById('solution-length').textContent = solutionMoves.length;
  
  // Render moves timeline
  const timeline = document.getElementById('timeline-container');
  timeline.innerHTML = '';

  solutionMoves.forEach((move, index) => {
    const btn = document.createElement('div');
    btn.className = 'timeline-move';
    btn.textContent = move;
    btn.dataset.step = index;
    timeline.appendChild(btn);
  });

  updatePlaybackState();
}

/**
 * Clears the active solution and hides solution controls
 */
function clearSolution() {
  solutionMoves = [];
  solutionExplanations = [];
  currentStep = -1;
  document.getElementById('solution-playback-panel').classList.add('hidden');
}

/**
 * Updates UI matching the current solve playback index
 */
function updatePlaybackState() {
  // Highlight active move in timeline
  document.querySelectorAll('.timeline-move').forEach(el => el.classList.remove('active'));
  const activeTimelineMove = document.querySelector(`.timeline-move[data-step="${currentStep}"]`);
  if (activeTimelineMove) {
    activeTimelineMove.classList.add('active');
    activeTimelineMove.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  // Update walkthrough card
  const stepNum = document.getElementById('walkthrough-step');
  const moveLabel = document.getElementById('walkthrough-move');
  const descLabel = document.getElementById('walkthrough-desc');

  if (currentStep === -1) {
    stepNum.textContent = '--';
    moveLabel.textContent = 'Start State';
    descLabel.textContent = 'Cube is currently scrambled. Click "Play" or "Next" to begin the step-by-step solution.';
  } else {
    stepNum.textContent = currentStep + 1;
    moveLabel.textContent = solutionMoves[currentStep];
    descLabel.textContent = solutionExplanations[currentStep];
  }
}

/**
 * Jumps directly to a specific step in the solution
 */
async function jumpToStep(stepIdx) {
  if (stepIdx < -1 || stepIdx >= solutionMoves.length) return;
  pausePlayback();

  // To jump to step X, we reset cube to original scrambled state, and re-apply all moves up to step X
  resetCubieRotations3D();
  syncAllStickersTo3D();

  // Instant rotation (speed 0)
  for (let i = 0; i <= stepIdx; i++) {
    await animateMove3D(solutionMoves[i], 0);
  }

  currentStep = stepIdx;
  updatePlaybackState();
}

/**
 * Steps forward by 1 move with animation
 */
function stepForward() {
  if (currentStep >= solutionMoves.length - 1) {
    pausePlayback();
    return Promise.resolve();
  }

  currentStep++;
  const nextMove = solutionMoves[currentStep];
  updatePlaybackState();
  return animateMove3D(nextMove, playbackSpeed - 50); // Leave a tiny gap
}

/**
 * Steps backward by 1 move
 */
async function stepBackward() {
  if (currentStep < 0) return;

  const currentMove = solutionMoves[currentStep];
  currentStep--;
  
  // To move backward, we play the INVERSE move of currentMove!
  const inverseMove = getInverseMove(currentMove);
  updatePlaybackState();
  await animateMove3D(inverseMove, playbackSpeed - 50);
}

/**
 * Helper to invert a move string
 */
function getInverseMove(move) {
  const face = move[0];
  const modifier = move.substring(1);
  if (modifier === "'") {
    return face; // Inverse of counter-clockwise is clockwise
  } else if (modifier === '2') {
    return move; // Inverse of 180 degrees is same 180 degrees
  } else {
    return `${face}'`; // Inverse of clockwise is counter-clockwise
  }
}

/**
 * Controls solution playback
 */
function togglePlay() {
  if (playbackInterval) {
    pausePlayback();
  } else {
    startPlayback();
  }
}

function startPlayback() {
  document.getElementById('playback-play').innerHTML = '<i class="fa-solid fa-pause"></i>';
  document.getElementById('playback-play').title = 'Pause Solution';
  
  const playLoop = async () => {
    if (currentStep >= solutionMoves.length - 1) {
      pausePlayback();
      showStatus("Solution walkthrough completed!", 'success');
      return;
    }
    await stepForward();
    if (playbackInterval) { // check if still playing
      playbackInterval = setTimeout(playLoop, 200); // Small rest between turns
    }
  };

  playbackInterval = setTimeout(playLoop, 10);
}

function pausePlayback() {
  if (playbackInterval) {
    clearTimeout(playbackInterval);
    playbackInterval = null;
  }
  document.getElementById('playback-play').innerHTML = '<i class="fa-solid fa-play"></i>';
  document.getElementById('playback-play').title = 'Play Solution';
}

/**
 * Prepares and animates a decorative pattern or custom state
 */
async function applyPattern(pattern) {
  pausePlayback();
  clearSolution();
  showStatus(`Applying pattern: ${pattern.name}...`, 'info');

  // Switch to solved view first
  resetCubieRotations3D();
  
  // Set solved colors starting state
  for (let i = 0; i < 54; i++) {
    const map = getStickerMapping()[i];
    stickerColors[i] = FACE_COLORS[map.face];
  }
  syncAllStickersTo3D();
  updateAll2DNet();

  // If pattern has moves (e.g. 4 T's, Checkerboard, Dot)
  if (pattern.moves && pattern.moves.length > 0) {
    // Run the moves sequentially with a nice smooth animation
    const speed = 250;
    for (let i = 0; i < pattern.moves.length; i++) {
      await animateMove3D(pattern.moves[i], speed);
    }
    // Update the logical state colors matching the 3D result
    stickerColors = getStickersColors3D();
    updateAll2DNet();
  } else if (pattern.id === 'one_side_t') {
    // For "One Side Solved", we scrambles the bottom layers leaving yellow solved
    // This is already preset inside the pattern moves, which we ran.
  }

  showStatus(`Pattern applied: ${pattern.name}. ${pattern.explanation}`, 'success');
}

/**
 * Status message display helper
 */
function showStatus(msg, type) {
  const card = document.getElementById('status-box');
  card.className = `status-card ${type}`;
  card.innerHTML = `
    <i class="fa-solid ${
      type === 'success' ? 'fa-circle-check' : 
      type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info'
    }"></i>
    <div>${msg}</div>
  `;
}

/**
 * Returns mapping of 54 stickers to cubie coordinates (redefined locally)
 */
function getStickerMapping() {
  const mapping = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      mapping.push({ x: -1 + c, y: 1, z: -1 + r, face: 'U' });
    }
  }
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      mapping.push({ x: 1, y: 1 - r, z: 1 - c, face: 'R' });
    }
  }
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      mapping.push({ x: -1 + c, y: 1 - r, z: 1, face: 'F' });
    }
  }
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      mapping.push({ x: -1 + c, y: -1, z: 1 - r, face: 'D' });
    }
  }
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      mapping.push({ x: -1, y: 1 - r, z: -1 + c, face: 'L' });
    }
  }
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      mapping.push({ x: 1 - c, y: 1 - r, z: -1, face: 'B' });
    }
  }
  return mapping;
}
