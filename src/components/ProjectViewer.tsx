import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, File, Eye, Code, Play, Settings, X, 
  Monitor, Terminal as TerminalIcon, Maximize2, 
  Minimize2, RotateCcw, ExternalLink 
} from 'lucide-react';

interface ProjectViewerProps {
  repoData: {
    name: string;
    description: string;
    language: string;
    stars: number;
    files: Array<{ name: string; type: 'file' | 'folder'; content?: string }>;
    url: string;
  };
  onClose: () => void;
}

const ProjectViewer: React.FC<ProjectViewerProps> = ({ repoData, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'preview' | 'code' | 'terminal'>('preview');
  const [isRunning, setIsRunning] = useState(false);
  const [buildOutput, setBuildOutput] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const runProject = async () => {
    setIsRunning(true);
    setBuildOutput([]);
    setViewMode('terminal');

    const buildSteps = [
      '$ npm install',
      'Installing dependencies...',
      '✓ Dependencies installed successfully',
      '$ npm run build',
      'Building project...',
      '✓ Build completed successfully',
      '$ npm start',
      'Starting development server...',
      '✓ Server running on http://localhost:3000',
      '✓ Project is now live!'
    ];

    for (let i = 0; i < buildSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 800));
      setBuildOutput(prev => [...prev, buildSteps[i]]);
    }

    // Generate preview URL based on project type
    const projectType = detectProjectType(repoData);
    setPreviewUrl(generatePreviewUrl(projectType, repoData));
    setViewMode('preview');
    setIsRunning(false);
  };

  const detectProjectType = (repo: any) => {
    const name = repo.name.toLowerCase();
    if (name.includes('todo') || name.includes('task')) return 'todo';
    if (name.includes('weather')) return 'weather';
    if (name.includes('calculator')) return 'calculator';
    if (name.includes('portfolio') || name.includes('landing')) return 'portfolio';
    if (name.includes('dashboard')) return 'dashboard';
    if (name.includes('chat') || name.includes('messaging')) return 'chat';
    if (name.includes('ecommerce') || name.includes('shop')) return 'ecommerce';
    return 'generic';
  };

  const generatePreviewUrl = (type: string, repo: any): string => {
    // These would be real project URLs in a production environment
    const previewUrls = {
      todo: 'https://todomvc.com/examples/react/',
      weather: 'https://weatherapp-xi-ten.vercel.app/',
      calculator: 'https://calculator-react-pi.vercel.app/',
      portfolio: 'https://portfolio-template-react.vercel.app/',
      dashboard: 'https://dashboard-react-template.vercel.app/',
      chat: 'https://chat-app-react-socket.vercel.app/',
      ecommerce: 'https://ecommerce-react-demo.vercel.app/',
      generic: 'https://react-starter-template.vercel.app/'
    };
    
    return previewUrls[type as keyof typeof previewUrls] || previewUrls.generic;
  };

  const getFileIcon = (fileName: string, type: 'file' | 'folder') => {
    if (type === 'folder') return <Folder className="w-4 h-4 text-retro-amber" />;
    
    const ext = fileName.split('.').pop()?.toLowerCase();
    const iconColor = {
      'js': 'text-yellow-400',
      'jsx': 'text-blue-400',
      'ts': 'text-blue-500',
      'tsx': 'text-blue-600',
      'css': 'text-green-400',
      'html': 'text-orange-400',
      'json': 'text-yellow-300',
      'md': 'text-gray-400',
    }[ext || ''] || 'text-retro-green';

    return <File className={`w-4 h-4 ${iconColor}`} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-retro-darker z-50 crt-screen ${isFullscreen ? 'z-[60]' : ''}`}
    >
      <div className="scanline"></div>
      
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between p-4 border-b border-retro-green/30 bg-retro-gray/30"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
        >
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-orbitron font-bold text-retro-green">
              {repoData.name}
            </h1>
            <span className="px-2 py-1 bg-retro-green/20 text-retro-green text-xs font-mono rounded">
              {repoData.language}
            </span>
            <span className="text-retro-amber font-mono text-sm">
              ⭐ {repoData.stars}
            </span>
            {isRunning && (
              <motion.div
                className="flex items-center space-x-2 px-3 py-1 bg-neon-blue/20 text-neon-blue text-xs font-mono rounded"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                <span>RUNNING</span>
              </motion.div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-retro-dark/50 rounded">
              <button
                onClick={() => setViewMode('preview')}
                className={`p-2 font-mono text-sm transition-colors ${
                  viewMode === 'preview' ? 'bg-neon-blue text-retro-dark' : 'text-retro-green/70 hover:text-retro-green'
                }`}
                title="Preview"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('code')}
                className={`p-2 font-mono text-sm transition-colors ${
                  viewMode === 'code' ? 'bg-neon-blue text-retro-dark' : 'text-retro-green/70 hover:text-retro-green'
                }`}
                title="Code Editor"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('terminal')}
                className={`p-2 font-mono text-sm transition-colors ${
                  viewMode === 'terminal' ? 'bg-neon-blue text-retro-dark' : 'text-retro-green/70 hover:text-retro-green'
                }`}
                title="Terminal"
              >
                <TerminalIcon className="w-4 h-4" />
              </button>
            </div>
            
            <motion.button
              onClick={runProject}
              disabled={isRunning}
              className="flex items-center space-x-2 px-4 py-2 bg-neon-blue text-retro-dark font-orbitron font-bold transition-all hover:bg-neon-blue/80 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isRunning ? 1 : 1.05 }}
              whileTap={{ scale: isRunning ? 1 : 0.95 }}
            >
              <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'RUNNING...' : 'RUN PROJECT'}</span>
            </motion.button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-retro-green hover:text-neon-blue transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-retro-green hover:text-red-400 transition-colors"
              title="Close Project"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* File Explorer - Hide in fullscreen preview */}
          {!(isFullscreen && viewMode === 'preview') && (
            <motion.aside
              className="w-80 bg-retro-gray/20 border-r border-retro-green/30 p-4"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-retro-amber font-orbitron font-bold">FILE EXPLORER</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-retro-green rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-retro-green">{repoData.files.length}</span>
                </div>
              </div>
              <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                {repoData.files.map((file, index) => (
                  <motion.button
                    key={file.name}
                    onClick={() => setSelectedFile(file.name)}
                    className={`w-full flex items-center space-x-3 p-2 text-left transition-all hover:bg-retro-green/10 ${
                      selectedFile === file.name ? 'bg-retro-green/20 border-l-2 border-neon-blue' : ''
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    whileHover={{ x: 5 }}
                  >
                    {getFileIcon(file.name, file.type)}
                    <span className="font-mono text-sm text-retro-green truncate">
                      {file.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.aside>
          )}

          {/* Content Area */}
          <motion.main
            className="flex-1 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {/* Preview Mode */}
              {viewMode === 'preview' && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  {previewUrl ? (
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Monitor className="w-5 h-5 text-neon-blue" />
                          <h2 className="text-lg font-orbitron font-bold text-retro-green">
                            LIVE PREVIEW
                          </h2>
                          <div className="flex items-center space-x-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>LIVE</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => window.open(previewUrl, '_blank')}
                            className="flex items-center space-x-1 px-3 py-1 text-xs font-mono text-retro-amber hover:text-neon-blue transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>OPEN</span>
                          </button>
                          <button
                            onClick={() => {
                              setPreviewUrl('');
                              setTimeout(() => setPreviewUrl(generatePreviewUrl(detectProjectType(repoData), repoData)), 100);
                            }}
                            className="flex items-center space-x-1 px-3 py-1 text-xs font-mono text-retro-amber hover:text-neon-blue transition-colors"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>RELOAD</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex-1 bg-white border-2 border-retro-green/30 relative overflow-hidden">
                        <iframe
                          src={previewUrl}
                          className="w-full h-full"
                          title={`${repoData.name} Preview`}
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                        <div className="absolute top-2 right-2 bg-retro-dark/80 px-2 py-1 text-xs font-mono text-retro-green rounded">
                          {detectProjectType(repoData).toUpperCase()} APP
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <Play className="w-24 h-24 text-retro-amber mx-auto mb-6 animate-pulse" />
                        <h3 className="text-2xl font-orbitron font-bold text-retro-green mb-4">
                          READY TO EXECUTE
                        </h3>
                        <p className="text-retro-green/70 font-mono mb-6">
                          Click "RUN PROJECT" to start the application
                        </p>
                        <motion.button
                          onClick={runProject}
                          className="px-6 py-3 bg-gradient-to-r from-retro-green to-neon-blue text-retro-dark font-orbitron font-bold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          START EXECUTION
                        </motion.button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Code Mode */}
              {viewMode === 'code' && (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  {selectedFile ? (
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-mono text-retro-green">{selectedFile}</h2>
                        <div className="flex items-center space-x-2">
                          <Settings className="w-4 h-4 text-retro-amber" />
                          <span className="text-xs font-mono text-retro-amber">EDITOR</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 bg-retro-dark/50 border border-retro-green/30 p-4 overflow-auto">
                        <pre className="font-mono text-sm text-retro-green whitespace-pre-wrap">
                          {repoData.files.find(f => f.name === selectedFile)?.content || 
                           `// ${selectedFile}\n// This file is now editable in the RetroCode environment\n\nconst project = "${repoData.name}";\nconsole.log(\`Welcome to \${project}!\`);`}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <Code className="w-24 h-24 text-retro-amber mx-auto mb-6" />
                        <h2 className="text-2xl font-orbitron font-bold text-retro-green mb-4">
                          CODE EDITOR
                        </h2>
                        <p className="text-retro-amber font-mono">
                          Select a file from the explorer to edit
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Terminal Mode */}
              {viewMode === 'terminal' && (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <TerminalIcon className="w-5 h-5 text-neon-blue" />
                      <h2 className="text-lg font-orbitron font-bold text-retro-green">
                        TERMINAL OUTPUT
                      </h2>
                    </div>
                    <div className="text-xs font-mono text-retro-amber">
                      {repoData.name}@retrocode:~$
                    </div>
                  </div>
                  
                  <div className="h-full bg-retro-dark/80 border border-retro-green/30 p-4 overflow-auto font-mono text-sm">
                    {buildOutput.length === 0 ? (
                      <div className="text-retro-green/50">
                        Waiting for execution...
                        <span className="animate-blink">█</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {buildOutput.map((line, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`${
                              line.startsWith('$') ? 'text-neon-blue' :
                              line.startsWith('✓') ? 'text-green-400' :
                              line.includes('error') || line.includes('Error') ? 'text-red-400' :
                              'text-retro-green'
                            }`}
                          >
                            {line}
                            {index === buildOutput.length - 1 && isRunning && (
                              <span className="animate-blink ml-1">█</span>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        </div>

        {/* Status Bar */}
        <motion.footer
          className="flex items-center justify-between p-2 bg-retro-gray/30 border-t border-retro-green/30 text-xs font-mono"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
        >
          <div className="flex items-center space-x-4">
            <span className={`flex items-center space-x-1 ${isRunning ? 'text-neon-blue' : 'text-retro-green'}`}>
              <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-neon-blue animate-pulse' : 'bg-retro-green'}`}></div>
              <span>STATUS: {isRunning ? 'EXECUTING' : previewUrl ? 'RUNNING' : 'READY'}</span>
            </span>
            <span className="text-retro-amber">FILES: {repoData.files.length}</span>
            <span className="text-retro-green">MODE: {viewMode.toUpperCase()}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-retro-green">CPU: {isRunning ? '85%' : '12%'}</span>
            <span className="text-retro-amber">MEM: {isRunning ? '3.2GB' : '1.1GB'}</span>
            <span className="text-neon-blue">NETWORK: {previewUrl ? 'CONNECTED' : 'IDLE'}</span>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default ProjectViewer;
