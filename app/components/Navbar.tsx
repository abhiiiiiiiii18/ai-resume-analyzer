import {Link} from "react-router";
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
      className="group relative p-3 rounded-2xl transition-all duration-300 hover:bg-white/10 dark:hover:bg-gray-800/50"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Animated background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
      
      {/* Sun icon for light mode */}
      <svg
        className={`relative w-6 h-6 text-yellow-500 transition-all duration-500 ${
          isDarkMode ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      
      {/* Moon icon for dark mode */}
      <svg
        className={`absolute inset-3 w-6 h-6 text-blue-400 transition-all duration-500 ${
          isDarkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* Animated indicator dot */}
      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-blue-400 to-purple-500 opacity-100' 
          : 'bg-gradient-to-r from-yellow-400 to-orange-500 opacity-100'
      }`}></div>
    </button>
  );
};

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    // Add scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled 
                ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl py-4' 
                : 'bg-transparent py-6'
        }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Enhanced logo */}
                <Link to="/" className="group relative">
                    <div className="relative">
                        {/* Animated background glow */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
                        
                        {/* Logo text */}
                        <div className="relative flex items-center gap-2 p-3 rounded-2xl transition-all duration-300 group-hover:bg-white/10 dark:group-hover:bg-gray-800/30">
                            {/* Logo icon */}
                            <div className="relative">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                    <span className="text-white font-bold text-sm">R</span>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
                            </div>
                            
                            {/* Enhanced text with gradient */}
                            <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-300">
                                RESUMIND
                            </h1>
                        </div>
                    </div>
                </Link>

                {/* Right side controls */}
                <div className="flex items-center gap-4">
                    {/* Dark mode toggle */}
                    <DarkModeToggle />

                    {/* Enhanced upload button */}
                    <Link 
                        to="/upload" 
                        className="group relative overflow-hidden"
                    >
                        {/* Button background with animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl transition-all duration-500 group-hover:scale-105"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        
                        {/* Animated glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-50 blur-lg transition-all duration-500"></div>
                        
                        {/* Button content */}
                        <div className="relative px-8 py-4 bg-white dark:bg-gray-800 rounded-2xl m-0.5 transition-all duration-300 group-hover:bg-transparent group-hover:text-white">
                            <div className="flex items-center gap-3">
                                {/* Upload icon */}
                                <div className="relative">
                                    <div className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    
                                    {/* Animated dot */}
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                                </div>
                                
                                <span className="font-bold text-lg transition-all duration-300 text-gray-900 dark:text-gray-100 group-hover:text-white">
                                    Upload Resume
                                </span>
                            </div>
                        </div>

                        {/* Ripple effect */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-active:opacity-30 group-active:bg-white transition-all duration-150"></div>
                    </Link>
                </div>
            </div>

            {/* Mobile-responsive navigation indicator */}
            <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent transition-opacity duration-500 ${
                scrolled ? 'opacity-100' : 'opacity-0'
            }`}></div>
        </nav>
    )
}

export default Navbar