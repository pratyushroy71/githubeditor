export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'orbitron': ['Orbitron', 'monospace'],
      },
      colors: {
        'retro': {
          'green': '#00ff41',
          'amber': '#ffb000',
          'cyan': '#00ffff',
          'magenta': '#ff00ff',
          'purple': '#8A2BE2',
          'blue': '#0080ff',
          'dark': '#0a0a0a',
          'darker': '#050505',
          'gray': '#1a1a1a',
          'light': '#333333',
        },
        'neon': {
          'green': '#39ff14',
          'pink': '#ff1744',
          'blue': '#00e5ff',
          'purple': '#d500f9',
          'orange': '#ff9100',
        }
      },
      animation: {
        'scanline': 'scanline 2s linear infinite',
        'flicker': 'flicker 0.15s infinite linear alternate',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'blink': 'blink 1s infinite',
        'matrix': 'matrix 20s linear infinite',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        glow: {
          'from': { textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor' },
          'to': { textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' }
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' }
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'pulse-neon': {
          '0%, 100%': { 
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, inset 0 0 5px currentColor'
          },
          '50%': { 
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, inset 0 0 10px currentColor'
          }
        }
      },
      backgroundImage: {
        'crt': 'linear-gradient(90deg, transparent 98%, rgba(0,255,65,0.03) 100%), linear-gradient(180deg, transparent 98%, rgba(0,255,65,0.03) 100%)',
        'retro-gradient': 'linear-gradient(45deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      }
    },
  },
  plugins: [],
};
