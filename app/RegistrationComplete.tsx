import { CenterText, TitleText } from "@/components/ThemedText"
import { ThemedLink } from "@/components/ThemedLink";
import { FullView } from "@/components/ThemedView";

export const RegistrationComplete = () => {
  return (
    <FullView>
      <TitleText>Registration Complete!</TitleText>
      <CenterText>
        <ThemedLink size={"md"} text={"로그인"} href={"/"} />
      </CenterText>
    </FullView>
  )
}
