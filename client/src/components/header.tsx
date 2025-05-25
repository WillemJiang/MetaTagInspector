import { Link } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Code } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">SEO Tag Analyzer</h1>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/about">
              <div className="text-sm text-primary hover:text-primary-600 dark:hover:text-primary-400 font-medium">
                About
              </div>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
