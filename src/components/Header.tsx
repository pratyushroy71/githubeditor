import React from 'react';
import { motion } from 'framer-motion';
import { Github, Zap, Code } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative border-b border-retro-green/30 bg-retro-dark/80 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <Zap className="w-8 h-8 text-neon-blue animate-pulse-neon" />
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <Code className="w-8 h-8 text-neon-purple opacity-30" />
              </motion.div>
            </div>
            <div>
              <h1 
                className="text-xl font-orbitron font-bold text-retro-green glitch animate-glow"
                data-text="RETROCODE"
              >
                RETROCODE
              </h1>
              <p className="text-xs text-retro-amber">RUNNER v2.0.25</p>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {['FEATURES', 'DOCS', 'ABOUT'].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="text-retro-green hover:text-neon-blue transition-colors duration-300 font-mono text-sm relative group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </nav>

          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Github className="w-5 h-5 text-retro-amber" />
            <span className="text-sm text-retro-amber font-mono">OPEN SOURCE</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
