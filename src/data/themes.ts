export interface ThemeConfig {
  id: string;
  word: string;
  colorName: string;
  primary: string;
  hover: string;
  lightGlow: string;
  darkAccent: string;
  archTop: string;
  archBottom: string;
  badgeBorder: string;
}

export const THEME_OPTIONS: ThemeConfig[] = [
  {
    id: 'trust',
    word: 'Trust',
    colorName: 'Blue',
    primary: '#13265C',
    hover: '#1B367D',
    lightGlow: 'rgba(19, 38, 92, 0.15)',
    darkAccent: '#5B82F6',
    archTop: '#1D3B8B',
    archBottom: '#13265C',
    badgeBorder: '#13265C',
  },
  {
    id: 'creativity',
    word: 'Creativity',
    colorName: 'Orange',
    primary: '#FD6F00',
    hover: '#EA580C',
    lightGlow: 'rgba(253, 111, 0, 0.15)',
    darkAccent: '#FB923C',
    archTop: '#FD7A12',
    archBottom: '#FD6F00',
    badgeBorder: '#FD6F00',
  },
  {
    id: 'power',
    word: 'Power',
    colorName: 'Red',
    primary: '#DC2626',
    hover: '#B91C1C',
    lightGlow: 'rgba(220, 38, 38, 0.15)',
    darkAccent: '#F87171',
    archTop: '#EF4444',
    archBottom: '#DC2626',
    badgeBorder: '#DC2626',
  },
  {
    id: 'happiness',
    word: 'Happiness',
    colorName: 'Yellow',
    primary: '#D97706',
    hover: '#B45309',
    lightGlow: 'rgba(217, 119, 6, 0.15)',
    darkAccent: '#FBBF24',
    archTop: '#F59E0B',
    archBottom: '#D97706',
    badgeBorder: '#D97706',
  },
  {
    id: 'harmony',
    word: 'Harmony',
    colorName: 'Green',
    primary: '#059669',
    hover: '#047857',
    lightGlow: 'rgba(5, 150, 105, 0.15)',
    darkAccent: '#34D399',
    archTop: '#10B981',
    archBottom: '#059669',
    badgeBorder: '#059669',
  },
  {
    id: 'luxury',
    word: 'Luxury',
    colorName: 'Purple',
    primary: '#7C3AED',
    hover: '#5B21B6',
    lightGlow: 'rgba(124, 58, 237, 0.15)',
    darkAccent: '#A78BFA',
    archTop: '#8B5CF6',
    archBottom: '#7C3AED',
    badgeBorder: '#7C3AED',
  },
  {
    id: 'affection',
    word: 'Affection',
    colorName: 'Pink',
    primary: '#EC4899',
    hover: '#BE185D',
    lightGlow: 'rgba(236, 72, 153, 0.15)',
    darkAccent: '#F472B6',
    archTop: '#F43F5E',
    archBottom: '#EC4899',
    badgeBorder: '#EC4899',
  },
  {
    id: 'reliability',
    word: 'Reliability',
    colorName: 'Brown',
    primary: '#78350F',
    hover: '#92400E',
    lightGlow: 'rgba(120, 53, 15, 0.15)',
    darkAccent: '#F59E0B',
    archTop: '#92400E',
    archBottom: '#78350F',
    badgeBorder: '#78350F',
  },
];
