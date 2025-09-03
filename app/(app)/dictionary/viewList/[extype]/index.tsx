import { BackButtonContainer, SmallButtonContainer } from "@/components/ButtonContainer";
import { AddButton, BackButton, SubtleButton } from "@/components/ThemedButton";
import { ButtonTextTheme } from "@/components/ThemedText";
import { GreenHeading } from "@/components/ThemedView";
import { EntryCard } from "@/features/dictionary/EntryCard";
import { ListingDescription } from "@/features/dictionary/ListingDescription";
import { useDictionary } from "@/hooks/useDictionary";
import { theme } from "@/themes/global";
import { DictionaryListing, ExpressionType, getExpressionType } from "@/types/dictionary";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function Route() {
  const { extype } = useLocalSearchParams<{ extype: ExpressionType }>()
  const { data } = useDictionary();
  const results = data?.body?.listings?.filter((entry) => entry.type === extype) || [];
  const [viewEntry, setViewEntry] = useState<DictionaryListing | null>(null);

  const { title } = getExpressionType(extype);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 24 }}>
      <HeaderBack viewEntry={!!viewEntry} onBack={() => setViewEntry(null)} />
      <GreenHeading>{title}</GreenHeading>
      {!viewEntry ? (
        <DictionaryListView results={results} onSelectEntry={setViewEntry} extype={extype} />
      ) : (
        <ListingDescription entry={viewEntry} onUpdate={() => setViewEntry(null)} />
      )}
    </View>
  );
}


function DictionaryListView({ results, onSelectEntry, extype }: {
  results: DictionaryListing[],
  onSelectEntry: (entry: DictionaryListing) => void,
  extype: ExpressionType
}) {
  return (
    <>
      <ScrollView>
        {results.map((entry) => (
          <EntryCard key={entry.id} entry={entry} onClick={() => onSelectEntry(entry)} />
        ))}
      </ScrollView>
      <SmallButtonContainer>
        <AddButton href={{ pathname: "/dictionary/viewList/[extype]/add", params: { extype } }} />
      </SmallButtonContainer>
    </>
  );
}

function HeaderBack({ viewEntry, onBack }: { viewEntry: boolean, onBack: () => void }) {
  return (
    <BackButtonContainer>
      {viewEntry ? (
        <SubtleButton onPress={onBack}>
          <ButtonTextTheme>&lt;  이전</ButtonTextTheme>
        </SubtleButton>
      ) : (
        <BackButton />
      )}
    </BackButtonContainer>
  );
}
