import { Card } from "@/components/ui/card";
import { Check, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { calculateScore } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ResultsSummaryProps {
  analyzedUrl: string;
  metaTagsCount: number;
  stats: {
    implemented: number;
    warnings: number;
    critical: number;
  };
  onReset: () => void;
}

// Function to get score rating text
function getScoreRating(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very Good";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 50) return "Needs Work";
  return "Poor";
}

export default function ResultsSummary({
  analyzedUrl,
  metaTagsCount,
  stats,
  onReset,
}: ResultsSummaryProps) {
  const score = calculateScore(stats.implemented, stats.warnings, stats.critical);
  const rating = getScoreRating(score);
  
  // For animated circular progress
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Animation for score
  useEffect(() => {
    const duration = 1000; // Duration of animation in ms
    const startTime = performance.now();
    
    const animateScore = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      setAnimatedScore(Math.floor(progress * score));
      
      if (progress < 1) {
        requestAnimationFrame(animateScore);
      }
    };
    
    requestAnimationFrame(animateScore);
  }, [score]);
  
  // Calculate the circumference and offset for the SVG circle
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
        <h2 className="text-base sm:text-lg font-semibold dark:text-white break-words">
          Results for{" "}
          <span className="text-primary text-sm sm:text-base">{analyzedUrl}</span>
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-0">
          <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-800 text-xs sm:text-sm">
            {metaTagsCount} meta tags found
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="ml-0 sm:ml-4 text-xs sm:text-sm h-8 px-2 sm:px-3"
          >
            New Analysis
          </Button>
        </div>
      </div>

      <Card className="shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Circular Progress Score */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              {/* Background circle */}
              <svg className="w-full h-full" viewBox="0 0 150 150">
                <circle
                  cx="75"
                  cy="75"
                  r={radius}
                  fill="transparent"
                  stroke="#e6e6e6"
                  strokeWidth="12"
                  className="dark:opacity-20"
                />
                {/* Progress circle */}
                <circle
                  cx="75"
                  cy="75"
                  r={radius}
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  transform="rotate(-90 75 75)"
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-slate-900 dark:text-white">
                    {animatedScore}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-2">
              <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Overall SEO Score
              </div>
              <div className="text-sm font-medium text-primary">
                {rating}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              SEO Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Passed Checks */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                <div className="flex items-center mb-1">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                  <span className="text-xs font-medium text-green-800 dark:text-green-300">Passed Checks</span>
                </div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                  {stats.implemented}
                </div>
              </div>

              {/* Warnings */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                <div className="flex items-center mb-1">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mr-1" />
                  <span className="text-xs font-medium text-amber-800 dark:text-amber-300">Warnings</span>
                </div>
                <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                  {stats.warnings}
                </div>
              </div>

              {/* Failed Checks */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                <div className="flex items-center mb-1">
                  <X className="h-4 w-4 text-red-600 dark:text-red-400 mr-1" />
                  <span className="text-xs font-medium text-red-800 dark:text-red-300">Failed Checks</span>
                </div>
                <div className="text-2xl font-bold text-red-700 dark:text-red-400">
                  {stats.critical}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
