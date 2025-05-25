import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">About SEO Tag Analyzer</CardTitle>
          <CardDescription>
            A tool to help developers and marketers analyze and improve website SEO tags
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">What is this tool?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              SEO Tag Analyzer is a web application that allows you to analyze the SEO tags of any website. It extracts meta tags, organizes them by category, evaluates their quality, and provides recommendations for improvement.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Key Features</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>Extract and analyze meta tags from any website</li>
              <li>Categorize tags (general, Open Graph, Twitter, etc.)</li>
              <li>Identify missing or improperly implemented tags</li>
              <li>Generate visual previews for search engines and social media</li>
              <li>Provide actionable recommendations</li>
              <li>Calculate overall SEO score</li>
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">How to use</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              Simply enter a URL in the input field on the homepage and click "Analyze". The tool will fetch the website's HTML, extract the meta tags, and display the results organized by category.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Review the recommendations to improve your website's SEO and see how your content will appear in search results and when shared on social media.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Why SEO tags matter</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Proper implementation of meta tags helps search engines understand your content and improves how your site appears in search results and when shared on social media. This can lead to higher click-through rates, better visibility, and more traffic to your website.
            </p>
          </div>
          
          <div className="flex justify-between pt-4">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Analyzer
              </Button>
            </Link>
            <a href="https://developers.google.com/search/docs/advanced/robots/intro" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="flex items-center gap-2">
                Learn more about SEO
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
