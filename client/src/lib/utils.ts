import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export function getDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return url;
  }
}

export function calculateScore(implemented: number, warnings: number, critical: number): number {
  const total = implemented + warnings + critical;
  if (total === 0) return 0;
  
  // Calculate weighted score: 
  // Implemented: 100%, Warnings: 50%, Critical: 0%
  const score = (implemented * 100 + warnings * 50) / (total * 100) * 100;
  return Math.round(score);
}
