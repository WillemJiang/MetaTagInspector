import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import MetaTagItem from "@/components/meta-tag-item";
import { AlignJustify, Link2, MessageSquare, Code, MoreHorizontal } from "lucide-react";

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
          <h3 className="text-base sm:text-lg font-medium text-slate-900 dark:text-white mb-3 sm:mb-4">General Meta Tags</h3>
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
          <h3 className="text-base sm:text-lg font-medium text-slate-900 dark:text-white mb-3 sm:mb-4">Open Graph Meta Tags</h3>
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
          <h3 className="text-base sm:text-lg font-medium text-slate-900 dark:text-white mb-3 sm:mb-4">Twitter Card Meta Tags</h3>
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
          <h3 className="text-base sm:text-lg font-medium text-slate-900 dark:text-white mb-3 sm:mb-4">Structured Data</h3>
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
          <h3 className="text-base sm:text-lg font-medium text-slate-900 dark:text-white mb-3 sm:mb-4">Other Meta Tags</h3>
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
