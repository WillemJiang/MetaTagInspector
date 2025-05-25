import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, Loader2, X } from "lucide-react";
import { isValidUrl } from "@/lib/utils";

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export default function UrlInput({ onAnalyze, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleAnalyze = () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    setError("");
    onAnalyze(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAnalyze();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 dark:text-white">Enter a website URL to analyze SEO tags</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Link className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
            </div>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-9 sm:pl-10 pr-9 sm:pr-12 py-2 sm:py-3 text-sm sm:text-base h-10 sm:h-12"
              placeholder="https://example.com"
            />
            {url.length > 0 && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setUrl("")}
                  className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 focus:outline-none"
                  aria-label="Clear input"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            )}
          </div>
          {error && (
            <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
        <Button
          onClick={handleAnalyze}
          disabled={isLoading || url.trim() === ""}
          className="py-2 h-10 sm:h-12 px-4 text-sm sm:text-base whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            "Analyze"
          )}
        </Button>
      </div>
      <div className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        Example: https://www.example.com
      </div>
    </div>
  );
}
