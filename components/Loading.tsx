import { ActivityIndicator } from 'react-native';
import { styled } from 'styled-components/native';
import { theme } from '@/themes/global';

const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const Square = styled.View`
  background-color: rgba(0, 0, 0, 0.1);
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.radii.xl};

`

export const Loading = () => {
  return (
    <Container>
      <Square>
        <ActivityIndicator size={"large"} color={theme.colors.accent} />
      </Square>
    </Container>
  )
}
