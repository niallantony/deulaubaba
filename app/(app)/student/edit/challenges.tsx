import { ButtonContainer } from "@/components/ButtonContainer";
import { BackHeader, ThemedButton } from "@/components/ThemedButton";
import { ThemedTextArea } from "@/components/ThemedInput"
import { useSelectedStudent } from "@/hooks/useSelectedStudent"
import { theme } from "@/themes/global";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function Route() {
  const { data } = useSelectedStudent();
  const initial = data?.student?.challengesDetails ?? ""
  const [content, setContent] = useState(initial);
  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: theme.colors.background
      }}
      contentContainerStyle={{
        backgroundColor: theme.colors.background,
        paddingHorizontal: 24
      }}>
      <BackHeader />
      <ThemedTextArea
        label={"주요 의사소통특성"}
        value={content}
        onChange={setContent}
        height={8}
      />
      {content !== initial && (
        <ButtonContainer width={150}>
          <ThemedButton
            text={"등록하기"}
            type="green"
            onPress={() => { }}
          />
        </ButtonContainer>
      )}
    </KeyboardAwareScrollView>

  )
}
