// Solver module for Rubik's Cube
// Integrates min2phase.js and handles state validation and move explanations

// Face mapping sequence (Singmaster order): U1-U9, R1-R9, F1-F9, D1-D9, L1-L9, B1-B9
// The indices of centers in the 54-character string are:
// U5 = 4, R5 = 13, F5 = 22, D5 = 31, L5 = 40, B5 = 49
const CENTER_INDICES = {
  U: 4,
  R: 13,
  F: 22,
  D: 31,
  L: 40,
  B: 49
};

/**
 * Validates the sticker colors of the cube
 * @param {Array} stickers - Array of 54 sticker colors
 * @returns {Object} { isValid: boolean, error: string|null }
 */
export function validateCube(stickers) {
  // 1. Check if any sticker is uncolored (we represent uncolored as 'gray' or null/undefined)
  const uncoloredCount = stickers.filter(c => !c || c === 'gray' || c === '#444' || c === 'default').length;
  if (uncoloredCount > 0) {
    return {
      isValid: false,
      error: `Cube is incomplete. Please color all 54 stickers. (${uncoloredCount} stickers remaining)`
    };
  }

  // 2. Extract center colors
  const centers = {
    U: stickers[CENTER_INDICES.U],
    R: stickers[CENTER_INDICES.R],
    F: stickers[CENTER_INDICES.F],
    D: stickers[CENTER_INDICES.D],
    L: stickers[CENTER_INDICES.L],
    B: stickers[CENTER_INDICES.B]
  };

  // Check if center colors are unique
  const centerColors = Object.values(centers);
  const uniqueCenters = new Set(centerColors);
  if (uniqueCenters.size < 6) {
    return {
      isValid: false,
      error: "Validation error: Each of the 6 center pieces must have a unique color."
    };
  }

  // 3. Check color counts (must be exactly 9 of each center color)
  const colorCounts = {};
  centerColors.forEach(color => {
    colorCounts[color] = 0;
  });

  for (let i = 0; i < 54; i++) {
    const color = stickers[i];
    if (colorCounts[color] !== undefined) {
      colorCounts[color]++;
    } else {
      return {
        isValid: false,
        error: `Validation error: Sticker at index ${i} has an invalid color (${color}) that does not match any center.`
      };
    }
  }

  const badColors = Object.entries(colorCounts).filter(([_, count]) => count !== 9);
  if (badColors.length > 0) {
    const details = badColors.map(([color, count]) => `${getColorName(color)}: found ${count} (expected 9)`).join(', ');
    return {
      isValid: false,
      error: `Validation error: Must have exactly 9 stickers of each color. Details: ${details}`
    };
  }

  return { isValid: true, error: null };
}

/**
 * Returns a human-friendly name for standard colors
 */
function getColorName(hex) {
  const names = {
    '#ffffff': 'White',
    '#ffd700': 'Yellow',
    '#009b48': 'Green',
    '#0045ad': 'Blue',
    '#b71234': 'Red',
    '#ff5800': 'Orange',
    '#fff': 'White',
    'yellow': 'Yellow',
    'green': 'Green',
    'blue': 'Blue',
    'red': 'Red',
    'orange': 'Orange'
  };
  return names[hex.toLowerCase()] || hex;
}

/**
 * Converts sticker array to the 54-character URFDLB string format
 * @param {Array} stickers - Array of 54 sticker colors
 * @returns {string} 54-character string of U, R, F, D, L, B
 */
export function getCubeString(stickers) {
  // Map color to face letter
  const colorToFace = {};
  colorToFace[stickers[CENTER_INDICES.U]] = 'U';
  colorToFace[stickers[CENTER_INDICES.R]] = 'R';
  colorToFace[stickers[CENTER_INDICES.F]] = 'F';
  colorToFace[stickers[CENTER_INDICES.D]] = 'D';
  colorToFace[stickers[CENTER_INDICES.L]] = 'L';
  colorToFace[stickers[CENTER_INDICES.B]] = 'B';

  return stickers.map(color => colorToFace[color]).join('');
}

/**
 * Solves the Rubik's cube using min2phase
 * @param {Array} stickers - Array of 54 sticker colors
 * @returns {Promise<Object>} Resolves to { moves: Array, explanations: Array }
 */
export async function solveCube(stickers) {
  const validation = validateCube(stickers);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const cubeString = getCubeString(stickers);
  console.log("Solving cube state string:", cubeString);

  // Initialize and call min2phase
  if (typeof window.min2phase === 'undefined') {
    throw new Error("Solver library (min2phase) is not loaded. Please check your internet connection.");
  }

  // Initialize pruning tables if not already done
  if (window.min2phase.initFull) {
    window.min2phase.initFull();
  }

  let solutionStr;
  try {
    solutionStr = window.min2phase.solve(cubeString);
  } catch (err) {
    console.error("min2phase.solve failed:", err);
    throw new Error("Invalid cube state: The entered colors do not form a physically solvable Rubik's Cube. Check for twisted corners or flipped edges.");
  }

  if (!solutionStr || solutionStr.includes("Error")) {
    throw new Error("Invalid cube state: The entered colors do not form a physically solvable Rubik's Cube. Check for twisted corners or flipped edges.");
  }

  // Parse moves
  const rawMoves = solutionStr.trim().split(/\s+/).filter(m => m.length > 0);
  const moves = [];
  const explanations = [];

  rawMoves.forEach(move => {
    moves.push(move);
    explanations.push(getMoveExplanation(move));
  });

  return { moves, explanations };
}

/**
 * Generates a human-readable explanation for a Rubik's cube move
 * @param {string} move - Standard Singmaster move (e.g. R, U', F2)
 * @returns {string} Human-friendly explanation
 */
export function getMoveExplanation(move) {
  const faceNames = {
    'U': 'Up (Yellow)',
    'D': 'Down (White)',
    'R': 'Right (Red)',
    'L': 'Left (Orange)',
    'F': 'Front (Green)',
    'B': 'Back (Blue)'
  };

  const face = move[0];
  const modifier = move.substring(1);
  const faceName = faceNames[face] || face;

  if (modifier === '2') {
    return `Rotate the ${faceName} face by 180 degrees (double turn)`;
  } else if (modifier === "'") {
    return `Rotate the ${faceName} face counter-clockwise (90 degrees)`;
  } else {
    return `Rotate the ${faceName} face clockwise (90 degrees)`;
  }
}
