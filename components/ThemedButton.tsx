import { styled } from 'styled-components/native';
import { ButtonTextTheme, ButtonTextWhite } from './ThemedText';
import { PressableProps } from 'react-native';

export type ThemedButtonProps = {
  text: string;
  type?: "green" | "outline";
  onPress: () => void;
} & PressableProps


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

export const BigButton = styled.Pressable`
width: 80%;
  background-color: ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.radii.xl};
  padding: ${props => props.theme.spacing.bigButton};
  margin: ${props => props.theme.spacing.large};
`

export function ThemedButton({ text, type, onPress }: ThemedButtonProps) {
  return (
    <StyledButton
      onPress={onPress}
      $type={type}
    >
      {type === "green" ?
        (<ButtonTextWhite>{text}</ButtonTextWhite>) :
        (<ButtonTextTheme>{text}</ButtonTextTheme>)
      }
    </StyledButton>
  )
}
