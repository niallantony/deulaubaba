import { theme } from "@/themes/global";
import React, { useRef } from "react";
import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";

export type InputCodeProps = {
  code: string;
  setCode: (code: string) => void;
  length: number;
  error: boolean;
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box: {
    width: 40,
    height: 50,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5
  },
  boxColor: {
    borderColor: theme.colors.accent,
  },
  errorBox: {
    borderColor: theme.colors.error,
  },
  errorChar: {
    color: theme.colors.error,
  },
  char: {
    fontSize: 24,
    fontWeight: 800,
  },
  invisible: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  }
})

export const InputCode = ({ code, setCode, length, error }: InputCodeProps) => {
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  }

  const handleChange = (text: string) => {
    setCode(text.slice(0, length));
  }

  return (
    <Pressable onPress={handlePress} testID="overlay-pressable">
      <View style={styles.view}>
        {[...Array(length)].map((_, i) => (
          <View style={[
            styles.box,
            error ? styles.errorBox : styles.boxColor
          ]} key={i} testID="code-box">
            <Text style={[
              styles.char,
              error ? styles.errorChar : null
            ]} testID={`code-box-${i}`}>{code[i] || ''}</Text>
          </View>
        ))}
        <TextInput
          style={styles.invisible}
          ref={inputRef}
          value={code}
          onChangeText={handleChange}
          maxLength={length}
          autoFocus
          autoCapitalize="none"
          testID="hidden-input"
        />
      </View>
    </Pressable>
  )

}
