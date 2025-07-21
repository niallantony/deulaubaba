import { BackButtonContainer } from "@/components/ButtonContainer";
import { BackButton } from "@/components/ThemedButton";
import { GreenHeading } from "@/components/ThemedView";
import { useDictionary } from "@/context/DictionaryContext";
import { DictionaryForm } from "@/features/dictionary/DictionaryForm";
import { theme } from "@/themes/global";
import { DictionaryPosting, ExpressionType, getExpressionType } from "@/types/dictionary";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";


export default function Route() {
  const { extype } = useLocalSearchParams<{ extype: ExpressionType }>()
  const { postDictionary } = useDictionary();

  const { title } = getExpressionType(extype);

  const router = useRouter();

  const handleSubmit = (listing: DictionaryPosting) => {
    postDictionary(listing);
    router.dismissAll();
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <BackButtonContainer>
        <BackButton />
      </ BackButtonContainer>
      <GreenHeading>{title}</GreenHeading>
      <DictionaryForm type={extype} onSubmit={handleSubmit} />


    </View>
  )
}
