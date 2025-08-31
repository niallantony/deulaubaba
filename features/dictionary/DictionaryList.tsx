import { SmallButtonContainer } from "@/components/ButtonContainer";
import { ExpressionTypeButton } from "@/components/ExpressionTypeButton";
import { AddButton, ThemedButton } from "@/components/ThemedButton";
import { PageTitle } from "@/components/ThemedText";
import { FullViewWhite } from "@/components/ThemedView"
import { useDictionary } from "@/hooks/useDictionary";
import { ExpressionType } from "@/types/dictionary";
import { Link } from "expo-router";
import { styled } from "styled-components/native";

export const DictionaryList = () => {
  const { data } = useDictionary()

  const types = data?.body?.expressiontypes

  return (
    <FullViewWhite>
      <PageTitle>의사소통 방법</PageTitle>
      <ButtonList>
        {types && types.map((expression: ExpressionType) => (
          <ExpressionTypeButton expression={expression} key={expression} />
        ))}
        {!types && (
          <Link href={"/dictionary/new"} asChild>
            <ThemedButton type="green" text="입력하기" />
          </Link>
        )}
        {types && (
          <SmallButtonContainer>
            <AddButton href={"/dictionary/new"} />
          </SmallButtonContainer>
        )}
      </ButtonList>
    </FullViewWhite>
  )
}

const ButtonList = styled.View`
width: 100%;
flex:1;
align-items: center;
`
