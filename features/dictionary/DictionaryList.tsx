import { ButtonContainer } from "@/components/ButtonContainer";
import { ExpressionTypeButton } from "@/components/ExpressionTypeButton";
import { AddButton, LinkButton } from "@/components/ThemedButton";
import { PageTitle } from "@/components/ThemedText";
import { FullView } from "@/components/ThemedView"
import { useDictionary } from "@/hooks/useDictionary";
import { ExpressionType } from "@/types/dictionary";
import { View } from "react-native";

export const DictionaryList = () => {
  const { data } = useDictionary()

  const types = data?.expressiontypes ?? []
  const hasEntries = types.length > 0

  return (
    <FullView >
      <PageTitle>의사소통 방법</PageTitle>
      <View style={{
        flex: 1,
        width: "100%",
        padding: 12,
      }}>
        {types.map((expression: ExpressionType) => (
          <ExpressionTypeButton expression={expression} key={expression} />
        ))}
        {!hasEntries && (
          <ButtonContainer width={150}>
            <LinkButton type="green" text="입력하기" href={"/dictionary/new"} />
          </ButtonContainer>
        )}
        {hasEntries && (
          <ButtonContainer width={150}>
            <AddButton href={"/dictionary/new"} />
          </ButtonContainer>
        )}
      </View>
    </FullView>
  )
}

