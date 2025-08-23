import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  const getBadgeStyle = (score: number) => {
    if (score > 69) return {
      bg: "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200",
      text: "text-emerald-700",
      icon: "/icons/check.svg"
    };
    if (score > 39) return {
      bg: "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200",
      text: "text-amber-700",
      icon: "/icons/warning.svg"
    };
    return {
      bg: "bg-gradient-to-r from-rose-50 to-red-50 border-rose-200",
      text: "text-rose-700",
      icon: "/icons/warning.svg"
    };
  };

  const style = getBadgeStyle(score);

  return (
      <div className={cn(
          "flex flex-row gap-2 items-center px-4 py-2 rounded-full border-2 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105",
          style.bg
      )}>
        <img
            src={style.icon}
            alt="score"
            className="size-4"
        />
        <p className={cn("text-sm font-bold", style.text)}>
          {score}/100
        </p>
      </div>
  );
};

const CategoryHeader = ({
                          title,
                          categoryScore,
                        }: {
  title: string;
  categoryScore: number;
}) => {
  const getIcon = (title: string, score: number) => {
    const icons = {
      "Tone & Style": score > 69 ? "🎨" : score > 39 ? "✨" : "🎭",
      "Content": score > 69 ? "📝" : score > 39 ? "📄" : "📋",
      "Structure": score > 69 ? "🏗️" : score > 39 ? "🔧" : "⚙️",
      "Skills": score > 69 ? "🎯" : score > 39 ? "⚡" : "🚀"
    };
    return icons[title as keyof typeof icons] || "📊";
  };

  return (
      <div className="flex flex-row gap-4 items-center py-3 px-2">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{getIcon(title, categoryScore)}</div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {title}
          </h3>
        </div>
        <ScoreBadge score={categoryScore} />
      </div>
  );
};

const CategoryContent = ({
                           tips,
                         }: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
      <div className="flex flex-col gap-6 items-center w-full">
        {/* Quick overview grid */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 w-full rounded-2xl p-6 border border-gray-200 shadow-inner">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>📋</span>
            Quick Overview
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tips.map((tip, index) => (
                <div key={index} className="flex flex-row gap-3 items-start p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    tip.type === "good" ? "bg-emerald-100" : "bg-amber-100"
                  }`}>
                    <img
                        src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                        alt="score"
                        className="size-4"
                    />
                  </div>
                  <p className={`text-base font-medium group-hover:scale-105 transition-transform duration-200 ${
                    tip.type === "good" ? "text-emerald-700" : "text-amber-700"
                  }`}>
                    {tip.tip}
                  </p>
                </div>
            ))}
          </div>
        </div>

        {/* Detailed explanations */}
        <div className="flex flex-col gap-5 w-full">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span>💡</span>
            Detailed Insights
          </h4>
          {tips.map((tip, index) => (
              <div
                  key={index + tip.tip}
                  className={cn(
                      "group flex flex-col gap-4 rounded-3xl p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden",
                      tip.type === "good"
                          ? "bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50 border-emerald-200 hover:border-emerald-300"
                          : "bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 border-amber-200 hover:border-amber-300"
                  )}
              >
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 ${
                  tip.type === "good" ? "bg-emerald-200" : "bg-amber-200"
                } rounded-full -translate-y-16 translate-x-16`}></div>
                
                <div className="relative z-10">
                  <div className="flex flex-row gap-4 items-start mb-3">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${
                      tip.type === "good" ? "bg-emerald-100 border border-emerald-200" : "bg-amber-100 border border-amber-200"
                    }`}>
                      <img
                          src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                          alt="score"
                          className="size-6"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className={`text-xl font-bold mb-2 ${
                        tip.type === "good" ? "text-emerald-800" : "text-amber-800"
                      }`}>
                        {tip.tip}
                      </h5>
                      <div className={`h-1 w-16 rounded-full ${
                        tip.type === "good" ? "bg-emerald-300" : "bg-amber-300"
                      }`}></div>
                    </div>
                  </div>
                  
                  <p className={`text-base leading-relaxed ${
                    tip.type === "good" ? "text-emerald-700" : "text-amber-700"
                  }`}>
                    {tip.explanation}
                  </p>

                  {/* Action indicator */}
                  <div className={`inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full text-sm font-medium ${
                    tip.type === "good" 
                      ? "bg-emerald-100 text-emerald-800" 
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      tip.type === "good" ? "bg-emerald-500" : "bg-amber-500"
                    }`}></div>
                    {tip.type === "good" ? "Keep it up!" : "Action needed"}
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  const categories = [
    { id: "tone-style", title: "Tone & Style", data: feedback.toneAndStyle },
    { id: "content", title: "Content", data: feedback.content },
    { id: "structure", title: "Structure", data: feedback.structure },
    { id: "skills", title: "Skills", data: feedback.skills }
  ];

  return (
      <div className="flex flex-col gap-6 w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Detailed Analysis
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Dive deep into each category to understand your strengths and discover opportunities for improvement.
          </p>
        </div>

        <Accordion className="space-y-4" allowMultiple>
          {categories.map((category) => (
            <AccordionItem 
              key={category.id} 
              id={category.id}
              className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <AccordionHeader 
                itemId={category.id}
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
              >
                <CategoryHeader
                    title={category.title}
                    categoryScore={category.data.score}
                />
              </AccordionHeader>
              <AccordionContent 
                itemId={category.id}
                className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-blue-50"
              >
                <div className="p-6">
                  <CategoryContent tips={category.data.tips} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Motivational footer */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center shadow-xl">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <span>🚀</span>
              Ready to Level Up?
            </h3>
            <p className="text-lg opacity-90 leading-relaxed">
              Use these insights to refine your resume and increase your chances of landing your dream job. 
              Remember, every improvement counts towards making a lasting impression on recruiters!
            </p>
          </div>
        </div>
      </div>
  );
};

export default Details;