export const colors = {
  background: '#F3F4F6',
  foreground: '#111827',
  card: '#FFFFFF',
  muted: '#9CA3AF',
  mutedForeground: '#6B7280',
  primary: '#3B82F6',
  primaryForeground: '#FFFFFF',
  secondary: '#E5E7EB',
  secondaryForeground: '#374151',
  destructive: '#DC2626',
  border: '#E5E7EB',
  accent: '#EFF6FF',
  tabBar: '#1F2937',
  tabBarActive: '#374151',
  success: '#16A34A',
  warning: '#F59E0B',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
} as const;
