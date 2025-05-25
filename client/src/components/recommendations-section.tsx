import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface Recommendation {
  id: string;
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  example?: string;
}

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
}

export default function RecommendationsSection({
  recommendations,
}: RecommendationsSectionProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-medium text-slate-900 dark:text-white mb-4 sm:mb-6">
        Recommendations
      </h3>

      <div className="space-y-3 sm:space-y-4">
        {recommendations.length > 0 ? (
          recommendations.map((item) => (
            <div
              key={item.id}
              className={`rounded-md border p-3 sm:p-4 ${
                item.priority === "high"
                  ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  : item.priority === "medium"
                  ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                  : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
              }`}
            >
              <div className="flex">
                <div className="flex-shrink-0 pt-0.5">
                  {item.priority === "high" ? (
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 dark:text-red-300" />
                  ) : item.priority === "medium" ? (
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 dark:text-amber-300" />
                  ) : (
                    <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 dark:text-blue-300" />
                  )}
                </div>
                <div className="ml-2 sm:ml-3">
                  <h4
                    className={`text-xs sm:text-sm font-medium ${
                      item.priority === "high"
                        ? "text-red-800 dark:text-red-200"
                        : item.priority === "medium"
                        ? "text-amber-800 dark:text-amber-200"
                        : "text-blue-800 dark:text-blue-200"
                    }`}
                  >
                    {item.title}
                  </h4>
                  <div
                    className={`mt-1 sm:mt-2 text-xs sm:text-sm ${
                      item.priority === "high"
                        ? "text-red-700 dark:text-red-300"
                        : item.priority === "medium"
                        ? "text-amber-700 dark:text-amber-300"
                        : "text-blue-700 dark:text-blue-300"
                    }`}
                  >
                    {item.description}
                  </div>
                  {item.example && (
                    <div className="mt-1.5 sm:mt-2">
                      <div
                        className={`text-xs font-medium ${
                          item.priority === "high"
                            ? "text-red-700 dark:text-red-300"
                            : item.priority === "medium"
                            ? "text-amber-700 dark:text-amber-300"
                            : "text-blue-700 dark:text-blue-300"
                        }`}
                      >
                        Example:
                      </div>
                      <code
                        className={`mt-1 block text-xs font-mono p-1.5 sm:p-2 rounded break-words whitespace-pre-wrap ${
                          item.priority === "high"
                            ? "bg-red-100 dark:bg-red-900/40"
                            : item.priority === "medium"
                            ? "bg-amber-100 dark:bg-amber-900/40"
                            : "bg-blue-100 dark:bg-blue-900/40"
                        }`}
                      >
                        {item.example}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-slate-500 dark:text-slate-400">
            No recommendations available.
          </div>
        )}
      </div>
    </div>
  );
}
