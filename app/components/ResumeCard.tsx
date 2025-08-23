import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'from-emerald-500 to-green-400';
        if (score >= 60) return 'from-blue-500 to-cyan-400';
        if (score >= 40) return 'from-amber-500 to-yellow-400';
        return 'from-rose-500 to-pink-400';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return { text: 'Excellent', icon: '🏆' };
        if (score >= 60) return { text: 'Good', icon: '📈' };
        if (score >= 40) return { text: 'Average', icon: '⚡' };
        return { text: 'Needs Work', icon: '🎯' };
    };

    const scoreInfo = getScoreLabel(feedback.overallScore);

    return (
        <Link 
            to={`/resume/${id}`} 
            className="group block relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated background glow */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${getScoreColor(feedback.overallScore)} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700`}></div>
            
            <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:border-gray-200">
                {/* Enhanced header section */}
                <div className="relative p-6 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 border-b border-gray-100">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full blur-2xl"></div>
                    </div>

                    <div className="relative z-10 flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            {/* Company and job title with enhanced styling */}
                            {companyName && (
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                                    <h2 className="text-xl font-bold text-gray-900 truncate">
                                        {companyName}
                                    </h2>
                                </div>
                            )}
                            
                            {jobTitle && (
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                    <h3 className="text-base text-gray-600 truncate">
                                        {jobTitle}
                                    </h3>
                                </div>
                            )}
                            
                            {!companyName && !jobTitle && (
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                                    <h2 className="text-xl font-bold text-gray-900">Resume Analysis</h2>
                                </div>
                            )}

                            {/* Score preview badge */}
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${getScoreColor(feedback.overallScore)} text-white shadow-lg`}>
                                <span>{scoreInfo.icon}</span>
                                <span>{scoreInfo.text}</span>
                            </div>
                        </div>
                        
                        {/* Enhanced score circle */}
                        <div className="flex-shrink-0 relative">
                            <div className={`absolute -inset-2 bg-gradient-to-r ${getScoreColor(feedback.overallScore)} rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500`}></div>
                            <div className="relative">
                                <ScoreCircle score={feedback.overallScore} />
                            </div>
                        </div>
                    </div>

                    {/* Action hint */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
                
                {/* Enhanced resume preview section */}
                {resumeUrl && (
                    <div className="relative">
                        {/* Loading skeleton */}
                        {!imageLoaded && (
                            <div className="w-full h-[350px] max-sm:h-[200px] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
                                <div className="text-gray-400">
                                    <svg className="w-12 h-12 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        {/* Gradient border effect */}
                        <div className={`relative p-1 bg-gradient-to-r ${getScoreColor(feedback.overallScore)} rounded-b-3xl transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="bg-white rounded-b-3xl overflow-hidden">
                                <div className="relative group/image overflow-hidden">
                                    <img
                                        src={resumeUrl}
                                        alt="resume preview"
                                        className="w-full h-[350px] max-sm:h-[200px] object-cover object-top transition-all duration-700 group-hover/image:scale-105"
                                        onLoad={() => setImageLoaded(true)}
                                    />
                                    
                                    {/* Hover overlay with analysis preview */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                                        <div className="p-6 text-white w-full">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                                                <span className="text-sm font-semibold">Analysis Ready</span>
                                            </div>
                                            <p className="text-sm opacity-90">
                                                Click to view detailed feedback and recommendations
                                            </p>
                                        </div>
                                    </div>

                                    {/* Quality indicators */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <div className={`px-2 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm ${
                                            feedback.overallScore >= 80 ? 'text-emerald-600' :
                                            feedback.overallScore >= 60 ? 'text-blue-600' :
                                            feedback.overallScore >= 40 ? 'text-amber-600' : 'text-rose-600'
                                        }`}>
                                            {feedback.overallScore}/100
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bottom action bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm p-4 transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">View Analysis</span>
                        <div className="flex items-center gap-1 text-gray-500">
                            <span>Powered by AI</span>
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ResumeCard