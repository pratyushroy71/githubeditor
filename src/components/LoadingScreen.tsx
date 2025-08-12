import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, GitBranch, Package, Play } from 'lucide-react';

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
  repoUrl: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible, onComplete, repoUrl }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { icon: Download, text: 'Cloning repository...', duration: 2000 },
    { icon: GitBranch, text: 'Analyzing project structure...', duration: 1500 },
    { icon: Package, text: 'Installing dependencies...', duration: 3000 },
    { icon: Play, text: 'Starting development server...', duration: 1000 },
  ];

  useEffect(() => {
    if (!isVisible) return;

    let totalProgress = 0;
    let stepIndex = 0;

    const progressInterval = setInterval(() => {
      if (stepIndex < steps.length) {
        totalProgress += 100 / steps.length / (steps[stepIndex].duration / 50);
        setProgress(Math.min(totalProgress, (stepIndex + 1) * 25));

        if (totalProgress >= (stepIndex + 1) * 25) {
          stepIndex++;
          setCurrentStep(stepIndex);
        }

        if (stepIndex >= steps.length) {
          setTimeout(onComplete, 500);
          clearInterval(progressInterval);
        }
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  const repoName = repoUrl.split('/').pop() || 'repository';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-retro-darker z-50 flex items-center justify-center crt-screen"
    >
      <div className="scanline"></div>
      
      <div className="w-full max-w-4xl mx-auto p-8">
        <motion.div
          className="bg-retro-gray/30 border border-retro-green/50 p-8 backdrop-blur-sm"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.h2
              className="text-2xl font-orbitron font-bold text-retro-green mb-2"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              PROCESSING: {repoName}
            </motion.h2>
            <p className="text-retro-amber font-mono text-sm">
              Setting up your development environment...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm font-mono text-retro-amber mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-retro-dark border border-retro-green/30 h-3 relative overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-retro-green to-neon-blue relative"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{ x: ['0%', '100%'] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <motion.div
                  key={index}
                  className={`flex items-center space-x-4 p-3 border-l-2 transition-all duration-300 ${
                    isActive
                      ? 'border-neon-blue bg-neon-blue/5 text-neon-blue'
                      : isCompleted
                      ? 'border-retro-green bg-retro-green/5 text-retro-green'
                      : 'border-retro-green/30 text-retro-green/50'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    animate={isActive ? { rotate: 360 } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.div>
                  
                  <span className="font-mono flex-1">{step.text}</span>
                  
                  <AnimatePresence>
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-retro-green rounded-full"
                      />
                    )}
                    {isActive && (
                      <motion.div
                        className="w-2 h-2 bg-neon-blue rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Terminal Output Simulation */}
          <div className="mt-8 bg-retro-dark/50 border border-retro-green/30 p-4 max-h-32 overflow-hidden">
            <div className="font-mono text-xs text-retro-green/70 space-y-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                $ git clone {repoUrl}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Cloning into '{repoName}'...
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                $ npm install
              </motion.div>
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
              >
                <span>installing packages...</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  █
                </motion.span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
