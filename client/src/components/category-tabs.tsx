import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import MetaTagItem from "@/components/meta-tag-item";
import { 
  AlignJustify, 
  Link2, 
  MessageSquare, 
  Code, 
  MoreHorizontal, 
  Check, 
  AlertTriangle, 
  X, 
  HelpCircle, 
  Facebook, 
  Twitter, 
  Search, 
  FileJson 
} from "lucide-react";

interface CategoryTabsProps {
  metaTags: {
    general: MetaTag[];
    opengraph: MetaTag[];
    twitter: MetaTag[];
    structured: MetaTag[];
    other: MetaTag[];
  };
}

interface MetaTag {
  name: string;
  content: string;
  status: "good" | "warning" | "error";
  type?: string;
  recommendation?: string;
}

// Helper functions for visual summaries
function getStatusCounts(tags: MetaTag[]) {
  return {
    good: tags.filter(tag => tag.status === "good").length,
    warning: tags.filter(tag => tag.status === "warning").length,
    error: tags.filter(tag => tag.status === "error").length
  };
}

function getCategoryScore(tags: MetaTag[]) {
  if (tags.length === 0) return 0;
  
  const counts = getStatusCounts(tags);
  return Math.round((counts.good * 100 + counts.warning * 50) / (tags.length * 100) * 100);
}

function getHealthStatus(score: number) {
  if (score >= 80) return { text: "Healthy", color: "text-green-500 dark:text-green-400" };
  if (score >= 50) return { text: "Needs Attention", color: "text-amber-500 dark:text-amber-400" };
  return { text: "Critical", color: "text-red-500 dark:text-red-400" };
}

function getCategoryDescription(category: string) {
  switch (category) {
    case "general":
      return "Basic meta tags that help search engines understand your page content.";
    case "opengraph":
      return "Tags that control how your content appears when shared on Facebook and other platforms.";
    case "twitter":
      return "Special meta tags for Twitter that control how your content appears when shared.";
    case "structured":
      return "JSON-LD structured data helps search engines understand your content's context.";
    case "other":
      return "Additional meta tags that may affect your site's appearance or functionality.";
    default:
      return "";
  }
}

// Visual score circle component
function ScoreCircle({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const duration = 1000;
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
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;
  
  // Determine color based on score
  let strokeColor = "#ef4444"; // red
  if (score >= 80) strokeColor = "#10b981"; // green
  else if (score >= 50) strokeColor = "#f59e0b"; // amber
  
  return (
    <div className="relative w-20 h-20">
      {/* Background circle */}
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#e6e6e6"
          strokeWidth="8"
          className="dark:opacity-20"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          {animatedScore}
        </div>
      </div>
    </div>
  );
}

// Category summary component
function CategorySummary({ category, tags }: { category: string, tags: MetaTag[] }) {
  const score = getCategoryScore(tags);
  const healthStatus = getHealthStatus(score);
  const counts = getStatusCounts(tags);
  
  // Category icons mapping
  const getCategoryIcon = () => {
    switch(category) {
      case "general": return <Search className="h-5 w-5 text-blue-500" />;
      case "opengraph": return <Facebook className="h-5 w-5 text-blue-600" />;
      case "twitter": return <Twitter className="h-5 w-5 text-sky-500" />;
      case "structured": return <FileJson className="h-5 w-5 text-emerald-500" />;
      default: return <HelpCircle className="h-5 w-5 text-slate-500" />;
    }
  };
  
  return (
    <Card className="p-4 mb-6 border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <ScoreCircle score={score} />
        
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              {getCategoryIcon()}
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white capitalize">
                {category === "opengraph" ? "Open Graph" : category} Tags
              </h4>
            </div>
            <span className={`text-sm font-medium ${healthStatus.color}`}>
              {healthStatus.text}
            </span>
          </div>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            {getCategoryDescription(category)}
          </p>
          
          <div className="flex justify-center sm:justify-start gap-4">
            <div className="flex items-center gap-1">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">{counts.good}</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-sm">{counts.warning}</span>
            </div>
            <div className="flex items-center gap-1">
              <X className="h-4 w-4 text-red-500" />
              <span className="text-sm">{counts.error}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function CategoryTabs({ metaTags }: CategoryTabsProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
      <Tabs defaultValue="general" className="w-full">
        <div className="border-b border-slate-200 dark:border-slate-700 overflow-x-auto scrollbar-hide">
          <TabsList className="h-auto p-0 bg-transparent flex w-max min-w-full">
            <TabsTrigger 
              value="general" 
              className="data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 dark:data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:text-slate-700 dark:data-[state=inactive]:hover:text-slate-300 data-[state=inactive]:hover:border-slate-300 dark:data-[state=inactive]:hover:border-slate-600 border-b-2 py-2 sm:py-4 px-3 sm:px-4 font-medium text-xs sm:text-sm rounded-none flex items-center"
            >
              <AlignJustify className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden xs:inline">General</span>
              <span className="xs:hidden">Gen</span>
              <Badge className="ml-1 sm:ml-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0 text-xs px-1.5" variant="outline">
                {metaTags.general.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger 
              value="opengraph" 
              className="data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 dark:data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:text-slate-700 dark:data-[state=inactive]:hover:text-slate-300 data-[state=inactive]:hover:border-slate-300 dark:data-[state=inactive]:hover:border-slate-600 border-b-2 py-2 sm:py-4 px-3 sm:px-4 font-medium text-xs sm:text-sm rounded-none flex items-center"
            >
              <Link2 className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden xs:inline">Open Graph</span>
              <span className="xs:hidden">OG</span>
              <Badge className="ml-1 sm:ml-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0 text-xs px-1.5" variant="outline">
                {metaTags.opengraph.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger 
              value="twitter" 
              className="data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 dark:data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:text-slate-700 dark:data-[state=inactive]:hover:text-slate-300 data-[state=inactive]:hover:border-slate-300 dark:data-[state=inactive]:hover:border-slate-600 border-b-2 py-2 sm:py-4 px-3 sm:px-4 font-medium text-xs sm:text-sm rounded-none flex items-center"
            >
              <MessageSquare className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden xs:inline">Twitter Cards</span>
              <span className="xs:hidden">Twitter</span>
              <Badge className="ml-1 sm:ml-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0 text-xs px-1.5" variant="outline">
                {metaTags.twitter.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger 
              value="structured" 
              className="data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 dark:data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:text-slate-700 dark:data-[state=inactive]:hover:text-slate-300 data-[state=inactive]:hover:border-slate-300 dark:data-[state=inactive]:hover:border-slate-600 border-b-2 py-2 sm:py-4 px-3 sm:px-4 font-medium text-xs sm:text-sm rounded-none flex items-center"
            >
              <Code className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden xs:inline">Structured Data</span>
              <span className="xs:hidden">Struct</span>
              <Badge className="ml-1 sm:ml-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0 text-xs px-1.5" variant="outline">
                {metaTags.structured.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger 
              value="other" 
              className="data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 dark:data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:text-slate-700 dark:data-[state=inactive]:hover:text-slate-300 data-[state=inactive]:hover:border-slate-300 dark:data-[state=inactive]:hover:border-slate-600 border-b-2 py-2 sm:py-4 px-3 sm:px-4 font-medium text-xs sm:text-sm rounded-none flex items-center"
            >
              <MoreHorizontal className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden xs:inline">Other Tags</span>
              <span className="xs:hidden">Other</span>
              <Badge className="ml-1 sm:ml-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0 text-xs px-1.5" variant="outline">
                {metaTags.other.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general" className="p-3 sm:p-6">
          <CategorySummary category="general" tags={metaTags.general} />
          <div className="space-y-3 sm:space-y-4">
            {metaTags.general.length > 0 ? (
              metaTags.general.map((tag) => (
                <MetaTagItem key={tag.name} tag={tag} />
              ))
            ) : (
              <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-slate-500 dark:text-slate-400">
                No general meta tags found.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="opengraph" className="p-3 sm:p-6">
          <CategorySummary category="opengraph" tags={metaTags.opengraph} />
          <div className="space-y-3 sm:space-y-4">
            {metaTags.opengraph.length > 0 ? (
              metaTags.opengraph.map((tag) => (
                <MetaTagItem key={tag.name} tag={tag} />
              ))
            ) : (
              <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-slate-500 dark:text-slate-400">
                No Open Graph meta tags found.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="twitter" className="p-3 sm:p-6">
          <CategorySummary category="twitter" tags={metaTags.twitter} />
          <div className="space-y-3 sm:space-y-4">
            {metaTags.twitter.length > 0 ? (
              metaTags.twitter.map((tag) => (
                <MetaTagItem key={tag.name} tag={tag} />
              ))
            ) : (
              <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-slate-500 dark:text-slate-400">
                No Twitter Card meta tags found.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="structured" className="p-3 sm:p-6">
          <CategorySummary category="structured" tags={metaTags.structured} />
          <div className="space-y-3 sm:space-y-4">
            {metaTags.structured.length > 0 ? (
              metaTags.structured.map((tag) => (
                <MetaTagItem key={tag.name} tag={tag} />
              ))
            ) : (
              <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-slate-500 dark:text-slate-400">
                No structured data found.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="other" className="p-3 sm:p-6">
          <CategorySummary category="other" tags={metaTags.other} />
          <div className="space-y-3 sm:space-y-4">
            {metaTags.other.length > 0 ? (
              metaTags.other.map((tag) => (
                <MetaTagItem key={tag.name} tag={tag} />
              ))
            ) : (
              <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-slate-500 dark:text-slate-400">
                No other meta tags found.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
