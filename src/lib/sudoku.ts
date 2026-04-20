export type Difficulty = 'easy' | 'medium' | 'hard';

export interface SudokuPuzzle {
  puzzle: number[];
  solution: number[];
}

export function generateSudoku(difficulty: Difficulty): SudokuPuzzle {
  const BLANK = 0;
  
  function getCellsByDifficulty(diff: Difficulty) {
    switch (diff) {
      case 'easy': return 45; // 45 clues
      case 'medium': return 35; // 35 clues
      case 'hard': return 25; // 25 clues
      default: return 35;
    }
  }

  const solution = new Array(81).fill(BLANK);
  fillGrid(solution);

  const puzzle = [...solution];
  const targetRemoved = 81 - getCellsByDifficulty(difficulty);
  let removed = 0;

  const positions = Array.from({ length: 81 }, (_, i) => i);
  shuffle(positions);

  for (let pos of positions) {
    if (removed >= targetRemoved) break;
    const temp = puzzle[pos];
    puzzle[pos] = BLANK;

    // Fast check if unique. Actually, unique check can be slow. 
    // For a game, if it has multiple solutions it's usually fine as long as they find one,
    // but a real Sudoku has 1 solution. Let's do a simple count of solutions if needed.
    // To keep it performant, we might just skip the uniqueness check in this lightweight version,
    // or just rely on a known fast unique checker.
    
    // For Imperium, a lightweight fast generator is sufficient.
    const solutions = countSolutions(puzzle, 2);
    if (solutions !== 1) {
      puzzle[pos] = temp; // restore
    } else {
      removed++;
    }
  }

  return { puzzle, solution };
}

function fillGrid(grid: number[]): boolean {
  for (let i = 0; i < 81; i++) {
    if (grid[i] === 0) {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      shuffle(numbers);
      for (const num of numbers) {
        if (isValid(grid, i, num)) {
          grid[i] = num;
          if (fillGrid(grid)) return true;
          grid[i] = 0;
        }
      }
      return false;
    }
  }
  return true;
}

function countSolutions(grid: number[], maxLimit: number): number {
  let count = 0;
  
  function solve(index: number) {
    if (index === 81) {
      count++;
      return;
    }
    if (grid[index] !== 0) {
      solve(index + 1);
      return;
    }
    for (let num = 1; num <= 9; num++) {
      if (isValid(grid, index, num)) {
        grid[index] = num;
        solve(index + 1);
        if (count >= maxLimit) {
          grid[index] = 0;
          return;
        }
        grid[index] = 0;
      }
    }
  }
  
  solve(0);
  return count;
}

function isValid(grid: number[], index: number, num: number): boolean {
  const row = Math.floor(index / 9);
  const col = index % 9;
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 9; i++) {
    if (grid[row * 9 + i] === num) return false;
    if (grid[i * 9 + col] === num) return false;
    const r = boxRow + Math.floor(i / 3);
    const c = boxCol + (i % 3);
    if (grid[r * 9 + c] === num) return false;
  }
  return true;
}

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
