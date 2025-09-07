import { theme } from "@/themes/global";
import React, { useRef } from "react";
import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";

export type InputCodeProps = {
  code: string;
  setCode: (code: string) => void;
  length: number;
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
    borderColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5
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

export const InputCode = ({ code, setCode, length }: InputCodeProps) => {
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
          <View style={styles.box} key={i} testID="code-box">
            <Text style={styles.char} testID={`code-box-${i}`}>{code[i] || ''}</Text>
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
