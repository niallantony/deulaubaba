import { Link, type LinkProps } from 'expo-router'
import { styled } from 'styled-components/native';
import { LinkText } from './ThemedText';

export type ThemedLinkProps = {
  text: string;
  size: "sm" | "md" | "lg";
} & LinkProps

export const StyledLink = styled.Pressable`
  color: ${props => props.theme.colors.accent}
`

export function ThemedLink({ text, href, size }: ThemedLinkProps) {
  return (
    <Link href={href} asChild>
      <StyledLink>
        <LinkText $size={size}>{text}</LinkText>
      </StyledLink>
    </Link>
  );
}

