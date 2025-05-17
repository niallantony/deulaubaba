import { Text, Pressable } from "react-native";
import { styled } from 'styled-components/native';

export type ThemedButtonProps = {
  text: string;
  type: "green" | "outline";
  onPress: () => void;
}


export const StyledButton = styled.Pressable<{ $type?: string }>`
  width: 80%;
  border-radius: 16px;
  padding: 16px;
  margin-left: 24px;
  margin-right: 24px;
  background-color: ${props => props.$type === "green" ? props.theme.colors.accent : "white"};
  border-width: ${props => props.$type === "green" ? 0 : "1px"};
  border-color: ${props => props.$type === "outline" ? props.theme.colors.accent : "none"};
`;

export const StyledButtonText = styled.Text<{ $type?: string; }>`
  text-align: center;
  font-weight: 800;  
  font-size: 18px;
  color: ${props => props.$type === "green" ? "white" : props.theme.colors.accent};
`


export function ThemedButton({ text, type, onPress }: ThemedButtonProps) {
  return (
    <StyledButton
      onPress={onPress}
      $type={type}
    >
      <StyledButtonText $type={type}>{text}</StyledButtonText>
    </StyledButton>
  )
}
