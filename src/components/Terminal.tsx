import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalProps {
  isVisible: boolean;
  onComplete: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ isVisible, onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const bootSequence = [
    'RETROCODE RUNNER v2.0.25',
    'Initializing quantum processors...',
    'Loading retro aesthetics module...',
    'Connecting to GitHub API...',
    'Establishing secure connection...',
    'System ready. Welcome, user.',
    ''
  ];

  useEffect(() => {
    if (!isVisible) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    const typeInterval = setInterval(() => {
      if (currentLine < bootSequence.length - 1) {
        if (currentChar < bootSequence[currentLine].length) {
          setCurrentChar(prev => prev + 1);
        } else {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        }
      } else {
        setTimeout(onComplete, 1000);
      }
    }, 50);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(typeInterval);
    };
  }, [isVisible, currentLine, currentChar, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-retro-darker z-50 flex items-center justify-center crt-screen"
    >
      <div className="scanline"></div>
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="border border-retro-green p-6 bg-retro-dark/50 backdrop-blur-sm">
          <div className="text-retro-green font-mono">
            {bootSequence.slice(0, currentLine + 1).map((line, index) => (
              <div key={index} className="mb-2">
                <span className="text-retro-amber mr-2">&gt;</span>
                {index === currentLine 
                  ? line.substring(0, currentChar)
                  : line
                }
                {index === currentLine && showCursor && (
                  <span className="bg-retro-green text-retro-dark animate-blink">█</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;
