import { Link, type LinkProps } from 'expo-router'
import { styled } from 'styled-components/native';
import { LinkText } from './ThemedText';
import { Image, ImageSourcePropType, ImageStyle } from 'react-native';

export type ThemedLinkProps = {
  text: string;
  size: "sm" | "md" | "lg";
  margin: string;
} & LinkProps

export const StyledLink = styled.Pressable<{ $margin?: string }>`
  color: ${props => props.theme.colors.accent};
  margin: ${props => props.$margin};
`

export const StyledIcon = styled.Pressable`
  color: ${props => props.theme.colors.accent};
  align-items: center;
`

export function ThemedLink({ text, href, size, margin }: ThemedLinkProps) {
  return (
    <Link href={href} asChild>
      <StyledLink $margin={margin}>
        <LinkText $size={size}>{text}</LinkText>
      </StyledLink>
    </Link>
  );
}

export type IconLinkProps = {
  imageSource: ImageSourcePropType;
  imageOptions: ImageStyle;
} & ThemedLinkProps

export function IconLink({ text, href, size, imageSource, imageOptions }: IconLinkProps) {
  return (
    <Link href={href} asChild>
      <StyledIcon>
        <Image source={imageSource} style={imageOptions} />
        <LinkText $size={size}>{text}</LinkText>
      </StyledIcon>
    </Link>
  )
}
