import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import UrlInput from "@/components/url-input";
import EmptyState from "@/components/empty-state";
import LoadingState from "@/components/loading-state";
import ResultsSummary from "@/components/results-summary";
import CategoryTabs from "@/components/category-tabs";
import PreviewSection from "@/components/preview-section";
import RecommendationsSection from "@/components/recommendations-section";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const {
    data,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: [`/api/analyze?url=${encodeURIComponent(url)}`],
    enabled: url !== "",
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const handleAnalyzeUrl = (newUrl: string) => {
    setUrl(newUrl);
    refetch();
  };

  const resetAnalysis = () => {
    setUrl("");
  };

  // Show error toast only when isError changes to true
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error analyzing URL",
        description: (error as Error).message || "Failed to analyze the URL. Please try again.",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UrlInput onAnalyze={handleAnalyzeUrl} isLoading={isLoading} />

      {isLoading && <LoadingState url={url} />}

      {!isLoading && !data && !url && <EmptyState />}

      {!isLoading && data && (
        <div className="space-y-6">
          <ResultsSummary
            analyzedUrl={url}
            metaTagsCount={data.metaTagsCount}
            stats={data.stats}
            onReset={resetAnalysis}
          />

          <CategoryTabs metaTags={data.metaTags} />

          <PreviewSection preview={data.preview} />

          <RecommendationsSection recommendations={data.recommendations} />
        </div>
      )}
    </main>
  );
}
