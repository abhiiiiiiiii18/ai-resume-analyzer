interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const getBadgeConfig = (score: number) => {
    if (score > 70) {
      return {
        bgGradient: 'bg-gradient-to-r from-emerald-50 to-green-50',
        textColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
        shadowColor: 'shadow-emerald-100',
        text: 'Excellent',
        icon: '🏆',
        pulseColor: 'bg-emerald-400'
      };
    } else if (score > 49) {
      return {
        bgGradient: 'bg-gradient-to-r from-amber-50 to-yellow-50',
        textColor: 'text-amber-700',
        borderColor: 'border-amber-200',
        shadowColor: 'shadow-amber-100',
        text: 'Good Start',
        icon: '⚡',
        pulseColor: 'bg-amber-400'
      };
    } else {
      return {
        bgGradient: 'bg-gradient-to-r from-rose-50 to-red-50',
        textColor: 'text-rose-700',
        borderColor: 'border-rose-200',
        shadowColor: 'shadow-rose-100',
        text: 'Needs Work',
        icon: '🎯',
        pulseColor: 'bg-rose-400'
      };
    }
  };

  const config = getBadgeConfig(score);

  return (
    <div className="relative group">
      {/* Animated glow effect */}
      <div className={`absolute -inset-1 ${config.bgGradient} rounded-full opacity-0 group-hover:opacity-50 blur-lg transition-all duration-500`}></div>
      
      {/* Main badge */}
      <div className={`relative px-4 py-2 rounded-full border-2 ${config.bgGradient} ${config.borderColor} ${config.shadowColor} shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105`}>
        <div className="flex items-center gap-2">
          {/* Animated icon */}
          <div className="relative">
            <span className="text-lg transition-transform duration-300 group-hover:scale-110">
              {config.icon}
            </span>
            {/* Pulse dot */}
            <div className={`absolute -top-1 -right-1 w-2 h-2 ${config.pulseColor} rounded-full animate-pulse opacity-80`}></div>
          </div>
          
          {/* Badge text */}
          <div className="flex flex-col items-center">
            <p className={`text-sm font-bold ${config.textColor} transition-colors duration-300`}>
              {config.text}
            </p>
            {/* Score indicator */}
            <div className="flex items-center gap-1 mt-0.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full transition-all duration-300 delay-${i * 100} ${
                    i < Math.floor(score / 34)
                      ? config.pulseColor
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-10">
        Score: {score}/100
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
};

export default ScoreBadge;