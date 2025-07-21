import { styled } from 'styled-components/native';

export const StyledText = styled.Text`
  font-size: ${props => props.theme.sizes.md};
  color: ${props => props.theme.colors.text};
`
export const TitleText = styled.Text`
  font-weight: 700;
  font-size: ${props => props.theme.sizes.xl};
  color: ${props => props.theme.colors.text};
`
export const SemiboldText = styled.Text`
  font-weight: 600;
  font-size: ${props => props.theme.sizes.lg};
  color: ${props => props.theme.colors.text};
`

export const SemiboldLightText = styled.Text`
  font-weight: 600;
  font-size: ${props => props.theme.sizes.lg};
  color: ${props => props.theme.colors.light};
`
export const InfoLabel = styled.Text`
  font-weight: 600;
  font-size: ${props => props.theme.sizes.md};
  color: ${props => props.theme.colors.text};
  margin-top: ${props => props.theme.spacing.small};
  margin-bottom: ${props => props.theme.spacing.small};
`

export const SubtitleText = styled.Text`
  font-weight: 800;
  font-size: ${props => props.theme.sizes.xl};
  color: ${props => props.theme.colors.text};
`
export const LinkText = styled.Text<{ $size: string; }>`
  font-size: ${props => props.theme.sizes[props.$size]};
  color: ${props => props.theme.colors.accent};
`

export const LightText = styled.Text`
  font-size: ${props => props.theme.sizes.md};
  color: ${props => props.theme.colors.light};
`

export const LightTextVariable = styled.Text<{ $size: string; }>`
  font-size: ${props => props.theme.sizes[props.$size]};
  color: ${props => props.theme.colors.light};
`

export const ButtonTextWhite = styled.Text`
  text-align: center;
  font-weight: 800;  
  font-size: 18px;
  color: white;
`

export const ButtonTextTheme = styled.Text`
  text-align: center;
  font-weight: 800;  
  font-size: 18px;
  color: ${props => props.theme.colors.accent};
`

export const ErrorText = styled.Text`
  font-size: ${props => props.theme.sizes.sm};
  color: ${props => props.theme.colors.error};
`

export const CenterText = styled.View`
  display: flex;
  flex-direction:row;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
`

export const PageTitle = styled.Text`
  text-align: left;
  width: 80%;
  font-size: ${props => props.theme.sizes.lg};
  margin: ${props => props.theme.spacing.default};
  font-weight: 800;
  color: ${props => props.theme.colors.light};
`
