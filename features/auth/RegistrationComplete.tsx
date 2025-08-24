import { CenterText, TitleText } from "@/components/ThemedText"
import { ThemedLink } from "@/components/ThemedLink";
import { FullView } from "@/components/ThemedView";
// @ts-ignore
import complete from "@/assets/images/complete.png"
import { Image } from "react-native";
import { styled } from "styled-components/native";

const CompleteImage = styled.View`
  margin: ${props => props.theme.spacing.large};
`

export const RegistrationComplete = () => {
  return (
    <FullView>
      <TitleText>Registration Complete!</TitleText>
      <CompleteImage>
        <Image source={complete} style={{ width: 64, height: 64 }} />
      </CompleteImage>
      <CenterText>
        <ThemedLink margin={"0"} size={"md"} text={"로그인"} href={"/sign-in"} />
      </CenterText>
    </FullView>
  )
}
