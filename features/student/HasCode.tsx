import { BigButtonContainer } from "@/components/ButtonContainer";
import { BigButton } from "@/components/ThemedButton";
import { StyledLink } from "@/components/ThemedLink";
import { ButtonTextWhite, LinkText } from "@/components/ThemedText"
import { PageTitleView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { View } from "react-native";

export type HasCodeActions = {
  inputCode: () => void;
  makeCode: () => void;
}

export const HasCode = ({ inputCode, makeCode }: HasCodeActions) => {
  const router = useRouter();
  return (
    <PageTitleView
      title={"학생 코드가 있나요? "}
    >
      <BigButtonContainer>
        <BigButton accessibilityLabel="학생 코드 만들기" onPress={makeCode}>
          <ButtonTextWhite>없다면</ButtonTextWhite>
          <ButtonTextWhite>학생 코드 만들기</ButtonTextWhite>
        </BigButton>
        <BigButton accessibilityLabel="학생 코드 입력하기" onPress={inputCode}>
          <ButtonTextWhite>있다면</ButtonTextWhite>
          <ButtonTextWhite>학생 코드 입력하기</ButtonTextWhite>
        </BigButton>
        <StyledLink
          onPress={() => router.dismissAll()}
          $margin="12px"
        >
          <LinkText $size="md">홈으로</LinkText>
        </StyledLink>
      </BigButtonContainer>
    </PageTitleView>

  )
}
