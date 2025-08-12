import { useState } from 'react';
import axios from 'axios';

interface RepoData {
  name: string;
  description: string;
  language: string;
  stars: number;
  files: Array<{ name: string; type: 'file' | 'folder'; content?: string; path: string }>;
  url: string;
  cloneUrl: string;
  defaultBranch: string;
  owner: string;
}

interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  content?: string;
  encoding?: string;
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

      // Fetch repository metadata
      const repoResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
      const repoInfo = repoResponse.data;

      // Fetch repository contents (files and folders)
      const contentsResponse = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents?ref=${repoInfo.default_branch}`
      );
      const contents = contentsResponse.data;

      // Process files and fetch content for important files
      const files = await processRepositoryContents(contents, owner, repo);

      const realRepoData: RepoData = {
        name: repoInfo.name,
        description: repoInfo.description || `${repoInfo.name} - A GitHub repository`,
        language: repoInfo.language || 'Unknown',
        stars: repoInfo.stargazers_count,
        url: url,
        cloneUrl: repoInfo.clone_url,
        defaultBranch: repoInfo.default_branch,
        owner: owner,
        files: files
      };

      setRepoData(realRepoData);
    } catch (err: any) {
      console.error('Error fetching repository:', err);
      if (err.response?.status === 404) {
        setError('Repository not found or is private');
      } else if (err.response?.status === 403) {
        setError('Rate limit exceeded. Please try again later.');
      } else {
        setError(err.message || 'Failed to fetch repository');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const processRepositoryContents = async (
    contents: GitHubFile[], 
    owner: string, 
    repo: string
  ): Promise<Array<{ name: string; type: 'file' | 'folder'; content?: string; path: string }>> => {
    const processedFiles: Array<{ name: string; type: 'file' | 'folder'; content?: string; path: string }> = [];
    
    for (const item of contents) {
      if (item.type === 'file') {
        // Only fetch content for important files to avoid rate limiting
        const importantFiles = ['package.json', 'README.md', 'index.html', 'App.tsx', 'main.tsx', 'index.js', 'app.js'];
        let content = '';
        
        if (importantFiles.some(file => item.name.toLowerCase().includes(file.toLowerCase()))) {
          try {
            const fileResponse = await axios.get(
              `https://api.github.com/repos/${owner}/${repo}/contents/${item.path}`
            );
            if (fileResponse.data.content && fileResponse.data.encoding === 'base64') {
              content = atob(fileResponse.data.content);
            }
          } catch (err) {
            console.warn(`Failed to fetch content for ${item.path}:`, err);
          }
        }

        processedFiles.push({
          name: item.name,
          type: 'file',
          content,
          path: item.path
        });
      } else if (item.type === 'dir') {
        processedFiles.push({
          name: item.name,
          type: 'folder',
          path: item.path
        });
      }
    }

    return processedFiles;
  };

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
