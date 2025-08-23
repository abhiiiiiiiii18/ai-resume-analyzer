// app/components/DarkModeToggle.tsx - Alternative version with inline theme logic
import { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check localStorage first
      const stored = localStorage.getItem("resumind-theme");
      if (stored) {
        const isDark = stored === "dark";
        setIsDarkMode(isDark);
        updateDocumentTheme(isDark);
      } else {
        // Fall back to system preference
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const isDark = mediaQuery.matches;
        setIsDarkMode(isDark);
        updateDocumentTheme(isDark);
        saveThemeToStorage(isDark);
      }
    }
  }, []);

  const updateDocumentTheme = (isDark: boolean) => {
    if (typeof document !== "undefined") {
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const saveThemeToStorage = (isDark: boolean) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("resumind-theme", isDark ? "dark" : "light");
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    updateDocumentTheme(newTheme);
    saveThemeToStorage(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun icon for light mode */}
      <svg
        className={`h-5 w-5 text-yellow-500 transition-all duration-300 ${
          isDarkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      
      {/* Moon icon for dark mode */}
      <svg
        className={`absolute h-5 w-5 text-slate-400 transition-all duration-300 ${
          isDarkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
};

export default DarkModeToggle;