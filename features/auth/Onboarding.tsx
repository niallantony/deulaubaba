import { ButtonContainer } from "@/components/ButtonContainer"
import { ThemedButton } from "@/components/ThemedButton"
import { SemiboldText, StyledText } from "@/components/ThemedText"

export const Onboarding = ({ onPress }: { onPress: () => void }) => {
  return (
    <>
      <SemiboldText>처음 오셨군요!</SemiboldText>
      <StyledText>간단한 정보를 입력해 볼까요?</StyledText>
      <ButtonContainer width={150}>
        <ThemedButton
          text="다음"
          onPress={onPress}
          type="green"
        />
      </ButtonContainer>


    </>
  )
}
