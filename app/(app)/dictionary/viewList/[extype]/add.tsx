import { BackButton } from "@/components/ThemedButton";
import { GreenHeading } from "@/components/ThemedView";
import { DictionaryForm } from "@/features/dictionary/DictionaryForm";
import { theme } from "@/themes/global";
import { DictionaryPosting, ExpressionType, getExpressionType } from "@/types/dictionary";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import { useDictionaryMutations } from "@/hooks/useDictionaryMutations";


export default function Route() {
  const { extype } = useLocalSearchParams<{ extype: ExpressionType }>()
  const { create } = useDictionaryMutations();

  const { title } = getExpressionType(extype);

  const router = useRouter();

  const handleSubmit = (listing: DictionaryPosting) => {
    create.mutate(listing);
    router.dismissAll();
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 24 }}>
      <View style={{ flexDirection: "row" }}>
        <BackButton />
      </ View>
      <GreenHeading>{title}</GreenHeading>
      <DictionaryForm type={extype} onSubmit={handleSubmit} />


    </View>
  )
}
