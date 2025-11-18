import { ButtonTextTheme, ErrorText, LinkText } from './ThemedText';
import { Pressable, PressableProps, StyleSheet, Text, Image, ImageSourcePropType, ImageStyle, View } from 'react-native';
import { LinkProps, useRouter } from 'expo-router';
import { theme } from '@/themes/global';
import { ReactNode } from 'react';

export type ThemedButtonProps = {
  text: string;
  type?: "green" | "outline" | "bare" | "red";
  row?: boolean;
} & PressableProps


const rippleColor = {
  green: theme.colors.ripple.accent,
  bare: theme.colors.ripple.bare,
  outline: theme.colors.ripple.outline,
  red: theme.colors.ripple.bare,
}

export const InputLikeButton = ({ error, children, ...rest }: { error?: string } & PressableProps) => {
  return (
    <View>
      <Pressable style={[
        styles.inputLike,
        error ? styles.error : null,
      ]}
        {...rest}
        android_ripple={{ color: theme.colors.ripple.outline }}
        testID='input-like-button'
      >
        {children}
      </Pressable>
      <View style={{ marginTop: -12 }}>
        {error && <ErrorText>{error}</ErrorText>}
      </View>
    </View >
  )
}

type textStyles = "textGreen" | "textBare" | "textOutline" | "textRed"

const styles = StyleSheet.create({
  inputLike: {
    backgroundColor: theme.colors.inputs,
    fontSize: theme.fontSizes.md,
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  error: {
    borderWidth: 1,
    borderColor: theme.colors.error
  },
  bare: {

  },
  red: {

  },
  textRed: {
    color: theme.colors.error,
    fontWeight: 500,
  },
  textGreen: {
    color: theme.colors.lightText
  },
  textOutline: {
    color: theme.colors.accent
  },
  textBare: {
    color: theme.colors.accent,
    fontWeight: 400,
  },
  common: {
    padding: 16,
    borderRadius: 16,
  },
  text: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 18,
  },
  outline: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  green: {
    backgroundColor: theme.colors.accent,
  },
  subtle: {
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  big: {
    width: "100%",
    paddingVertical: 58,
    paddingHorizontal: 0,
    margin: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.accent
  }
})

export const SubtleButton = ({ children, ...rest }: { children: ReactNode } & PressableProps) => {
  return (
    <Pressable
      android_ripple={{ color: theme.colors.ripple.outline }}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.subtle,
        pressed && { opacity: 0.7 }
      ]}
      {...rest}>
      {children}
    </Pressable>
  )

}

export const BigButton = ({ children, ...rest }: { children: ReactNode } & PressableProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.big,
        pressed && { opacity: 0.7 }
      ]}
      android_ripple={{ color: theme.colors.ripple.big }}
      accessibilityRole="button"
      {...rest}>
      {children}
    </Pressable>
  )
}

export function ThemedButton({ text, type = "green", row = false, ...rest }: ThemedButtonProps) {

  const textStyle: textStyles = `text${type[0].toUpperCase() + type.slice(1)}` as textStyles;
  return (
    <Pressable
      android_ripple={{ color: rippleColor[type] }}
      accessibilityRole='button'
      style={({ pressed }) => [
        styles.common,
        row ? { flex: 1, marginHorizontal: 6 } : null,
        styles[type],
        pressed && { opacity: 0.7 }
      ]}
      {...rest}
    >
      <Text style={[
        styles.text,
        styles[textStyle]
      ]}
      >
        {text}
      </Text>
    </Pressable>
  )
}

export function LinkButton({
  text,
  type = "green",
  href,
  ...rest
}: {
  href: string
} & ThemedButtonProps & LinkProps) {
  const router = useRouter();
  const textStyle: textStyles = `text${type[0].toUpperCase() + type.slice(1)}` as textStyles;
  return (
    <Pressable
      android_ripple={{ color: rippleColor[type] }}
      accessibilityRole='button'
      style={({ pressed }) => [
        styles.common,
        styles[type],
        pressed && { opacity: 0.7 }
      ]}
      onPress={() => {
        router.push(href)
      }}
      {...rest}
    >
      <Text style={[
        styles.text,
        styles[textStyle]
      ]}
      >
        {text}
      </Text>
    </Pressable>

  )

}

export const BackButton = () => {
  const router = useRouter();
  return (
    <SubtleButton onPress={() => {
      router.back();
    }}>
      <ButtonTextTheme>&lt;  이전</ButtonTextTheme>
    </SubtleButton>
  )
}

export const BackHeader = () => {
  return (
    <View style={{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-start'
    }}>
      <BackButton />
    </View>
  )
}


export const AddButton = ({ href }: LinkProps) => {
  const router = useRouter();
  return (
    <SubtleButton
      onPress={() => {
        router.push(href)
      }}
    >
      <ButtonTextTheme>+ 추가하기</ButtonTextTheme>

    </SubtleButton>
  )
}

export type IconLinkProps = {
  imageSource: ImageSourcePropType;
  imageOptions: ImageStyle;
  size: "sm" | "md" | "lg";
} & ThemedButtonProps & LinkProps

export const IconLink = ({ text, href, imageSource, imageOptions }: IconLinkProps) => {
  const router = useRouter()

  return (
    <Pressable
      android_ripple={{ color: rippleColor.outline }}
      accessibilityRole='button'
      style={({ pressed }) => [
        { alignItems: 'center', },
        pressed && { opacity: 0.7 }
      ]}
      onPress={() => {
        router.push(href)
      }}
    >
      <Image source={imageSource} style={imageOptions} />
      <LinkText>{text}</LinkText>
    </Pressable>
  )
}

