import React, { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store/useStore';

interface SudokuCellProps {
  key?: React.Key;
  index: number;
}

export const SudokuCell = React.memo(({ index }: SudokuCellProps) => {
  // Use precise selectors to prevent Re-renders on timer ticks
  // By passing a shallow getter for primitives, or grabbing the whole array
  // Wait, if we useStore(s => s.puzzle[index]), it only triggers when THAT specific primitive changes.
  const puzzleValue = useStore(s => s.puzzle[index]);
  const userEntryValue = useStore(s => s.userEntries[index]);
  const isGiven = useStore(s => s.givens[index]);
  const marks = useStore(s => s.pencilMarks[index]);
  const solutionValue = useStore(s => s.solution[index]);
  const selectedCell = useStore(s => s.selectedCell);
  
  // To avoid subscribing to the entire arrays which triggers on ANY index change:
  // targetValue computes a specific selected number for highlighting identical numbers across the board
  const targetValue = useStore(s => 
    s.selectedCell !== null ? (s.puzzle[s.selectedCell] !== 0 ? s.puzzle[s.selectedCell] : s.userEntries[s.selectedCell]) : 0
  );
  
  const selectCell = useStore(s => s.selectCell);

  const isSelected = selectedCell === index;
  const value = puzzleValue !== 0 ? puzzleValue : userEntryValue;

  // Derive highlight states
  const row = Math.floor(index / 9);
  const col = index % 9;
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  let isHighlighted = false;
  let isPeer = false;
  let isError = false;

  if (value !== 0 && !isGiven && value !== solutionValue) {
    isError = true;
  }

  if (selectedCell !== null) {
    const sRow = Math.floor(selectedCell / 9);
    const sCol = selectedCell % 9;
    const sBoxRow = Math.floor(sRow / 3) * 3;
    const sBoxCol = Math.floor(sCol / 3) * 3;

    // Check if same row, col, or box
    if (row === sRow || col === sCol || (boxRow === sBoxRow && boxCol === sBoxCol)) {
      isPeer = true;
    }

    // Check if same number
    if (targetValue !== 0 && value === targetValue) {
      isHighlighted = true;
    }
  }

  // Border logic for 3x3 grid
  const borderClasses = useMemo(() => cn(
    "border-solid border-crimson-800/10",
    {
      "border-r-[1px]": col !== 8 && col % 3 !== 2,
      "border-b-[1px]": row !== 8 && row % 3 !== 2,
      "border-r-[2px] border-r-crimson-800/40 z-10": col % 3 === 2 && col !== 8,
      "border-b-[2px] border-b-crimson-800/40 z-10": row % 3 === 2 && row !== 8,
      "shadow-[inset_0_2px_4px_rgba(255,255,255,0.7)]": true, // soft inner glare
    }
  ), [col, row]);

  const handleTap = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    selectCell(index);
  }, [selectCell, index]);

  return (
    <div
      onPointerDown={handleTap}
      className={cn(
        "sudoku-cell relative flex items-center justify-center cursor-pointer select-none text-2xl sm:text-3xl font-serif transition-colors duration-200 active:scale-[0.95]",
        borderClasses,
        {
          "bg-crimson-200/50 shadow-[inset_0_0_12px_rgba(255,255,255,0.8)]": isSelected && !isError, // selected
          "bg-crimson-800 text-white shadow-glow": isSelected && isError,
          "bg-crimson-100/30": !isSelected && isPeer && !isError, // peer
          "bg-gold-400/20 shadow-inset-panel": !isSelected && !isPeer && isHighlighted && !isError, // same number
          "bg-imperium-surface/60": !isSelected && !isPeer && !isHighlighted && !isError, // default
          "bg-crimson-50/80": !isSelected && isError,
          "text-graphite-900 font-semibold drop-shadow-sm": isGiven && !isError,
          "text-crimson-700 font-medium": !isGiven && value !== 0 && !isError,
          "text-white z-20": isError && isSelected,
          "text-crimson-600 font-bold": isError && !isSelected,
        }
      )}
    >
      {/* Foreground Value */}
      <AnimatePresence>
        {value !== 0 && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="z-10 tracking-tighter"
          >
            {value}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Pencil Marks */}
      {value === 0 && marks.size > 0 && (
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-1 pointer-events-none">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div key={num} className="flex items-center justify-center">
              {marks.has(num) && (
                <span className="text-[9px] sm:text-[11px] sm:leading-[11px] leading-[9px] font-sans text-graphite-700/60 font-medium">
                  {num}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Corner highlight for selected */}
      {isSelected && (
        <div className="absolute inset-0 border border-crimson-500 rounded-none pointer-events-none z-20 shadow-[inset_0_0_8px_rgba(246,60,84,0.2)]" />
      )}
    </div>
  );
});
