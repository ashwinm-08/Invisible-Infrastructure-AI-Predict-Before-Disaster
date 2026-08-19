// Predefined Rubik's Cube Patterns and Move Sequences
// All patterns are defined starting from a solved state.

export const PATTERNS = [
  {
    id: 'solve',
    name: 'Full Solve (Standard)',
    description: 'Solve the entire cube so that each of the 6 sides has a single solid color.',
    moves: [],
    explanation: 'A fully solved Rubik\'s Cube. Every side is a single color.'
  },
  {
    id: 'four_ts',
    name: 'Decorative 4 T\'s',
    description: 'Creates a letter "T" pattern on four faces of the cube.',
    moves: ['F2', 'D2', 'F\'', 'L2', 'D2', 'U2', 'R2', 'B\'', 'U2', 'F2'],
    explanation: 'This pattern forms a capital letter "T" color shape on 4 sides of the cube, using a 10-move sequence.'
  },
  {
    id: 'checkerboard',
    name: 'Checkerboard Pattern',
    description: 'Alternating colors on every face, making it look like a chessboard.',
    moves: ['R2', 'L2', 'U2', 'D2', 'F2', 'B2'],
    explanation: 'A classic pattern where every face has alternating colors. Can be achieved with only double-turns.'
  },
  {
    id: 'flower_dot',
    name: 'Flower / Dot Pattern',
    description: 'Swaps the center pieces of all 6 faces while keeping the borders intact.',
    moves: ['U', 'D\'', 'R', 'L\'', 'F', 'B\'', 'U\'', 'D'],
    explanation: 'A beautiful pattern that places a single different-colored "dot" in the center of each face.'
  },
  {
    id: 'one_side_t',
    name: 'One Side Solved (Beginner Step)',
    description: 'Highlights the target state of the first layer in the beginner method.',
    // A sequence of moves that scrambles the bottom layers while leaving the U face (Yellow) and its top-layer edges intact
    moves: ['R\'', 'D\'', 'R', 'D', 'F', 'D\'', 'F\'', 'D2', 'L', 'D', 'L\'', 'D\'', 'B\'', 'D', 'B'],
    explanation: 'In the Beginner\'s Method, solving the first layer (e.g. Yellow U-face) correctly means the stickers on the adjacent side faces also align, forming a small "T" shape on each of the 4 sides. This sequence scrambles the middle and bottom layers while keeping the first layer fully solved.'
  }
];
