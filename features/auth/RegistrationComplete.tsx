import { CenterText, TitleText } from "@/components/ThemedText"
import { ThemedLink } from "@/components/ThemedLink";
import { FullView } from "@/components/ThemedView";
import complete from "@/assets/images/complete.png"
import { Image } from "react-native";
import { styled } from "styled-components";

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
        <ThemedLink size={"md"} text={"로그인"} href={"/sign-in"} />
      </CenterText>
    </FullView>
  )
}
