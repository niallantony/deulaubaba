import { BigButtonContainer } from "@/components/ButtonContainer";
import { BigButton } from "@/components/ThemedButton";
import { ButtonTextWhite } from "@/components/ThemedText"
import { FormView, PageTitleView } from "@/components/ThemedView";

export type HasCodeActions = {
  inputCode: () => void;
  makeCode: () => void;
}

export const HasCode = ({ inputCode, makeCode }: HasCodeActions) => {
  return (
    <PageTitleView
      title={"학생 코드가 있나요? "}
    >
      <BigButtonContainer>
        <BigButton onPress={makeCode}>
          <ButtonTextWhite>있다면</ButtonTextWhite>
          <ButtonTextWhite>학생 코드 만들기</ButtonTextWhite>
        </BigButton>
        <BigButton onPress={inputCode}>
          <ButtonTextWhite>없다면</ButtonTextWhite>
          <ButtonTextWhite>학생 코드 입력하기</ButtonTextWhite>
        </BigButton>
      </BigButtonContainer>
    </PageTitleView>

  )
}
