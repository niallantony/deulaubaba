import { BigButton, LinkButton } from "@/components/ThemedButton";
import { ButtonTextWhite, } from "@/components/ThemedText"
import { PageTitleView } from "@/components/ThemedView";
import { View } from "react-native";

export type HasCodeActions = {
  inputCode: () => void;
  makeCode: () => void;
}

export const HasCode = ({ inputCode, makeCode }: HasCodeActions) => {
  return (
    <PageTitleView
      title={"학생 코드가 있나요? "}
    >
      <View style={{ paddingHorizontal: 42, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BigButton accessibilityLabel="학생 코드 만들기" onPress={makeCode}>
          <ButtonTextWhite>없다면</ButtonTextWhite>
          <ButtonTextWhite>학생 코드 만들기</ButtonTextWhite>
        </BigButton>
        <BigButton accessibilityLabel="학생 코드 입력하기" onPress={inputCode}>
          <ButtonTextWhite>있다면</ButtonTextWhite>
          <ButtonTextWhite>학생 코드 입력하기</ButtonTextWhite>
        </BigButton>
        <LinkButton
          text="홈으로"
          href={'/'}
          type="bare"
        />
      </View>
    </PageTitleView>

  )
}
