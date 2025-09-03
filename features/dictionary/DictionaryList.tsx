import { ButtonContainer, SmallButtonContainer } from "@/components/ButtonContainer";
import { ExpressionTypeButton } from "@/components/ExpressionTypeButton";
import { AddButton, ThemedButton } from "@/components/ThemedButton";
import { PageTitle } from "@/components/ThemedText";
import { FullViewWhite } from "@/components/ThemedView"
import { useDictionary } from "@/hooks/useDictionary";
import { ExpressionType } from "@/types/dictionary";
import { Link } from "expo-router";
import { View } from "react-native";

export const DictionaryList = () => {
  const { data } = useDictionary()

  const types = data?.body?.expressiontypes

  return (
    <FullViewWhite>
      <PageTitle>의사소통 방법</PageTitle>
      <View style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
      }}>
        {types && types.map((expression: ExpressionType) => (
          <ExpressionTypeButton expression={expression} key={expression} />
        ))}
        {!types && (
          <ButtonContainer>
            <Link href={"/dictionary/new"} asChild>
              <ThemedButton type="green" text="입력하기" />
            </Link>
          </ButtonContainer>
        )}
        {types && (
          <ButtonContainer>
            <AddButton href={"/dictionary/new"} />
          </ButtonContainer>
        )}
      </View>
    </FullViewWhite>
  )
}

