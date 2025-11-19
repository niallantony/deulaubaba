import { theme } from '@/themes/global';
import { ReactNode } from 'react';
import { StyleSheet, Text, TextProps, View, ViewProps } from 'react-native';

export const styles = StyleSheet.create({
  styled: {
    fontSize: 14,
    color: theme.colors.text,
  },
  title: {
    fontWeight: "700",
    fontSize: 32,
    color: theme.colors.text,
  },
  semibold: {
    fontWeight: "600",
    fontSize: 24,
    color: theme.colors.text,
  },
  semiboldLight: {
    fontWeight: "600",
    fontSize: 20,
    color: theme.colors.light,
  },
  infoLabel: {
    fontWeight: "400",
    fontSize: 18,
    color: theme.colors.light,
    marginVertical: 12,
  },
  subtitle: {
    fontWeight: "800",
    fontSize: 32,
    color: theme.colors.text,
  },
  light: {
    fontSize: 18,
    color: theme.colors.light,
  },
  buttonWhite: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 18,
    color: "white",
  },
  button: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 18,
    color: theme.colors.accent,
  },
  clickable: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 18,
    color: theme.colors.accent,
  },
  link: {
    color: theme.colors.accent,
    fontSize: 18
  },
  error: {
    fontSize: 12,
    color: theme.colors.error,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center'
  },
  pageTitle: {
    textAlign: 'left',
    width: '80%',
    fontSize: 24,
    margin: 24,
    fontWeight: 800,
    color: theme.colors.light,
  }
});
export const ErrorText = ({ children }: TextProps) => {
  return (
    <Text style={styles.error}>{children}</Text>
  )
}

export const CenterText = ({ children }: ViewProps) => {
  return (
    <View style={styles.center}>{children}</View>
  )
}

export const PageTitle = ({ children }: TextProps) => {
  return (
    <Text style={styles.pageTitle}>{children}</Text>
  )
}


export const StyledText = ({ children }: TextProps) => {
  return (
    <Text style={styles.styled}>{children}</Text>
  )
}
export const TitleText = ({ children }: TextProps) => {
  return (
    <Text style={styles.title}>{children}</Text>
  )
}
export const SemiboldText = ({ children }: TextProps) => {
  return (
    <Text style={styles.semibold}>{children}</Text>
  )
}

export const SemiboldLightText = ({ children }: TextProps) => {
  return (
    <Text style={styles.semiboldLight}>{children}</Text>
  )
}
export const InfoLabel = ({ children }: TextProps) => {
  return (
    <Text style={styles.infoLabel}>{children}</Text>
  )
}

export const SubtitleText = ({ children }: TextProps) => {
  return (
    <Text style={styles.subtitle}>{children}</Text>
  )
}
export const LinkText = ({ children }: TextProps) => {
  return (
    <Text style={styles.link}>{children}</Text>
  )
}
export const LightText = ({ children }: TextProps) => {
  return (
    <Text style={styles.light}>{children}</Text>
  )
}

export const ButtonTextWhite = ({ children }: TextProps) => {
  return (
    <Text style={styles.buttonWhite}>{children}</Text>
  )
}

export const ButtonTextTheme = ({ children }: TextProps) => {
  return (
    <Text style={styles.button}>{children}</Text>
  )
}
export const ClickableText = ({ children }: { children: ReactNode }) => {
  return (
    <Text style={[
      styles.clickable
    ]}>
      {children}
    </Text>
  )
}

