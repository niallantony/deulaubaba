import { ThemedButton } from "@/components/ThemedButton";
import { FullViewWhite } from "@/components/ThemedView"
import { useDictionary } from "@/context/DictionaryContext";
import { ExpressionType, getExpressionType } from "@/types/dictionary";
import { Link } from "expo-router";
import styled from "styled-components/native";

export const DictionaryList = () => {
  const { dictionary, types, fetchDictionary } = useDictionary();

  return (
    <FullViewWhite>
      <PageTitle>의사소통 방법</PageTitle>
      <ButtonList>
        {types && types.map((expression: ExpressionType) => (
          <ExpressionTypeButton expression={expression} key={expression} />
        ))}
        {!types && (
          <ThemedButton type="green" text="입력하기" onPress={() => console.log("pres")} />
        )}
      </ButtonList>
    </FullViewWhite>
  )
}

const ButtonList = styled.View`
width: 100%;
flex:1;
`

const PageTitle = styled.Text`
  text-align: left;
  width: 80%;
  font-size: ${props => props.theme.sizes.lg};
  margin: ${props => props.theme.spacing.default};
  font-weight: 800;
  color: ${props => props.theme.colors.light};
`
const ExpressionTypeButtonStyle = styled.Pressable`
  border-radius: 16px;
  padding: 16px;
  margin: ${props => props.theme.spacing.sides};
  background-color: ${props => props.theme.colors.accent};
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


export const ExpressionTypeButton = ({ expression }: { expression: ExpressionType }) => {
  const { title, description } = getExpressionType(expression);
  return (
    <Link href={`/dictionary/viewList/${expression}`} asChild>
      <ExpressionTypeButtonStyle>
        <FirstLineText>{title}</FirstLineText>
        <SecondLineText>{description}</SecondLineText>
      </ExpressionTypeButtonStyle>
    </Link>

  )

}
