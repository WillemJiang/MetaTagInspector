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
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold dark:text-white">
          Analysis Results for{" "}
          <span className="text-primary">{analyzedUrl}</span>
        </h2>
        <div className="flex items-center">
          <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-800">
            {metaTagsCount} meta tags found
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="ml-4"
          >
            New Analysis
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 rounded-md p-3">
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                    Implemented Correctly
                  </dt>
                  <dd>
                    <div className="text-lg font-semibold text-slate-900 dark:text-white">
                      {stats.implemented}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900 rounded-md p-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                    Needs Improvement
                  </dt>
                  <dd>
                    <div className="text-lg font-semibold text-slate-900 dark:text-white">
                      {stats.warnings}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 dark:bg-red-900 rounded-md p-3">
                <X className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                    Missing Critical
                  </dt>
                  <dd>
                    <div className="text-lg font-semibold text-slate-900 dark:text-white">
                      {stats.critical}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-md p-3">
                <Lightbulb className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                    Overall Score
                  </dt>
                  <dd>
                    <div className="text-lg font-semibold text-slate-900 dark:text-white">
                      {calculateScore(stats.implemented, stats.warnings, stats.critical)}/100
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
