# GitHub Project Executor

A powerful web-based GitHub repository executor that allows you to run any public GitHub project instantly without local setup.

## 🚀 Features

- **Instant Project Execution**: Paste any GitHub URL and run the project immediately
- **Real Repository Data**: Fetches actual repository information from GitHub API
- **Live Preview**: View projects running in real-time
- **Code Editor**: Browse and view repository files
- **Terminal Simulation**: See build and execution processes
- **No Downloads Required**: Everything runs in the browser
- **Secure Sandbox**: Safe execution environment

## 🎯 How It Works

1. **Paste GitHub URL**: Enter any public GitHub repository URL
2. **Automatic Analysis**: The system fetches repository metadata and file structure
3. **Project Execution**: Runs the project in a simulated development environment
4. **Live Preview**: View the running application in an iframe
5. **Code Inspection**: Browse repository files and view their contents

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom retro theme
- **Animations**: Framer Motion
- **GitHub Integration**: GitHub REST API
- **HTTP Client**: Axios

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd githubeditor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

### Basic Usage

1. **Start the Application**: The app opens with a retro-style terminal animation
2. **Enter GitHub URL**: Paste any public GitHub repository URL (e.g., `https://github.com/facebook/react`)
3. **Execute Project**: Click "EXECUTE PROJECT" to start the repository
4. **View Results**: The project will be analyzed and displayed in the project viewer

### Supported Repository Types

- **Node.js Projects**: Projects with `package.json` files
- **Static HTML**: Projects with `index.html` files
- **React Applications**: React-based projects
- **Vue Applications**: Vue.js projects
- **Any Public Repository**: Works with any public GitHub repository

### Project Viewer Features

- **Preview Mode**: View the running application
- **Code Mode**: Browse repository files and view their contents
- **Terminal Mode**: See build and execution logs
- **File Explorer**: Navigate through repository structure
- **Fullscreen Mode**: Expand the viewer for better visibility

## 🔧 Configuration

### Environment Variables

The application uses the GitHub REST API. For production use, you may want to add:

```env
GITHUB_TOKEN=your_github_personal_access_token
```

### Rate Limiting

The GitHub API has rate limits for unauthenticated requests:
- 60 requests per hour for unauthenticated requests
- 5000 requests per hour for authenticated requests

## 🎨 Customization

### Themes

The application uses a retro/cyberpunk theme with:
- Green terminal-style text
- Neon blue accents
- Retro gray backgrounds
- CRT screen effects

### Styling

Customize the appearance by modifying:
- `src/index.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration
- Component-specific CSS classes

## 🚧 Limitations

- **Public Repositories Only**: Cannot access private repositories
- **Browser Execution**: Projects run in simulated environment, not actual servers
- **File Content**: Only fetches content for important files to avoid rate limiting
- **Preview URLs**: Uses demo URLs for project previews

## 🔮 Future Enhancements

- [ ] Real project execution using Docker containers
- [ ] Support for private repositories with authentication
- [ ] Live collaboration features
- [ ] Project forking and editing capabilities
- [ ] Integration with deployment platforms
- [ ] Real-time project monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub for providing the excellent REST API
- React team for the amazing framework
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/githubeditor/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

**Happy coding! 🎉**