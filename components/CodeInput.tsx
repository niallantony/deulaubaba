import { useState, useRef } from "react";
import { Pressable, TextInput } from "react-native";
import { styled } from "styled-components";

export type InputCodeProps = {
  code: string;
  setCode: (code: string) => void;
  length: number;
}

const StyledCodeView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const CodeBox = styled.View`
  width: 40px;
  height: 50px;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.colors.accent};
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`

const CodeChar = styled.Text`
  font-size: ${props => props.theme.sizes.lg};
  font-weight: 800;
`

const InvisibleInput = styled.TextInput`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
`

export const InputCode = ({ code, setCode, length }: InputCodeProps) => {
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  }

  const handleChange = (text: string) => {
    if (text.length <= length) {
      setCode(text);
    }
  }

  return (
    <Pressable onPress={handlePress}>
      <StyledCodeView>
        {[...Array(length)].map((_, i) => (
          <CodeBox key={i}>
            <CodeChar>{code[i] || ''}</CodeChar>
          </CodeBox>
        ))}
        <InvisibleInput
          ref={inputRef}
          value={code}
          onChangeText={handleChange}
          maxLength={length}
          inputType={"text"}
          autofocus
        />
      </StyledCodeView>
    </Pressable>
  )

}
