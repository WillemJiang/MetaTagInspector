import { Card } from "@/components/ui/card";
import { Check, AlertTriangle, X, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { calculateScore } from "@/lib/utils";

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

export default function ResultsSummary({
  analyzedUrl,
  metaTagsCount,
  stats,
  onReset,
}: ResultsSummaryProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
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

      <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <Card className="shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="px-3 py-3 sm:px-4 sm:py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 rounded-md p-2 sm:p-3">
                <Check className="h-4 w-4 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-3 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                    Implemented
                  </dt>
                  <dd>
                    <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                      {stats.implemented}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="px-3 py-3 sm:px-4 sm:py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900 rounded-md p-2 sm:p-3">
                <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="ml-3 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                    Improvements
                  </dt>
                  <dd>
                    <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                      {stats.warnings}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="px-3 py-3 sm:px-4 sm:py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 dark:bg-red-900 rounded-md p-2 sm:p-3">
                <X className="h-4 w-4 sm:h-6 sm:w-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-3 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                    Missing
                  </dt>
                  <dd>
                    <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                      {stats.critical}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="px-3 py-3 sm:px-4 sm:py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-md p-2 sm:p-3">
                <Lightbulb className="h-4 w-4 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="ml-3 sm:ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                    Score
                  </dt>
                  <dd>
                    <div className="text-xl sm:text-2xl font-bold text-primary">
                      {calculateScore(stats.implemented, stats.warnings, stats.critical)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
