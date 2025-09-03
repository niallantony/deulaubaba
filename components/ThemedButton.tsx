import { ButtonTextTheme } from './ThemedText';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import { Link, LinkProps, useRouter } from 'expo-router';
import { theme } from '@/themes/global';
import { ReactNode } from 'react';

export type ThemedButtonProps = {
  text: string;
  type?: "green" | "outline";
  row?: boolean;
} & PressableProps



export const InputLikeButton = ({ error, children, ...rest }: { error?: boolean } & PressableProps) => {
  return (
    <Pressable style={[
      styles.inputLike,
      error ? styles.error : null,
    ]}
      {...rest}
    >
      {children}
    </Pressable>
  )
}

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
  common: {
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 16,
    width: "100%",
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
    borderColor: theme.colors.light,
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
    <Pressable style={styles.subtle} {...rest}>
      {children}
    </Pressable>
  )

}

export const BigButton = ({ children, ...rest }: { children: ReactNode } & PressableProps) => {
  return (
    <Pressable style={styles.big} {...rest}>
      {children}
    </Pressable>
  )
}

export function ThemedButton({ text, type = "green", row = false, ...rest }: ThemedButtonProps) {
  return (
    <Pressable style={[
      styles.common,
      row ? { flex: 1 } : null,
      styles[type],
    ]}
      {...rest}
    >
      <Text style={[
        styles.text,
        type === "outline" ? { color: theme.colors.accent } : { color: theme.colors.lightText },
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


export const AddButton = ({ href }: LinkProps) => {
  return (
    <Link href={href} asChild>
      <SubtleButton>
        <ButtonTextTheme>+ 추가하기</ButtonTextTheme>

      </SubtleButton>
    </Link>
  )
}
