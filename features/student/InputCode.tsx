import { ButtonContainer } from "@/components/ButtonContainer"
import { InputCode } from "@/components/CodeInput"
import { ThemedButton } from "@/components/ThemedButton"
import { PageTitleView } from "@/components/ThemedView"
import { useState } from "react"
import { View } from "react-native"

export type InputStudentCodeProps = {
  onSubmit: (code: string) => void;
  onBack: () => void;
}

export const InputStudentCode = ({ onSubmit, onBack }: InputStudentCodeProps) => {
  const [code, setCode] = useState("")

  const handleSubmit = () => {
    onSubmit(code);
  }

  return (
    <PageTitleView
      title={"학생 코드 입력하세요"}
      style={{ justifyContent: 'space-between', paddingVertical: 164 }}
    >
      <InputCode
        code={code}
        setCode={setCode}
        length={6}
      />
      <View style={{ marginTop: 32, justifyContent: 'center', alignItems: 'center' }}>
        <ButtonContainer width={150}>
          <ThemedButton text={"확인"} type={"green"} onPress={handleSubmit} />
          <ThemedButton
            onPress={onBack}
            type="bare"
            text={"뒤로"}
          />
        </ButtonContainer>
      </View>
    </PageTitleView>
  )
}
