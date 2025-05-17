import { styled } from 'styled-components/native';

export const ButtonContainer = styled.View`
  display: flex;
  justify-content:center;
  align-items: center;
  width: 100%;
  margin-top: ${props => props.theme.spacing.default};
`;
