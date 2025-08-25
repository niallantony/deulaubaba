import { ExpressionTypeButton } from "@/components/ExpressionTypeButton";
import { PageTitle } from "@/components/ThemedText"
import { theme } from "@/themes/global";
import { expressionKeys, ExpressionType } from "@/types/dictionary";
import { View } from "react-native";
import { styled } from "styled-components/native";

const ButtonList = styled.ScrollView`
width: 100%;
flex:1;
`

export default function Route() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <PageTitle>의사소통 방법을 골라주세요</PageTitle>
      <ButtonList>
        {expressionKeys.map((expression: ExpressionType) => (
          <ExpressionTypeButton expression={expression} key={expression} add={true} />
        ))}
      </ButtonList>
    </View>
  )

}
