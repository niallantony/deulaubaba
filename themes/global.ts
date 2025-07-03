export const theme = {
  colors: {
    accent: "#15673D",
    text: "#364356",
    lightText: "#FBFBFB",
    light: "#636D77",
    inputs: "#FFFFFF",
    error: "#FF4141",
    background: "#FBFBFB",
  },
  sizes: {
    xxl: "42px",
    xl: "32px",
    lg: "24px",
    md: "18px",
    mdsm: "16px",
    sm: "12px",
    xs: "10px",
  },
  radii: {
    full: "128px",
    xl: "16px",
    md: "8px",
    imageBorder: "12px",
  },
  spacing: {
    large: "32px",
    default: "24px",
    small: "12px",
    sides: "0 24px",
    header: "48px",
    screenContainer: "72px 32px",
    bigButton: "58px 0",
    border: "4px",
    mini: "4px"
  }


} as const;

export type AppTheme = typeof theme;
