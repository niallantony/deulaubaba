import { styled } from 'styled-components/native';
import { ButtonTextTheme, ButtonTextWhite } from './ThemedText';
import { PressableProps } from 'react-native';
import { Link, LinkProps } from 'expo-router';

export type ThemedButtonProps = {
  text: string;
  type?: "green" | "outline";
  onPress: () => void;
  row?: boolean;
} & PressableProps


export const InputLikeButton = styled.Pressable`
  background-color: ${props => props.theme.colors.inputs};
  padding: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.radii.md};
  box-shadow: 0 7px 6px rgba(0,0,0,0.03);
  margin-top: ${props => props.theme.spacing.small};
  flex-direction: row;
  justify-content: space-between;
`

export const StyledButton = styled.Pressable<{ $type?: string, $row?: boolean }>`
  width: 80%;
  ${props => props.$row ? "flex: 1;" : ""}
  border-radius: 16px;
  padding: 16px;
  margin-left: 24px;
  margin-right: 24px;
  background-color: ${props => props.$type === "green" ? props.theme.colors.accent : "white"};
  border-width: ${props => props.$type === "green" ? 0 : "1px"};
  border-color: ${props => props.$type === "outline" ? props.theme.colors.accent : "none"};
`;

export const SubtleButton = styled.Pressable`
  border-radius: ${props => props.theme.radii.md};
  padding: ${props => props.theme.spacing.small};
  border: 1px solid ${props => props.theme.colors.light};
`


export const BigButton = styled.Pressable`
width: 80%;
  background-color: ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.radii.xl};
  padding: ${props => props.theme.spacing.bigButton};
  margin: ${props => props.theme.spacing.large};
`


export function ThemedButton({ text, type, onPress, row = false }: ThemedButtonProps) {
  return (
    <StyledButton
      $row={row}
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

export const BackButton = ({ href }: LinkProps) => {
  return (
    <Link href={href} asChild>
      <SubtleButton>
        <ButtonTextTheme>&lt;  이전</ButtonTextTheme>

      </SubtleButton>
    </Link>
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
