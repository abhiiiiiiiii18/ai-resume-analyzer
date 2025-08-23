import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Enhanced gradient classes with more dynamic colors
  const gradientClass = score > 69
    ? 'from-emerald-50 via-green-50 to-white'
    : score > 49
      ? 'from-amber-50 via-yellow-50 to-white'
      : 'from-rose-50 via-red-50 to-white';

  // Enhanced border colors for visual appeal
  const borderClass = score > 69
    ? 'border-emerald-200 shadow-emerald-100'
    : score > 49
      ? 'border-amber-200 shadow-amber-100'
      : 'border-rose-200 shadow-rose-100';

  // Dynamic icon sources with fallback
  const iconSrc = score > 69
    ? '/icons/ats-good.svg'
    : score > 49
      ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';

  // Enhanced subtitles with motivational messaging
  const subtitle = score > 69
    ? '🎉 Excellent Performance!'
    : score > 49
      ? '⚡ Good Foundation'
      : '🚀 Room for Growth';

  const description = score > 69
    ? 'Your resume is well-optimized and should perform excellently in most ATS systems. Great job!'
    : score > 49
      ? 'Your resume shows promise but could benefit from some strategic improvements to boost ATS compatibility.'
      : 'Your resume needs attention to improve its chances of passing through ATS filters successfully.';

  return (
    <div className={`relative bg-gradient-to-br ${gradientClass} rounded-3xl border ${borderClass} shadow-xl w-full p-8 overflow-hidden transform hover:scale-[1.02] transition-all duration-300`}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Top section with enhanced visual hierarchy */}
      <div className="relative z-10 flex items-center gap-6 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-30"></div>
          <div className="relative bg-white rounded-2xl p-3 shadow-lg">
            <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-1">
            ATS Score
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-extrabold text-gray-900">{score}</span>
            <span className="text-xl text-gray-500 font-medium">/100</span>
          </div>
        </div>
      </div>

      {/* Enhanced description section */}
      <div className="relative z-10 mb-8">
        <h3 className="text-2xl font-semibold mb-3 text-gray-800">{subtitle}</h3>
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          {description}
        </p>

        {/* Enhanced suggestions grid */}
        <div className="grid gap-4">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className={`group flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                suggestion.type === "good" 
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300" 
                  : "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 hover:border-amber-300"
              }`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                suggestion.type === "good" ? "bg-green-100" : "bg-amber-100"
              }`}>
                <img
                  src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                  alt={suggestion.type === "good" ? "Check" : "Warning"}
                  className="w-5 h-5"
                />
              </div>
              <p className={`text-lg font-medium group-hover:scale-105 transition-transform duration-200 ${
                suggestion.type === "good" ? "text-green-800" : "text-amber-800"
              }`}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced motivational footer */}
      <div className="relative z-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">💡</span>
          </div>
          <h4 className="text-lg font-semibold text-gray-800">Pro Tip</h4>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Keep refining your resume based on these insights. Each improvement brings you closer to landing your dream job!
        </p>
      </div>
    </div>
  )
}

export default ATS