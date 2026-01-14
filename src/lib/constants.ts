/**
 * Application Constants
 * 
 * Centralized constants for colors, delays, and other configuration values.
 */

// API Mock Delays (in milliseconds)
export const API_DELAYS = {
  UPDATES: 800,
  METRICS: 600,
  APPROVAL_ITEMS: 700,
  PAYOUTS: 650,
  FUNNEL: 750,
  STATS: 500,
  PROGRAM_GROWTH: 600,
  USERS: 550,
  METRIC_DESCRIPTIONS: 400,
} as const

// Color Constants
export const COLORS = {
  // Background Colors
  BACKGROUND_LIGHT: '#F4F3F1',
  BACKGROUND_CARD: '#F8F8F6',
  BACKGROUND_HEADER: '#F9F7F5',
  
  // Accent Colors
  ACCENT_YELLOW: '#D1FF4B',
  ACCENT_YELLOW_DARK: '#BCDE44',
  ACCENT_GREEN: '#1B9A6D',
  ACCENT_ORANGE: '#EA570B',
  
  // Status Colors
  SUCCESS_BG: '#EAFEF6',
  WARNING_BG: '#FFFBEA',
  WARNING_BORDER: '#FDE58A',
  WARNING_ICON_BG: '#FEF4C6',
  WARNING_ICON: '#D87708',
  
  // Text Colors
  TEXT_PRIMARY: '#111827',
  TEXT_SECONDARY: '#6b7280',
  TEXT_MUTED: '#9ca3af',
  
  // Border Colors
  BORDER_LIGHT: '#d1d5db',
  BORDER_DEFAULT: '#e5e7eb',
  
  // Chart Colors
  CHART_GRAY: '#E5E6EA',
  CHART_BLACK: '#1B1917',
  CHART_GREEN_LIGHT: '#A2CB39',
  CHART_GREEN_MEDIUM: '#BBE059',
  CHART_GREEN_DARK: '#DBF58C',
} as const

// Date Constants
export const DEFAULT_DATE_RANGE = {
  START_MONTH: 9, // October (0-indexed)
  START_DAY: 1,
  END_DAY: 31,
  YEAR: 2024,
} as const

// Skeleton Loading Counts
export const SKELETON_COUNTS = {
  METRICS: 8,
  UPDATES: 4,
  APPROVAL_ITEMS: 4,
  USERS: 11,
  STATS: 3,
  PROGRAM_GROWTH: 4,
} as const
