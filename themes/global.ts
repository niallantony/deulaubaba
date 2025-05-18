export const theme = {
  colors: {
    accent: "#15673D",
    text: "#364356",
    light: "#636D77",
    inputs: "#FFFFFF",
    error: "#FF4141",
  },
  sizes: {
    xxl: "42px",
    xl: "25px",
    lg: "24px",
    md: "18px",
    sm: "12px",
  },
  radii: {
    xl: "16px",
    md: "8px",
  },
  spacing: {
    large: "32px",
    default: "24px",
    small: "12px",
    header: "48px",
    screenContainer: "72px 32px",
    bigButton: "58px 0"
  }


} as const;

export type AppTheme = typeof theme;
