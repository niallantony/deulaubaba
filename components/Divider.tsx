import styled from 'styled-components/native';
import { LightText } from './ThemedText';

const Divider = styled.View`
width: 80%;
height: 1px;
flex: 1;
background-color: ${props => props.theme.colors.light};
margin-left: ${props => props.theme.spacing.small};
`

const DividerView = styled.View`
  margin-top: ${props => props.theme.spacing.default};
  flex-direction: row;
  width: 80%;
  align-items: center;
`

export const DividerWithTitle = ({ title }: { title: string }) => {
  return (
    <DividerView>
      <LightText>{title}</LightText>
      <Divider />
    </DividerView>
  )
}


