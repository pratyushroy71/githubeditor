import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Play, Loader, AlertCircle, CheckCircle } from 'lucide-react';

interface GitHubInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  error: string | null;
}

const GitHubInput: React.FC<GitHubInputProps> = ({ onSubmit, isLoading, error }) => {
  const [url, setUrl] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onSubmit(url.trim());
    }
  };

  const isValidGitHubUrl = (url: string) => {
    return /^https:\/\/github\.com\/[\w-]+\/[\w.-]+$/.test(url);
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-retro-gray/50 border border-retro-green/30 p-8 backdrop-blur-sm neon-border">
        <motion.div
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-orbitron font-bold text-retro-green mb-4 animate-glow">
            GITHUB PROJECT EXECUTOR
          </h2>
          <p className="text-retro-amber font-mono">
            Paste any public GitHub repository URL to run it instantly in our cloud environment
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <motion.div
              className={`relative border-2 transition-all duration-300 ${
                focused ? 'border-neon-blue shadow-lg shadow-neon-blue/20' : 'border-retro-green/50'
              } ${error ? 'border-red-500' : ''}`}
              animate={focused ? { scale: 1.01 } : { scale: 1 }}
            >
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <Github className="w-5 h-5 text-retro-amber" />
              </div>
              
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="https://github.com/username/repository"
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-4 bg-retro-dark/80 text-retro-green font-mono placeholder-retro-green/50 focus:outline-none disabled:opacity-50"
              />

              <AnimatePresence>
                {url && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    {isValidGitHubUrl(url) ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 text-red-400 font-mono text-sm flex items-center space-x-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            disabled={!url.trim() || isLoading || !isValidGitHubUrl(url)}
            className="w-full bg-gradient-to-r from-retro-green to-neon-blue text-retro-dark font-orbitron font-bold py-4 px-8 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/30 relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-retro-green transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            
            <div className="relative flex items-center justify-center space-x-3">
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>INITIALIZING...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>EXECUTE PROJECT</span>
                </>
              )}
            </div>
          </motion.button>
        </form>

        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { icon: '⚡', text: 'Instant Setup' },
            { icon: '🔒', text: 'Secure Sandbox' },
            { icon: '🚀', text: 'No Downloads' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-4 border border-retro-green/20 bg-retro-dark/30"
              whileHover={{ scale: 1.05, borderColor: 'rgb(57, 255, 20)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <div className="text-retro-amber font-mono text-sm">{feature.text}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GitHubInput;
