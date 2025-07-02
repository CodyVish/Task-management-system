import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-2 w-4 sm:h-7 sm:w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      style={{
        backgroundColor: isDark ? '#374151' : '#D1D5DB',
      }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="absolute inset-0 rounded-full">
        <Sun 
          className={`absolute left-0.5 sm:left-1.5 top-1/2 transform -translate-y-1/2 w-2 h-2 sm:w-3.5 sm:h-3.5 transition-opacity duration-200 ${
            isDark ? 'opacity-30 text-gray-400' : 'opacity-70 text-yellow-600'
          }`} 
        />
        <Moon 
          className={`absolute right-0.5 sm:right-1.5 top-1/2 transform -translate-y-1/2 w-2 h-2 sm:w-3.5 sm:h-3.5 transition-opacity duration-200 ${
            isDark ? 'opacity-90 text-yellow-300' : 'opacity-30 text-gray-500'
          }`} 
        />
      </div>
      
      <span
        className={`inline-block h-3 w-3 sm:h-5 sm:w-5 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out ${
          isDark ? 'translate-x-3.5 sm:translate-x-6' : 'translate-x-0.5 sm:translate-x-1'
        }`}
        style={{
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      />
    </button>
  );
};

export default ThemeToggle; 