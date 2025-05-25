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
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Lightbulb, Images } from "lucide-react";

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
          
          {/* Dashboard Tabs for better visualization */}
          <Card className="p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="analysis" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span>SEO Analysis</span>
                </TabsTrigger>
                <TabsTrigger value="previews" className="flex items-center gap-2">
                  <Images className="h-4 w-4" />
                  <span>Social Previews</span>
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>Recommendations</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="analysis">
                <CategoryTabs metaTags={data.metaTags} />
              </TabsContent>
              
              <TabsContent value="previews">
                <PreviewSection preview={data.preview} />
              </TabsContent>
              
              <TabsContent value="recommendations">
                <RecommendationsSection recommendations={data.recommendations} />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      )}
    </main>
  );
}
