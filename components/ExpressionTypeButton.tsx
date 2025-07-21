import { ExpressionType, getExpressionType } from "@/types/dictionary";
import { Link } from "expo-router";
import { styled } from "styled-components/native";

const ExpressionTypeButtonStyle = styled.Pressable`
  border-radius: 16px;
  padding: 16px;
  margin: ${props => props.theme.spacing.mini} ${props => props.theme.spacing.small};
  background-color: ${props => props.theme.colors.accent};
  width: 90%;
`

const FirstLineText = styled.Text`
  font-size: ${props => props.theme.sizes.mdsm};
  margin-bottom: ${props => props.theme.spacing.mini};
  font-weight: 800;
  color: ${props => props.theme.colors.lightText};
`
const SecondLineText = styled.Text`
  font-weight: 600;
  color: ${props => props.theme.colors.lightText};
`


export const ExpressionTypeButton = ({ expression, add = false }: { expression: ExpressionType; add?: boolean; }) => {
  const { title, description } = getExpressionType(expression);
  return (
    <Link href={`/dictionary/viewList/${expression}${add ? '/add' : ''}`} asChild>
      <ExpressionTypeButtonStyle>
        <FirstLineText>{title}</FirstLineText>
        <SecondLineText>{description}</SecondLineText>
      </ExpressionTypeButtonStyle>
    </Link>

  )

}
