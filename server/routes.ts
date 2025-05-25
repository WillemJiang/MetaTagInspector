import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { isValidUrl } from "../client/src/lib/utils";
import { z } from "zod";
import { MetaTag, Recommendation, AnalysisResult } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to analyze a website's SEO tags
  app.get("/api/analyze", async (req, res) => {
    try {
      const { url } = req.query;

      if (!url || typeof url !== "string") {
        return res.status(400).json({ message: "URL parameter is required" });
      }

      if (!isValidUrl(url)) {
        return res.status(400).json({ message: "Invalid URL format" });
      }

      // Fetch the HTML content of the URL
      const response = await fetch(url, {
        headers: {
          "User-Agent": "SEO-Tag-Analyzer/1.0",
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({
          message: `Failed to fetch URL: ${response.statusText}`,
        });
      }

      const html = await response.text();
      const result = analyzeHtml(html, url);

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error analyzing URL:", error);
      return res.status(500).json({
        message: "Failed to analyze URL",
        error: (error as Error).message,
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function analyzeHtml(html: string, url: string): AnalysisResult {
  const $ = cheerio.load(html);
  
  const metaTags: {
    general: MetaTag[];
    opengraph: MetaTag[];
    twitter: MetaTag[];
    structured: MetaTag[];
    other: MetaTag[];
  } = {
    general: [],
    opengraph: [],
    twitter: [],
    structured: [],
    other: [],
  };
  
  // Extract title
  const titleTag = $("title").first().text();
  if (titleTag) {
    metaTags.general.push({
      name: "title",
      content: titleTag,
      status: titleTag.length > 10 && titleTag.length < 60 ? "good" : "warning",
      type: "title",
      recommendation: titleTag.length < 10 
        ? "Title is too short. Aim for 50-60 characters." 
        : titleTag.length > 60 
        ? "Title is too long. Keep it under 60 characters for optimal display in search results." 
        : undefined,
    });
  } else {
    metaTags.general.push({
      name: "title",
      content: "",
      status: "error",
      type: "title",
      recommendation: "Missing title tag. Add a descriptive title between 50-60 characters.",
    });
  }
  
  // Extract canonical URL
  const canonical = $('link[rel="canonical"]').attr("href");
  if (canonical) {
    metaTags.general.push({
      name: "canonical",
      content: canonical,
      status: "good",
      type: "link",
    });
  } else {
    metaTags.general.push({
      name: "canonical",
      content: "",
      status: "warning",
      type: "link",
      recommendation: "Add a canonical URL to prevent duplicate content issues.",
    });
  }
  
  // Extract general meta tags
  $('meta').each((i, el) => {
    const name = $(el).attr('name') || $(el).attr('property') || $(el).attr('http-equiv');
    const content = $(el).attr('content') || '';
    
    if (!name) return;
    
    if (name.startsWith('og:')) {
      // Open Graph tags
      const status = content.length > 0 ? "good" : "error";
      let recommendation;
      
      if (name === 'og:title' && (content.length < 10 || content.length > 60)) {
        recommendation = "Your Open Graph title should be between 10-60 characters for optimal display.";
      } else if (name === 'og:description' && (content.length < 50 || content.length > 200)) {
        recommendation = "Your Open Graph description should be between 50-200 characters for optimal display.";
      } else if (name === 'og:image' && !content) {
        recommendation = "Add an Open Graph image for better social media sharing.";
      }
      
      metaTags.opengraph.push({
        name,
        content,
        status: content ? (recommendation ? "warning" : "good") : "error",
        recommendation,
      });
    } else if (name.startsWith('twitter:')) {
      // Twitter Card tags
      const status = content.length > 0 ? "good" : "error";
      let recommendation;
      
      if (name === 'twitter:title' && (content.length < 10 || content.length > 60)) {
        recommendation = "Your Twitter title should be between 10-60 characters for optimal display.";
      } else if (name === 'twitter:description' && (content.length < 50 || content.length > 200)) {
        recommendation = "Your Twitter description should be between 50-200 characters for optimal display.";
      } else if (name === 'twitter:image' && !content) {
        recommendation = "Add a Twitter image for better display when shared on Twitter.";
      }
      
      metaTags.twitter.push({
        name,
        content,
        status: content ? (recommendation ? "warning" : "good") : "error",
        recommendation,
      });
    } else if (name === 'description') {
      // Description meta tag
      const status = content.length > 50 && content.length < 160 ? "good" : "warning";
      const recommendation = content.length < 50 
        ? "Description is too short. Aim for 50-160 characters." 
        : content.length > 160 
        ? "Description is too long. Keep it under 160 characters for optimal display in search results." 
        : undefined;
      
      metaTags.general.push({
        name,
        content,
        status,
        type: "meta",
        recommendation,
      });
    } else if (['viewport', 'robots', 'charset', 'language', 'author'].includes(name)) {
      // Common important meta tags
      metaTags.general.push({
        name,
        content,
        status: content ? "good" : "error",
        type: "meta",
      });
    } else {
      // Other meta tags
      metaTags.other.push({
        name,
        content,
        status: "good",
        type: "meta",
      });
    }
  });
  
  // Extract JSON-LD structured data
  $('script[type="application/ld+json"]').each((i, el) => {
    try {
      const content = $(el).html() || '';
      const parsedJson = JSON.parse(content);
      
      metaTags.structured.push({
        name: parsedJson["@type"] || "JSON-LD",
        content,
        status: "good",
      });
    } catch (e) {
      metaTags.structured.push({
        name: "JSON-LD",
        content: $(el).html() || '',
        status: "warning",
        recommendation: "Invalid JSON-LD structure. Check the syntax.",
      });
    }
  });
  
  // Generate recommendations
  const recommendations: Recommendation[] = [];
  
  // Check for missing critical tags
  if (!metaTags.general.some(tag => tag.name === 'description')) {
    recommendations.push({
      id: "missing-description",
      priority: "high",
      title: "Add a meta description",
      description: "Your page is missing a meta description, which is important for SEO and click-through rates from search results.",
      example: '<meta name="description" content="A concise description of your page content in 50-160 characters.">'
    });
  }
  
  if (!metaTags.opengraph.some(tag => tag.name === 'og:title')) {
    recommendations.push({
      id: "missing-og-title",
      priority: "medium",
      title: "Add Open Graph title",
      description: "Open Graph title tag is missing. This affects how your content appears when shared on social media.",
      example: '<meta property="og:title" content="Your page title for social media">'
    });
  }
  
  if (!metaTags.opengraph.some(tag => tag.name === 'og:description')) {
    recommendations.push({
      id: "missing-og-description",
      priority: "medium",
      title: "Add Open Graph description",
      description: "Open Graph description tag is missing. This affects how your content appears when shared on social media.",
      example: '<meta property="og:description" content="A compelling description for social media shares">'
    });
  }
  
  if (!metaTags.opengraph.some(tag => tag.name === 'og:image')) {
    recommendations.push({
      id: "missing-og-image",
      priority: "medium",
      title: "Add Open Graph image",
      description: "Open Graph image tag is missing. Visual content significantly increases engagement when shared on social platforms.",
      example: '<meta property="og:image" content="https://example.com/image.jpg">'
    });
  }
  
  if (!metaTags.twitter.some(tag => tag.name === 'twitter:card')) {
    recommendations.push({
      id: "missing-twitter-card",
      priority: "medium",
      title: "Add Twitter Card markup",
      description: "Twitter Card meta tag is missing. This controls how your content appears when shared on Twitter.",
      example: '<meta name="twitter:card" content="summary_large_image">'
    });
  }
  
  // Calculate stats
  const stats = {
    implemented: 0,
    warnings: 0,
    critical: 0,
  };
  
  // Count total of each status type
  Object.values(metaTags).forEach(category => {
    category.forEach(tag => {
      if (tag.status === "good") stats.implemented++;
      else if (tag.status === "warning") stats.warnings++;
      else if (tag.status === "error") stats.critical++;
    });
  });
  
  // Get total meta tags count
  const metaTagsCount = Object.values(metaTags).reduce(
    (acc, category) => acc + category.length, 
    0
  );
  
  // Prepare preview data
  const title = 
    metaTags.opengraph.find(tag => tag.name === 'og:title')?.content || 
    metaTags.general.find(tag => tag.name === 'title')?.content || 
    '';
    
  const description = 
    metaTags.opengraph.find(tag => tag.name === 'og:description')?.content || 
    metaTags.general.find(tag => tag.name === 'description')?.content || 
    '';
    
  const image = 
    metaTags.opengraph.find(tag => tag.name === 'og:image')?.content || 
    metaTags.twitter.find(tag => tag.name === 'twitter:image')?.content || 
    null;
  
  return {
    url,
    metaTagsCount,
    stats,
    metaTags,
    preview: {
      title,
      description,
      url,
      image,
    },
    recommendations,
  };
}
