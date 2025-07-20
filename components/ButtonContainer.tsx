import { styled } from 'styled-components/native';

export const ButtonContainer = styled.View`
  display: flex;
  justify-content:center;
  align-items: center;
  width: 100%;
  margin-top: ${props => props.theme.spacing.default};
`;

export const SmallButtonContainer = styled.View`
  display: flex;
  justify-content:center;
  align-items: center;
  width: 100%;
  margin-top: ${props => props.theme.spacing.default};
  padding: 0 94px;
`

export const RowButtonContainer = styled.View`
 flex-direction: row;
 justify-content: space-between;
 width: 100%;
  margin-top: ${props => props.theme.spacing.default};
`

export const BigButtonContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`


export const BackButtonContainer = styled.View`
  flex-direction: row;
`
