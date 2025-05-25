import { InfoIcon } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
      <InfoIcon className="mx-auto h-12 w-12 text-slate-400" />
      <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">No website analyzed yet</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Enter a URL above to analyze its SEO meta tags and get improvement recommendations.
      </p>
    </div>
  );
}
