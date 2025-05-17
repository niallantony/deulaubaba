export const theme = {
  colors: {
    accent: "#15673D",
    light: "#636D77",
    inputs: "#FFFFFF",
  },
  sizes: {
    xxl: 42,
    xl: 36,
    lg: 24,
    md: 18,
    sm: 12,
  },
  radii: {
    xl: 16,
    md: 8,
  },
  spacing: {
    default: 24,
    small: 12,
  }


} as const;

export type AppTheme = typeof theme;
