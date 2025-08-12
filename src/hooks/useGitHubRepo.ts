import { useState } from 'react';

interface RepoData {
  name: string;
  description: string;
  language: string;
  stars: number;
  files: Array<{ name: string; type: 'file' | 'folder'; content?: string }>;
  url: string;
}

export const useGitHubRepo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [repoData, setRepoData] = useState<RepoData | null>(null);

  const fetchRepo = async (url: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Extract owner and repo from URL
      const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) {
        throw new Error('Invalid GitHub URL format');
      }

      const [, owner, repo] = match;

      // Simulate API call with more realistic delay
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Enhanced mock repository data with more realistic file structure
      const mockRepoData: RepoData = {
        name: repo,
        description: `${repo} - A modern web application built with React`,
        language: detectLanguage(repo),
        stars: Math.floor(Math.random() * 2000) + 50,
        url: url,
        files: generateFileStructure(repo, owner)
      };

      setRepoData(mockRepoData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repository');
    } finally {
      setIsLoading(false);
    }
  };

  const detectLanguage = (repoName: string): string => {
    const name = repoName.toLowerCase();
    if (name.includes('react') || name.includes('tsx') || name.includes('jsx')) return 'TypeScript';
    if (name.includes('vue')) return 'Vue';
    if (name.includes('angular')) return 'TypeScript';
    if (name.includes('svelte')) return 'Svelte';
    if (name.includes('python') || name.includes('django') || name.includes('flask')) return 'Python';
    if (name.includes('java') || name.includes('spring')) return 'Java';
    if (name.includes('php') || name.includes('laravel')) return 'PHP';
    return 'JavaScript';
  };

  const generateFileStructure = (repo: string, owner: string) => {
    const baseFiles = [
      { name: 'package.json', type: 'file' as const, content: generatePackageJson(repo) },
      { name: 'README.md', type: 'file' as const, content: generateReadme(repo, owner) },
      { name: '.gitignore', type: 'file' as const, content: 'node_modules/\n.env\ndist/\nbuild/' },
      { name: 'src', type: 'folder' as const },
      { name: 'public', type: 'folder' as const },
    ];

    const projectType = repo.toLowerCase();
    
    if (projectType.includes('todo')) {
      return [
        ...baseFiles,
        { name: 'src/App.tsx', type: 'file' as const, content: generateTodoApp() },
        { name: 'src/components/TodoItem.tsx', type: 'file' as const, content: generateTodoItem() },
        { name: 'src/components/TodoList.tsx', type: 'file' as const, content: generateTodoList() },
        { name: 'src/hooks/useTodos.ts', type: 'file' as const, content: generateTodoHook() },
        { name: 'src/styles/App.css', type: 'file' as const, content: generateTodoStyles() },
      ];
    }
    
    if (projectType.includes('weather')) {
      return [
        ...baseFiles,
        { name: 'src/App.tsx', type: 'file' as const, content: generateWeatherApp() },
        { name: 'src/components/WeatherCard.tsx', type: 'file' as const, content: generateWeatherCard() },
        { name: 'src/services/weatherApi.ts', type: 'file' as const, content: generateWeatherApi() },
        { name: 'src/styles/weather.css', type: 'file' as const, content: generateWeatherStyles() },
      ];
    }

    if (projectType.includes('calculator')) {
      return [
        ...baseFiles,
        { name: 'src/App.tsx', type: 'file' as const, content: generateCalculatorApp() },
        { name: 'src/components/Calculator.tsx', type: 'file' as const, content: generateCalculator() },
        { name: 'src/hooks/useCalculator.ts', type: 'file' as const, content: generateCalculatorHook() },
        { name: 'src/styles/calculator.css', type: 'file' as const, content: generateCalculatorStyles() },
      ];
    }

    // Default React app structure
    return [
      ...baseFiles,
      { name: 'src/App.tsx', type: 'file' as const, content: generateDefaultApp(repo) },
      { name: 'src/main.tsx', type: 'file' as const, content: generateMain() },
      { name: 'src/index.css', type: 'file' as const, content: generateDefaultStyles() },
      { name: 'index.html', type: 'file' as const, content: generateIndexHtml(repo) },
      { name: 'vite.config.ts', type: 'file' as const, content: generateViteConfig() },
    ];
  };

  // File content generators
  const generatePackageJson = (repo: string) => `{
  "name": "${repo.toLowerCase()}",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.4"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}`;

  const generateReadme = (repo: string, owner: string) => `# ${repo}

A modern web application built with React and TypeScript.

## Features

- ⚡ Fast and responsive
- 🎨 Beautiful UI
- 📱 Mobile friendly
- 🔧 Easy to customize

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Built With

- React 18
- TypeScript
- Vite
- Framer Motion

## Author

[${owner}](https://github.com/${owner})
`;

  const generateTodoApp = () => `import React from 'react';
import TodoList from './components/TodoList';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo App</h1>
        <p>Stay organized and productive!</p>
      </header>
      <main>
        <TodoList />
      </main>
    </div>
  );
}

export default App;`;

  const generateTodoItem = () => `import React from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.completed ? 'completed' : ''}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;`;

  const generateWeatherApp = () => `import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import './styles/weather.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setWeather({
        city: 'San Francisco',
        temperature: 72,
        condition: 'Sunny',
        humidity: 65,
        windSpeed: 8
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      {loading ? (
        <div className="loading">Loading weather data...</div>
      ) : (
        <WeatherCard weather={weather} />
      )}
    </div>
  );
}

export default App;`;

  const generateDefaultApp = (repo: string) => `import React from 'react';
import { motion } from 'framer-motion';
import './index.css';

function App() {
  return (
    <div className="app">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="app-header"
      >
        <h1>Welcome to ${repo}</h1>
        <p>A modern React application</p>
      </motion.header>
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="app-main"
      >
        <div className="features">
          <div className="feature">
            <h3>⚡ Fast</h3>
            <p>Built with Vite for lightning-fast development</p>
          </div>
          <div className="feature">
            <h3>🎨 Beautiful</h3>
            <p>Modern UI with smooth animations</p>
          </div>
          <div className="feature">
            <h3>📱 Responsive</h3>
            <p>Works perfectly on all devices</p>
          </div>
        </div>
      </motion.main>
    </div>
  );
}

export default App;`;

  const generateDefaultStyles = () => `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  text-align: center;
  padding: 4rem 2rem 2rem;
}

.app-header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feature h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}`;

  // More generators would be added here...
  const generateMain = () => `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;

  const generateIndexHtml = (repo: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${repo}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

  const generateViteConfig = () => `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`;

  // Placeholder generators for other file types
  const generateTodoList = () => "// TodoList component implementation";
  const generateTodoHook = () => "// Custom todo hook implementation";
  const generateTodoStyles = () => "/* Todo app styles */";
  const generateWeatherCard = () => "// WeatherCard component";
  const generateWeatherApi = () => "// Weather API service";
  const generateWeatherStyles = () => "/* Weather app styles */";
  const generateCalculatorApp = () => "// Calculator app implementation";
  const generateCalculator = () => "// Calculator component";
  const generateCalculatorHook = () => "// Calculator hook";
  const generateCalculatorStyles = () => "/* Calculator styles */";

  const resetRepo = () => {
    setRepoData(null);
    setError(null);
  };

  return {
    fetchRepo,
    resetRepo,
    isLoading,
    error,
    repoData
  };
};
