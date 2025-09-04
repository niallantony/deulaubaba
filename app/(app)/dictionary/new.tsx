import { ExpressionTypeButton } from "@/components/ExpressionTypeButton";
import { PageTitle } from "@/components/ThemedText"
import { theme } from "@/themes/global";
import { expressionKeys, ExpressionType } from "@/types/dictionary";
import { ScrollView, View } from "react-native";

export default function Route() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <PageTitle>의사소통 방법을 골라주세요</PageTitle>
      <ScrollView style={{ paddingHorizontal: 24, flex: 1 }}>
        {expressionKeys.map((expression: ExpressionType) => (
          <ExpressionTypeButton expression={expression} key={expression} add={true} />
        ))}
      </ScrollView>
    </View>
  )

}
