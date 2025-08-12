import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MatrixRain from './components/MatrixRain';
import Terminal from './components/Terminal';
import Header from './components/Header';
import GitHubInput from './components/GitHubInput';
import LoadingScreen from './components/LoadingScreen';
import ProjectViewer from './components/ProjectViewer';
import { useGitHubRepo } from './hooks/useGitHubRepo';

function App() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [showMainApp, setShowMainApp] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [currentRepoUrl, setCurrentRepoUrl] = useState('');
  
  const { fetchRepo, resetRepo, isLoading, error, repoData } = useGitHubRepo();

  const handleTerminalComplete = () => {
    setShowTerminal(false);
    setTimeout(() => setShowMainApp(true), 500);
  };

  const handleSubmitRepo = async (url: string) => {
    setCurrentRepoUrl(url);
    setShowLoadingScreen(true);
    await fetchRepo(url);
  };

  const handleLoadingComplete = () => {
    setShowLoadingScreen(false);
  };

  const handleCloseProject = () => {
    resetRepo();
    setCurrentRepoUrl('');
  };

  return (
    <div className="min-h-screen bg-retro-darker text-retro-green crt-screen relative overflow-hidden">
      <MatrixRain />
      
      <AnimatePresence>
        {showTerminal && (
          <Terminal isVisible={showTerminal} onComplete={handleTerminalComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLoadingScreen && (
          <LoadingScreen
            isVisible={showLoadingScreen}
            onComplete={handleLoadingComplete}
            repoUrl={currentRepoUrl}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {repoData && (
          <ProjectViewer repoData={repoData} onClose={handleCloseProject} />
        )}
      </AnimatePresence>

      {showMainApp && !repoData && (
        <div className="relative z-10">
          <Header />
          
          <main className="min-h-screen flex items-center justify-center p-4">
            <GitHubInput
              onSubmit={handleSubmitRepo}
              isLoading={isLoading}
              error={error}
            />
          </main>

          {/* Background decorative elements */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-retro-green/10 rotate-45 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-neon-blue/10 rotate-12 animate-pulse"></div>
            <div className="absolute top-3/4 left-1/2 w-32 h-32 border border-retro-amber/10 rotate-90 animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
