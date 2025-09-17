import { ButtonContainer } from "@/components/ButtonContainer"
import { InputCode } from "@/components/CodeInput"
import { ThemedButton } from "@/components/ThemedButton"
import { ErrorText } from "@/components/ThemedText"
import { PageTitleView } from "@/components/ThemedView"
import { useState } from "react"
import { View } from "react-native"

export type InputStudentCodeProps = {
  onSubmit: (code: string) => void;
  onBack: () => void;
  error: string | null;
}

export const InputStudentCode = ({ onSubmit, onBack, error }: InputStudentCodeProps) => {
  const [code, setCode] = useState("")
  const [inputError, setInputError] = useState("")

  const handleSubmit = () => {
    if (code.length < 6) {
      setInputError("글자 6 자리 입력해 주세요")
      return
    }
    setInputError("")
    onSubmit(code);
  }

  return (
    <PageTitleView
      title={"학생 코드 입력하세요"}
      style={{ justifyContent: 'space-between', paddingVertical: 164 }}
    >
      <InputCode
        error={!!(error || inputError)}
        code={code}
        setCode={setCode}
        length={6}
      />
      <View style={{ alignItems: 'center', marginTop: 12 }}>
        {inputError ?
          (<ErrorText>{inputError}</ErrorText>) :
          error ? (<ErrorText>{error}</ErrorText>) :
            null
        }
      </View>

      <View style={{ marginTop: 32, justifyContent: 'center', alignItems: 'center' }}>
        <ButtonContainer width={150}>
          <ThemedButton
            text={"확인"}
            type={"green"}
            onPress={handleSubmit}
            accessibilityLabel="확인"
            testID="submit-code"
          />
          <ThemedButton
            onPress={onBack}
            type="bare"
            text={"뒤로"}
            accessibilityLabel="취소"
          />
        </ButtonContainer>
      </View>
    </PageTitleView>
  )
}
