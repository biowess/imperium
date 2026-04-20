import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Difficulty, generateSudoku } from '../lib/sudoku';

export type Screen = 'menu' | 'game' | 'leaderboard' | 'history' | 'settings' | 'about' | 'help';
export type ThemeIntensity = 'ultra' | 'balanced' | 'minimal' | 'performance';
export type { Difficulty };

export interface GameHistoryEntry {
  id: string;
  date: number;
  difficulty: Difficulty;
  result: 'won' | 'lost' | 'abandoned';
  time: number;
  mistakes: number;
  usedHint: boolean;
}

interface State {
  screen: Screen;
  setScreen: (screen: Screen) => void;

  // Settings
  defaultDifficulty: Difficulty;
  themeIntensity: ThemeIntensity;
  pencilModeDefault: boolean;
  setDefaultDifficulty: (d: Difficulty) => void;
  setThemeIntensity: (t: ThemeIntensity) => void;
  setPencilModeDefault: (v: boolean) => void;

  // Game State
  puzzle: number[]; // 81 length
  solution: number[];
  userEntries: number[]; // 0 means empty
  pencilMarks: Set<number>[]; // array of Sets
  givens: boolean[]; // true if initial cell
  selectedCell: number | null;
  mistakes: number;
  usedHint: boolean;
  timer: number;
  isPaused: boolean;
  difficulty: Difficulty;
  gameState: 'idle' | 'playing' | 'won' | 'lost' | 'abandoned';

  // Game Actions
  startGame: (difficulty?: Difficulty) => void;
  selectCell: (index: number | null) => void;
  clearSelection: () => void;
  placeNumber: (num: number, isPencil: boolean) => void;
  removeNumber: () => void;
  useHint: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  tickTimer: () => void;
  abandonGame: () => void;
  endGame: (result: 'won' | 'lost' | 'abandoned') => void;

  // History & Leaderboard
  history: GameHistoryEntry[];
  leaderboard: Record<Difficulty, number | null>;
  clearHistory: () => void;
  resetLeaderboard: () => void;
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      screen: 'menu',
      setScreen: (screen) => set({ screen }),

      // Settings
      defaultDifficulty: 'easy',
      themeIntensity: 'ultra',
      pencilModeDefault: false,
      setDefaultDifficulty: (defaultDifficulty) => set({ defaultDifficulty }),
      setThemeIntensity: (themeIntensity) => set({ themeIntensity }),
      setPencilModeDefault: (pencilModeDefault) => set({ pencilModeDefault }),

      // Game State
      puzzle: Array(81).fill(0),
      solution: Array(81).fill(0),
      userEntries: Array(81).fill(0),
      pencilMarks: Array.from({ length: 81 }, () => new Set<number>()),
      givens: Array(81).fill(false),
      selectedCell: null,
      mistakes: 0,
      usedHint: false,
      timer: 0,
      isPaused: false,
      difficulty: 'easy',
      gameState: 'idle',

      startGame: (diff) => {
        const d = diff || get().defaultDifficulty;
        const { puzzle, solution } = generateSudoku(d);
        const givens = puzzle.map((p) => p !== 0);
        
        set({
          screen: 'game',
          puzzle,
          solution,
          userEntries: [...puzzle],
          pencilMarks: Array.from({ length: 81 }, () => new Set<number>()),
          givens,
          selectedCell: null,
          mistakes: 0,
          usedHint: false,
          timer: 0,
          isPaused: false,
          difficulty: d,
          gameState: 'playing',
        });
      },

      selectCell: (index) => set({ selectedCell: index }),
      clearSelection: () => set({ selectedCell: null }),

      placeNumber: (num, isPencil) => {
        const state = get();
        if (state.gameState !== 'playing' || state.isPaused || state.selectedCell === null) return;
        
        const i = state.selectedCell;
        if (state.givens[i]) return; // Cannot edit givens

        if (isPencil) {
          // Toggle pencil mark
          const newMarks = [...state.pencilMarks];
          const cellMarks = new Set(newMarks[i]);
          if (cellMarks.has(num)) {
            cellMarks.delete(num);
          } else {
            cellMarks.add(num);
          }
          newMarks[i] = cellMarks;
          set({ pencilMarks: newMarks });
        } else {
          // Both correct and incorrect go into userEntries
          const correct = state.solution[i] === num;
          const newEntries = [...state.userEntries];
          newEntries[i] = num;
          
          if (correct) {
            // Auto-clear pencil marks in same row, col, box
            const newMarks = [...state.pencilMarks];
            const row = Math.floor(i / 9);
            const col = i % 9;
            const boxRow = Math.floor(row / 3) * 3;
            const boxCol = Math.floor(col / 3) * 3;
            
            for(let k=0; k<81; k++) {
              const r = Math.floor(k / 9);
              const c = k % 9;
              const inSameGroup = r === row || c === col || (r >= boxRow && r < boxRow + 3 && c >= boxCol && c < boxCol + 3);
              if (inSameGroup && newMarks[k].has(num)) {
                const updatedSet = new Set(newMarks[k]);
                updatedSet.delete(num);
                newMarks[k] = updatedSet;
              }
            }
            
            set({ userEntries: newEntries, pencilMarks: newMarks });

            // Check win
            // It only counts as win if all entries match solution
            const isWin = newEntries.every((e, idx) => state.puzzle[idx] !== 0 || e === state.solution[idx]);
            if (isWin) {
              get().endGame('won');
            }
          } else {
            // Mistake
            set({ userEntries: newEntries });
            const newMistakes = state.mistakes + 1;
            set({ mistakes: newMistakes });
            if (newMistakes >= 3) {
              get().endGame('lost');
            }
          }
        }
      },

      removeNumber: () => {
        const state = get();
        if (state.gameState !== 'playing' || state.isPaused || state.selectedCell === null) return;
        const i = state.selectedCell;
        if (state.givens[i]) return;
        
        const newEntries = [...state.userEntries];
        newEntries[i] = 0;
        set({ userEntries: newEntries });
      },

      useHint: () => {
        const state = get();
        if (state.gameState !== 'playing' || state.isPaused || state.usedHint || state.selectedCell === null) return;
        const i = state.selectedCell;
        if (state.userEntries[i]) return; // already solved

        const num = state.solution[i];
        set({ usedHint: true });
        
        // Use standard path for placing the correct number
        get().placeNumber(num, false);
      },

      pauseGame: () => {
        if (get().gameState === 'playing') set({ isPaused: true });
      },

      resumeGame: () => {
        if (get().gameState === 'playing') set({ isPaused: false });
      },

      tickTimer: () => {
        if (get().gameState === 'playing' && !get().isPaused) {
          set((state) => ({ timer: state.timer + 1 }));
        }
      },

      abandonGame: () => {
        get().endGame('abandoned');
      },

      endGame: (result) => {
        const state = get();
        const historyEntry: GameHistoryEntry = {
          id: Date.now().toString(),
          date: Date.now(),
          difficulty: state.difficulty,
          result,
          time: state.timer,
          mistakes: state.mistakes,
          usedHint: state.usedHint,
        };

        const newHistory = [historyEntry, ...state.history];
        
        let newLeaderboard = { ...state.leaderboard };
        if (result === 'won') {
          const currentBest = newLeaderboard[state.difficulty];
          if (currentBest === null || state.timer < currentBest) {
            newLeaderboard[state.difficulty] = state.timer;
          }
        }

        set({
          gameState: result,
          history: newHistory,
          leaderboard: newLeaderboard,
        });
      },

      // History & Leaderboard
      history: [],
      leaderboard: { easy: null, medium: null, hard: null },
      clearHistory: () => set({ history: [] }),
      resetLeaderboard: () => set({ leaderboard: { easy: null, medium: null, hard: null } }),
    }),
    {
      name: 'imperium-storage',
      // Ensure sets are converted for JSON appropriately if needed, 
      // but sets don't serialize natively. Let's fix Pencil marks storage.
      // Actually, persistence should probably ignore active game state, or serialize it properly.
      partialize: (state) => ({
        // We only persist non-active game stuff for a clean start,
        // or we fully serialize. To keep it simple & bug-free, persist only history and settings
        defaultDifficulty: state.defaultDifficulty,
        themeIntensity: state.themeIntensity,
        pencilModeDefault: state.pencilModeDefault,
        history: state.history,
        leaderboard: state.leaderboard,
      }),
    }
  )
);
