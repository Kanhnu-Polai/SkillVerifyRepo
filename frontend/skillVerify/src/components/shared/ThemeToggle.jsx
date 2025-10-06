// src/components/shared/ThemeToggle.jsx
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ className = '' }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`w-10 h-10 flex items-center justify-center 
                 rounded-full border border-gray-300
                 hover:bg-gray-100 dark:hover:bg-gray-700
                 transition ${className}`}
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;