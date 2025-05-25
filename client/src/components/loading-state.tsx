export default function LoadingState({ url }: { url: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-12 text-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-16 w-16 flex items-center justify-center">
          <svg
            className="animate-spin h-8 w-8 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            Analyzing tags from{" "}
            <span className="font-semibold text-primary">{url}</span>
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            This may take a few moments...
          </p>
        </div>
        <div className="mt-8 w-full max-w-md mx-auto">
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
          </div>
          <div className="mt-3 h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
