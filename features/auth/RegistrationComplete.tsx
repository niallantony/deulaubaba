import { CenterText, TitleText } from "@/components/ThemedText"
import { FullView } from "@/components/ThemedView";
// @ts-ignore
import complete from "@/assets/images/complete.png"
import { Image } from "react-native";
import { styled } from "styled-components/native";
import { ThemedButton } from "@/components/ThemedButton";
import { useUser } from "@/context/UserContext";

const CompleteImage = styled.View`
  margin: ${props => props.theme.spacing.large};
`

export const RegistrationComplete = () => {
  const { getUser } = useUser();

  const onPress = () => {
    getUser();
  }

  return (
    <FullView>
      <TitleText>완료됐습니다!</TitleText>
      <CompleteImage>
        <Image source={complete} style={{ width: 64, height: 64 }} />
      </CompleteImage>
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
