import { BackButtonContainer, SmallButtonContainer } from "@/components/ButtonContainer";
import { AddButton, BackButton } from "@/components/ThemedButton";
import { GreenHeading } from "@/components/ThemedView";
import { useDictionary } from "@/context/DictionaryContext";
import { EntryCard } from "@/features/dictionary/EntryCard";
import { theme } from "@/themes/global";
import { ExpressionType, getExpressionType } from "@/types/dictionary";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Route() {
  const { extype } = useLocalSearchParams<{ extype: ExpressionType }>()
  const { dictionary } = useDictionary();
  const results = dictionary?.filter((entry) => entry.type === extype);

  const { title } = getExpressionType(extype);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <BackButtonContainer>
        <BackButton />
      </ BackButtonContainer>
      <GreenHeading>{title}</GreenHeading>
      {results && results.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}

      <SmallButtonContainer>
        <AddButton href={{
          pathname: "/dictionary/viewList/[extype]/add",
          params: { extype },
        }} />
      </SmallButtonContainer>


    </View>
  )
}
