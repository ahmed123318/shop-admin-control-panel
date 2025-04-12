
/**
 * Theme utility for managing application color themes
 */
import { useEffect } from 'react';

// Default accent color
export const DEFAULT_ACCENT_COLOR = "#6941c6";

/**
 * Apply the accent color to CSS custom properties
 * @param color Hex color string
 */
export const applyAccentColor = (color: string) => {
  document.documentElement.style.setProperty('--accent-color', color);
  
  // Convert hex to hsl for primary variable
  const hslColor = hexToHSL(color);
  if (hslColor) {
    document.documentElement.style.setProperty('--primary', hslColor.h + " " + hslColor.s + "% " + hslColor.l + "%");
    document.documentElement.style.setProperty('--sidebar-primary', hslColor.h + " " + hslColor.s + "% " + hslColor.l + "%");
    document.documentElement.style.setProperty('--ring', hslColor.h + " " + hslColor.s + "% " + hslColor.l + "%");
    document.documentElement.style.setProperty('--sidebar-ring', hslColor.h + " " + hslColor.s + "% " + hslColor.l + "%");
  }
  
  // Save to localStorage for persistence
  localStorage.setItem('accent-color', color);
};

/**
 * Hook to initialize the theme from localStorage
 */
export const useThemeInitialization = () => {
  useEffect(() => {
    // Try to get stored accent color from localStorage
    const storedColor = localStorage.getItem('accent-color') || DEFAULT_ACCENT_COLOR;
    applyAccentColor(storedColor);
  }, []);
};

/**
 * Convert hex color to HSL
 * @param hex Hex color string
 */
function hexToHSL(hex: string): { h: number; s: number; l: number } | null {
  // Remove the # if it exists
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  let r, g, b;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16) / 255;
    g = parseInt(hex[1] + hex[1], 16) / 255;
    b = parseInt(hex[2] + hex[2], 16) / 255;
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16) / 255;
    g = parseInt(hex.substring(2, 4), 16) / 255;
    b = parseInt(hex.substring(4, 6), 16) / 255;
  } else {
    return null; // Invalid hex
  }

  // Find the min and max values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  // Calculate the lightness
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  // Only calculate hue and saturation if not grayscale
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }
  
  // Convert to percentages
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return { h, s, l };
}

