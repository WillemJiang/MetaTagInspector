import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// MetaTag type definition
export const metaTagSchema = z.object({
  name: z.string(),
  content: z.string(),
  status: z.enum(["good", "warning", "error"]),
  type: z.string().optional(),
  recommendation: z.string().optional(),
});

export type MetaTag = z.infer<typeof metaTagSchema>;

// Recommendation type definition
export const recommendationSchema = z.object({
  id: z.string(),
  priority: z.enum(["high", "medium", "low"]),
  title: z.string(),
  description: z.string(),
  example: z.string().optional(),
});

export type Recommendation = z.infer<typeof recommendationSchema>;

// Website analysis result schema
export const analysisResultSchema = z.object({
  url: z.string(),
  metaTagsCount: z.number(),
  stats: z.object({
    implemented: z.number(),
    warnings: z.number(),
    critical: z.number(),
  }),
  metaTags: z.object({
    general: z.array(metaTagSchema),
    opengraph: z.array(metaTagSchema),
    twitter: z.array(metaTagSchema),
    structured: z.array(metaTagSchema),
    other: z.array(metaTagSchema),
  }),
  preview: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    url: z.string().optional(),
    image: z.string().nullable().optional(),
  }),
  recommendations: z.array(recommendationSchema),
});

export type AnalysisResult = z.infer<typeof analysisResultSchema>;

// Keep the users table as it is (might be used for future features)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
