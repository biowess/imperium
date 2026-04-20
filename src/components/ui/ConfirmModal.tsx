import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-graphite-900/50 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-imperium-panel p-8 rounded-none shadow-board max-w-[320px] w-full border border-white relative"
          >
            <h2 className="text-xl font-serif text-crimson-800 mb-4 tracking-tight">{title}</h2>
            <p className="text-graphite-700 text-sm mb-8 leading-relaxed">{message}</p>
            
            <div className="flex gap-4">
              <Button onClick={onCancel} variant="ghost" className="flex-1">
                Cancel
              </Button>
              <Button onClick={onConfirm} variant="primary" className="flex-1 bg-crimson-800 hover:bg-crimson-900">
                Confirm
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
