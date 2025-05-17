import { Text, type TextProps } from 'react-native';
import { styled } from 'styled-components/native';

export const StyledText = styled.Text`
  font-size: ${props => props.theme.sizes.md}
`
export const TitleText = styled.Text`
  font-weight: 800;
  font-size: ${props => props.theme.sizes.xxl};
`
export const SemiboldText = styled.Text`
  font-weight: 600;
  font-size: ${props => props.theme.sizes.lg};
`

export const SubtitleText = styled.Text`
  font-weight: 800;
  font-size ${props => props.theme.sizes.xl};
`
export const LinkText = styled.Text<{ $size: string; }>`
  font-size: ${props => props.theme.sizes[props.$size]};
  color: ${props => props.theme.colors.accent};
`

export const LightText = styled.Text`
  font-size: ${props => props.theme.sizes.sm};
  color: ${props => props.theme.colors.light};
`

export const CenterText = styled.View`
  display: flex;
  flex-direction:row;
  justify-content: center;
  align-items: center;
  width: 100%;
  align-text: center;
`
