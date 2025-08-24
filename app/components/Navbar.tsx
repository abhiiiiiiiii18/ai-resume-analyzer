import {Link} from "react-router";
import { useState, useEffect } from "react";

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
                ? 'bg-white/95 backdrop-blur-xl shadow-xl py-4' 
                : 'bg-transparent py-6'
        }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Enhanced logo */}
                <Link to="/" className="group relative">
                    <div className="relative">
                        {/* Animated background glow */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
                        
                        {/* Logo text */}
                        <div className="relative flex items-center gap-2 p-3 rounded-2xl transition-all duration-300 group-hover:bg-white/10">
                            {/* Logo icon */}
                            <div className="relative">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                    <span className="text-white font-bold text-sm">R</span>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
                            </div>
                            
                            {/* Enhanced text with gradient */}
                            <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-300">
                                RESUMIND
                            </h1>
                        </div>
                    </div>
                </Link>

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
                    <div className="relative px-8 py-4 bg-white rounded-2xl m-0.5 transition-all duration-300 group-hover:bg-transparent group-hover:text-white">
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
                            
                            <span className="font-bold text-lg transition-all duration-300 text-gray-900 group-hover:text-white">
                                Upload Resume
                            </span>
                        </div>
                    </div>

                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-active:opacity-30 group-active:bg-white transition-all duration-150"></div>
                </Link>
            </div>

            {/* Mobile-responsive navigation indicator */}
            <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent transition-opacity duration-500 ${
                scrolled ? 'opacity-100' : 'opacity-0'
            }`}></div>
        </nav>
    )
}

export default Navbar