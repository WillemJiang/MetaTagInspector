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
        <div className="border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
          <TabsList className="h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="general" 
              className="data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 dark:data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:text-slate-700 dark:data-[state=inactive]:hover:text-slate-300 data-[state=inactive]:hover:border-slate-300 dark:data-[state=inactive]:hover:border-slate-600 border-b-2 py-4 px-4 font-medium text-sm rounded-none flex items-center"
            >
              <AlignJustify className="mr-2 h-5 w-5" />
              General
              <Badge className="ml-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0" variant="outline">
                {metaTags.general.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger 
              value="opengraph" 
              className="data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 dark:data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:text-slate-700 dark:data-[state=inactive]:hover:text-slate-300 data-[state=inactive]:hover:border-slate-300 dark:data-[state=inactive]:hover:border-slate-600 border-b-2 py-4 px-4 font-medium text-sm rounded-none flex items-center"
            >
              <Link2 className="mr-2 h-5 w-5" />
              Open Graph
              <Badge className="ml-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0" variant="outline">
                {metaTags.opengraph.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger 
              value="twitter" 
              className="data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 dark:data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:text-slate-700 dark:data-[state=inactive]:hover:text-slate-300 data-[state=inactive]:hover:border-slate-300 dark:data-[state=inactive]:hover:border-slate-600 border-b-2 py-4 px-4 font-medium text-sm rounded-none flex items-center"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Twitter Cards
              <Badge className="ml-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0" variant="outline">
                {metaTags.twitter.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger 
              value="structured" 
              className="data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 dark:data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:text-slate-700 dark:data-[state=inactive]:hover:text-slate-300 data-[state=inactive]:hover:border-slate-300 dark:data-[state=inactive]:hover:border-slate-600 border-b-2 py-4 px-4 font-medium text-sm rounded-none flex items-center"
            >
              <Code className="mr-2 h-5 w-5" />
              Structured Data
              <Badge className="ml-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0" variant="outline">
                {metaTags.structured.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger 
              value="other" 
              className="data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 dark:data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:text-slate-700 dark:data-[state=inactive]:hover:text-slate-300 data-[state=inactive]:hover:border-slate-300 dark:data-[state=inactive]:hover:border-slate-600 border-b-2 py-4 px-4 font-medium text-sm rounded-none flex items-center"
            >
              <MoreHorizontal className="mr-2 h-5 w-5" />
              Other Tags
              <Badge className="ml-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0" variant="outline">
                {metaTags.other.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general" className="p-6">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">General Meta Tags</h3>
          <div className="space-y-4">
            {metaTags.general.length > 0 ? (
              metaTags.general.map((tag) => (
                <MetaTagItem key={tag.name} tag={tag} />
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                No general meta tags found.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="opengraph" className="p-6">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Open Graph Meta Tags</h3>
          <div className="space-y-4">
            {metaTags.opengraph.length > 0 ? (
              metaTags.opengraph.map((tag) => (
                <MetaTagItem key={tag.name} tag={tag} />
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                No Open Graph meta tags found.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="twitter" className="p-6">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Twitter Card Meta Tags</h3>
          <div className="space-y-4">
            {metaTags.twitter.length > 0 ? (
              metaTags.twitter.map((tag) => (
                <MetaTagItem key={tag.name} tag={tag} />
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                No Twitter Card meta tags found.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="structured" className="p-6">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Structured Data</h3>
          <div className="space-y-4">
            {metaTags.structured.length > 0 ? (
              metaTags.structured.map((tag) => (
                <MetaTagItem key={tag.name} tag={tag} />
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                No structured data found.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="other" className="p-6">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Other Meta Tags</h3>
          <div className="space-y-4">
            {metaTags.other.length > 0 ? (
              metaTags.other.map((tag) => (
                <MetaTagItem key={tag.name} tag={tag} />
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                No other meta tags found.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
