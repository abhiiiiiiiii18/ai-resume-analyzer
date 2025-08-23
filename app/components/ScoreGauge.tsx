import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
    const [pathLength, setPathLength] = useState(0);
    const [animatedScore, setAnimatedScore] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);

    const percentage = score / 100;

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    // Animate score counting
    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const increment = score / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setAnimatedScore(Math.min(Math.floor(increment * currentStep), score));
            
            if (currentStep >= steps) {
                clearInterval(timer);
                setAnimatedScore(score);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [score]);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-emerald-600';
        if (score >= 60) return 'text-blue-600';
        if (score >= 40) return 'text-amber-600';
        return 'text-rose-600';
    };

    const getGradientId = (score: number) => {
        if (score >= 80) return 'excellentGradient';
        if (score >= 60) return 'goodGradient';
        if (score >= 40) return 'averageGradient';
        return 'poorGradient';
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-48 h-24 mb-4">
                <svg viewBox="0 0 120 60" className="w-full h-full drop-shadow-lg">
                    <defs>
                        {/* Excellent gradient (80-100) */}
                        <linearGradient id="excellentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="50%" stopColor="#34d399" />
                            <stop offset="100%" stopColor="#6ee7b7" />
                        </linearGradient>
                        
                        {/* Good gradient (60-79) */}
                        <linearGradient id="goodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="50%" stopColor="#60a5fa" />
                            <stop offset="100%" stopColor="#93c5fd" />
                        </linearGradient>
                        
                        {/* Average gradient (40-59) */}
                        <linearGradient id="averageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="50%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#fcd34d" />
                        </linearGradient>
                        
                        {/* Poor gradient (0-39) */}
                        <linearGradient id="poorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="50%" stopColor="#f87171" />
                            <stop offset="100%" stopColor="#fca5a5" />
                        </linearGradient>

                        {/* Glow effect */}
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Background arc with subtle gradient */}
                    <path
                        d="M15,50 A35,35 0 0,1 105,50"
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth="12"
                        strokeLinecap="round"
                    />

                    {/* Secondary background for depth */}
                    <path
                        d="M15,50 A35,35 0 0,1 105,50"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />

                    {/* Animated foreground arc */}
                    <path
                        ref={pathRef}
                        d="M15,50 A35,35 0 0,1 105,50"
                        fill="none"
                        stroke={`url(#${getGradientId(score)})`}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength * (1 - (animatedScore / 100))}
                        filter="url(#glow)"
                        className="transition-all duration-1000 ease-out"
                    />

                    {/* Animated dots along the arc for visual interest */}
                    {score > 20 && (
                        <circle
                            cx={15 + (90 * percentage)}
                            cy={50 - (35 * Math.sin(Math.PI * percentage))}
                            r="4"
                            fill="white"
                            className="animate-pulse drop-shadow-lg"
                        />
                    )}
                </svg>

                {/* Enhanced score display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
                    <div className={`text-3xl font-bold ${getScoreColor(score)} mb-1 transition-colors duration-1000`}>
                        {animatedScore}
                        <span className="text-lg text-gray-400 ml-1">/100</span>
                    </div>
                    
                    {/* Performance indicator */}
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-1 rounded-full transition-all duration-500 delay-${i * 100} ${
                                    i < Math.floor(score / 20)
                                        ? score >= 80 ? 'bg-emerald-400' :
                                          score >= 60 ? 'bg-blue-400' :
                                          score >= 40 ? 'bg-amber-400' : 'bg-rose-400'
                                        : 'bg-gray-200'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance label with animation */}
            <div className="text-center">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-1000 ${
                    score >= 80 ? 'bg-emerald-100 text-emerald-700' :
                    score >= 60 ? 'bg-blue-100 text-blue-700' :
                    score >= 40 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                }`}>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                        score >= 80 ? 'bg-emerald-500' :
                        score >= 60 ? 'bg-blue-500' :
                        score >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}></div>
                    {score >= 80 ? 'Excellent' :
                     score >= 60 ? 'Good' :
                     score >= 40 ? 'Average' : 'Needs Work'}
                </div>
            </div>
        </div>
    );
};

export default ScoreGauge;