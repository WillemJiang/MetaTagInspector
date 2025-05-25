import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetaTagItemProps {
  tag: {
    name: string;
    content: string;
    status: "good" | "warning" | "error";
    type?: string;
    recommendation?: string;
  };
}

export default function MetaTagItem({ tag }: MetaTagItemProps) {
  const statusConfig = {
    good: {
      bgColor: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-800 dark:text-green-100",
      icon: <CheckCircle className="h-2 w-2 text-green-400" />,
      statusText: "Good",
    },
    warning: {
      bgColor: "bg-amber-100 dark:bg-amber-900",
      textColor: "text-amber-800 dark:text-amber-100",
      icon: <AlertCircle className="h-2 w-2 text-amber-400" />,
      statusText: "Needs Improvement",
    },
    error: {
      bgColor: "bg-red-100 dark:bg-red-900",
      textColor: "text-red-800 dark:text-red-100",
      icon: <XCircle className="h-2 w-2 text-red-400" />,
      statusText: "Missing/Issue",
    },
  };

  const { bgColor, textColor, icon, statusText } = statusConfig[tag.status];

  return (
    <div className="border dark:border-slate-700 rounded-md overflow-hidden">
      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-slate-50 dark:bg-slate-800 border-b dark:border-slate-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div className="flex items-center flex-wrap gap-1">
          <span
            className={cn(
              "flex-shrink-0 inline-block px-1.5 sm:px-2 py-0.5 text-xs font-medium rounded-full mr-1 sm:mr-2 break-all",
              bgColor,
              textColor
            )}
          >
            {tag.name}
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
            {tag.type || "meta"}
          </span>
        </div>
        <div>
          <span
            className={cn(
              "inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium",
              bgColor,
              textColor
            )}
          >
            {icon}
            <span className="ml-1 sm:ml-1.5">{statusText}</span>
          </span>
        </div>
      </div>
      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-slate-800">
        <div className="text-xs sm:text-sm text-slate-900 dark:text-slate-200 whitespace-pre-wrap break-words">
          {tag.content || "No content"}
        </div>
        {tag.recommendation && (
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-2">
            <span className="font-medium">Recommendation:</span>{" "}
            <span>{tag.recommendation}</span>
          </div>
        )}
      </div>
    </div>
  );
}
