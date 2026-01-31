// AfroLuxe Theme Tokens - Shared across Web & Mobile

export const colors = {
  background: '#0B1220',
  surface: '#111827',
  primary: '#0F172A',
  accent: '#F59E0B',
  accentSecondary: '#22C55E',
  text: '#E5E7EB',
  muted: '#94A3B8',
  border: '#1F2937',
  
  // Semantic colors
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Alpha variants
  accentAlpha: {
    10: 'rgba(245, 158, 11, 0.1)',
    20: 'rgba(245, 158, 11, 0.2)',
    30: 'rgba(245, 158, 11, 0.3)',
  },
  surfaceAlpha: {
    50: 'rgba(17, 24, 39, 0.5)',
    80: 'rgba(17, 24, 39, 0.8)',
  },
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const

export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'Courier, monospace',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
} as const

export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const

export type Colors = typeof colors
export type Spacing = typeof spacing
export type Typography = typeof typography
export type BorderRadius = typeof borderRadius
export type Shadows = typeof shadows
export type Breakpoints = typeof breakpoints
