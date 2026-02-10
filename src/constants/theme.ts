// Veya Design System — Constants & Theme
export const COLORS = {
  // Brand
  primary: '#8B5CF6',
  primaryLight: '#A78BFA',
  primaryDark: '#7C3AED',
  primaryMuted: 'rgba(139, 92, 246, 0.15)',
  primaryGlow: 'rgba(139, 92, 246, 0.3)',

  secondary: '#06B6D4',
  secondaryLight: '#22D3EE',

  gold: '#F59E0B',
  goldLight: '#FBBF24',
  pink: '#EC4899',
  pinkLight: '#F472B6',

  // Backgrounds
  bg: '#05051A',
  bgSecondary: '#0D0D2B',
  bgTertiary: '#13133A',
  bgCard: 'rgba(255, 255, 255, 0.04)',
  bgCardHover: 'rgba(255, 255, 255, 0.08)',
  bgInput: 'rgba(255, 255, 255, 0.06)',
  bgElevated: '#161640',

  // Text
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.45)',
  textDisabled: 'rgba(255, 255, 255, 0.25)',

  // Borders
  border: 'rgba(255, 255, 255, 0.08)',
  borderLight: 'rgba(255, 255, 255, 0.04)',
  borderFocus: 'rgba(139, 92, 246, 0.5)',

  // Overlays
  overlay: 'rgba(5, 5, 26, 0.85)',
  overlayLight: 'rgba(5, 5, 26, 0.6)',

  // Status
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Zodiac Elements
  fire: '#EF4444',
  earth: '#22C55E',
  air: '#F59E0B',
  water: '#3B82F6',

  // Gradients (as arrays for LinearGradient)
  gradientCosmic: ['#05051A', '#0D0D2B', '#1A0A2E'],
  gradientPurple: ['#7C3AED', '#8B5CF6', '#A78BFA'],
  gradientCard: ['rgba(139, 92, 246, 0.1)', 'rgba(6, 182, 212, 0.05)'],
  gradientGold: ['#F59E0B', '#FBBF24'],
  gradientSunrise: ['#7C3AED', '#EC4899', '#F59E0B'],
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const RADIUS = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 36,
  full: 9999,
} as const;

export const FONTS = {
  display: { fontSize: 36, fontWeight: '700' as const, letterSpacing: -1.2, lineHeight: 42 },
  h1: { fontSize: 30, fontWeight: '700' as const, letterSpacing: -0.8, lineHeight: 36 },
  h2: { fontSize: 24, fontWeight: '600' as const, letterSpacing: -0.4, lineHeight: 30 },
  h3: { fontSize: 20, fontWeight: '600' as const, letterSpacing: -0.2, lineHeight: 26 },
  bodyLg: { fontSize: 18, fontWeight: '400' as const, lineHeight: 28 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodyMd: { fontSize: 16, fontWeight: '500' as const, lineHeight: 24 },
  bodySm: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  label: { fontSize: 13, fontWeight: '600' as const, letterSpacing: 0.8 },
  overline: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 1.5, textTransform: 'uppercase' as const },
} as const;

export const SHADOWS = {
  sm: { shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 3 },
  md: { shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 5 },
  lg: { shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 24, elevation: 8 },
  glow: { shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 },
} as const;

export const ZODIAC = {
  aries: { symbol: '♈', name: 'Aries', element: 'fire', emoji: '🐏', dates: 'Mar 21 - Apr 19' },
  taurus: { symbol: '♉', name: 'Taurus', element: 'earth', emoji: '🐂', dates: 'Apr 20 - May 20' },
  gemini: { symbol: '♊', name: 'Gemini', element: 'air', emoji: '👯', dates: 'May 21 - Jun 20' },
  cancer: { symbol: '♋', name: 'Cancer', element: 'water', emoji: '🦀', dates: 'Jun 21 - Jul 22' },
  leo: { symbol: '♌', name: 'Leo', element: 'fire', emoji: '🦁', dates: 'Jul 23 - Aug 22' },
  virgo: { symbol: '♍', name: 'Virgo', element: 'earth', emoji: '🌾', dates: 'Aug 23 - Sep 22' },
  libra: { symbol: '♎', name: 'Libra', element: 'air', emoji: '⚖️', dates: 'Sep 23 - Oct 22' },
  scorpio: { symbol: '♏', name: 'Scorpio', element: 'water', emoji: '🦂', dates: 'Oct 23 - Nov 21' },
  sagittarius: { symbol: '♐', name: 'Sagittarius', element: 'fire', emoji: '🏹', dates: 'Nov 22 - Dec 21' },
  capricorn: { symbol: '♑', name: 'Capricorn', element: 'earth', emoji: '🐐', dates: 'Dec 22 - Jan 19' },
  aquarius: { symbol: '♒', name: 'Aquarius', element: 'air', emoji: '🏺', dates: 'Jan 20 - Feb 18' },
  pisces: { symbol: '♓', name: 'Pisces', element: 'water', emoji: '🐟', dates: 'Feb 19 - Mar 20' },
} as const;

export type ZodiacSign = keyof typeof ZODIAC;
export type Element = 'fire' | 'earth' | 'air' | 'water';
