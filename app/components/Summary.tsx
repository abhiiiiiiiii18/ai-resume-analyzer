import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string, score: number }) => {
    const getScoreInfo = (score: number) => {
        if (score > 70) return { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: '🎯' };
        if (score > 49) return { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: '⚡' };
        return { color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', icon: '🚀' };
    };

    const scoreInfo = getScoreInfo(score);

    return (
        <div className={`relative group hover:scale-[1.02] transition-all duration-300 border-l-4 ${scoreInfo.border} ${scoreInfo.bg} rounded-r-2xl p-6 mx-4 mb-4 shadow-sm hover:shadow-lg`}>
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-r-2xl"></div>
            
            <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-2xl">{scoreInfo.icon}</div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                            <ScoreBadge score={score} />
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                                className={`h-full transition-all duration-1000 ease-out rounded-full ${
                                    score > 70 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' :
                                    score > 49 ? 'bg-gradient-to-r from-amber-400 to-amber-600' :
                                    'bg-gradient-to-r from-rose-400 to-rose-600'
                                }`}
                                style={{ width: `${score}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold">
                        <span className={`${scoreInfo.color} transition-colors duration-300`}>{score}</span>
                        <span className="text-gray-400">/100</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    const getOverallMessage = (score: number) => {
        if (score > 80) return { text: "Outstanding resume! You're ready to impress employers.", icon: "🏆", color: "text-emerald-600" };
        if (score > 60) return { text: "Good foundation with room for strategic improvements.", icon: "📈", color: "text-blue-600" };
        if (score > 40) return { text: "Solid start, but several areas need attention.", icon: "🔧", color: "text-amber-600" };
        return { text: "Significant improvements needed to maximize impact.", icon: "🎯", color: "text-rose-600" };
    };

    const overallMessage = getOverallMessage(feedback.overallScore);

    return (
        <div className="bg-white rounded-3xl shadow-xl w-full overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
            {/* Header with enhanced visual appeal */}
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="relative">
                        {/* Animated background circles */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-30 animate-pulse delay-75"></div>
                        <div className="relative z-10">
                            <ScoreGauge score={feedback.overallScore} />
                        </div>
                    </div>

                    <div className="flex-1 text-center lg:text-left">
                        <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
                            <div className="text-3xl">{overallMessage.icon}</div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                Your Resume Score
                            </h2>
                        </div>
                        <p className={`text-lg font-medium ${overallMessage.color} mb-3`}>
                            {overallMessage.text}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            This comprehensive analysis evaluates multiple aspects of your resume to help you stand out from the competition.
                        </p>
                        
                        {/* Score breakdown preview */}
                        <div className="flex items-center gap-4 mt-4 justify-center lg:justify-start">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"></div>
                                <span className="text-sm text-gray-600">Excellent (70+)</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                                <span className="text-sm text-gray-600">Good (50-69)</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-gradient-to-r from-rose-400 to-rose-600 rounded-full"></div>
                                <span className="text-sm text-gray-600">Needs Work (0-49)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category breakdown with enhanced styling */}
            <div className="p-6 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 px-4">Detailed Breakdown</h3>
                
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content Quality" score={feedback.content.score} />
                <Category title="Structure & Format" score={feedback.structure.score} />
                <Category title="Skills & Keywords" score={feedback.skills.score} />
            </div>

            {/* Call-to-action footer */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-t border-gray-100">
                <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Ready to improve your score?</h4>
                    <p className="text-gray-600 mb-4">Check out the detailed analysis below for specific recommendations.</p>
                    <div className="inline-flex items-center gap-2 text-blue-600 font-medium">
                        <span>Scroll down for insights</span>
                        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary