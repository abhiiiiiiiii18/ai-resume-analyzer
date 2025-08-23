import { useEffect, useState } from "react";

const ScoreCircle = ({ score = 75 }: { score: number }) => {
    const [animatedScore, setAnimatedScore] = useState(0);
    const [animatedProgress, setAnimatedProgress] = useState(0);
    
    const radius = 40;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;

    // Animate both score and progress
    useEffect(() => {
        const duration = 1500;
        const steps = 60;
        const scoreIncrement = score / steps;
        const progressIncrement = (score / 100) / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const newScore = Math.min(Math.floor(scoreIncrement * currentStep), score);
            const newProgress = Math.min(progressIncrement * currentStep, score / 100);
            
            setAnimatedScore(newScore);
            setAnimatedProgress(newProgress);
            
            if (currentStep >= steps) {
                clearInterval(timer);
                setAnimatedScore(score);
                setAnimatedProgress(score / 100);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [score]);

    const strokeDashoffset = circumference * (1 - animatedProgress);

    const getGradientColors = (score: number) => {
        if (score >= 80) return { start: "#10b981", end: "#34d399" }; // emerald
        if (score >= 60) return { start: "#3b82f6", end: "#60a5fa" }; // blue
        if (score >= 40) return { start: "#f59e0b", end: "#fbbf24" }; // amber
        return { start: "#ef4444", end: "#f87171" }; // rose
    };

    const colors = getGradientColors(score);

    const getPerformanceIcon = (score: number) => {
        if (score >= 80) return "🏆";
        if (score >= 60) return "📈";
        if (score >= 40) return "⚡";
        return "🎯";
    };

    return (
        <div className="relative w-[120px] h-[120px] group">
            {/* Outer glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 scale-110 blur-md group-hover:opacity-40 transition-opacity duration-500"></div>
            
            <svg
                height="100%"
                width="100%"
                viewBox="0 0 100 100"
                className="transform -rotate-90 drop-shadow-lg"
            >
                <defs>
                    <linearGradient id={`grad-${score}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={colors.start} />
                        <stop offset="100%" stopColor={colors.end} />
                    </linearGradient>
                    
                    {/* Glow filter */}
                    <filter id="circleGlow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Background circle with subtle gradient */}
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke="#f1f5f9"
                    strokeWidth={stroke + 2}
                    fill="transparent"
                />
                
                {/* Inner background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke="#e2e8f0"
                    strokeWidth={stroke}
                    fill="transparent"
                />

                {/* Progress circle with animation */}
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke={`url(#grad-${score})`}
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    filter="url(#circleGlow)"
                    className="transition-all duration-1000 ease-out"
                />

                {/* Animated dot at the end of progress */}
                {animatedProgress > 0.1 && (
                    <circle
                        cx={50 + normalizedRadius * Math.cos(2 * Math.PI * animatedProgress - Math.PI / 2)}
                        cy={50 + normalizedRadius * Math.sin(2 * Math.PI * animatedProgress - Math.PI / 2)}
                        r="4"
                        fill="white"
                        stroke={colors.end}
                        strokeWidth="2"
                        className="animate-pulse drop-shadow-md"
                    />
                )}
            </svg>

            {/* Enhanced center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center">
                    <div className="text-2xl mb-1">{getPerformanceIcon(score)}</div>
                    <div className="font-bold text-lg text-gray-800">
                        {animatedScore}
                        <span className="text-sm text-gray-500 ml-1">/100</span>
                    </div>
                    
                    {/* Performance indicator dots */}
                    <div className="flex items-center gap-1 mt-2">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 delay-${i * 200} ${
                                    i < Math.floor(animatedScore / 34)
                                        ? animatedScore >= 80 ? 'bg-emerald-400' :
                                          animatedScore >= 60 ? 'bg-blue-400' :
                                          animatedScore >= 40 ? 'bg-amber-400' : 'bg-rose-400'
                                        : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 pointer-events-none"></div>
        </div>
    );
};

export default ScoreCircle;