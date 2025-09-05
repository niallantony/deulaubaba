import { CenterText, TitleText } from "@/components/ThemedText"
import { FullView } from "@/components/ThemedView";
// @ts-ignore
import complete from "@/assets/images/complete.png"
import { Image, View } from "react-native";
import { ThemedButton } from "@/components/ThemedButton";


export const RegistrationComplete = ({ onPress }: { onPress: () => void }) => {
  return (
    <FullView>
      <TitleText>완료됐습니다!</TitleText>
      <View style={{ margin: 32 }}>
        <Image source={complete} style={{ width: 64, height: 64 }} />
      </View>
      <CenterText>
        <ThemedButton
          type="green"
          text="시작"
          onPress={onPress}
        />
      </CenterText>
    </FullView>
  )
}
