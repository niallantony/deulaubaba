import { ButtonContainer } from "@/components/ButtonContainer"
import { InputCode } from "@/components/CodeInput"
import { ThemedButton } from "@/components/ThemedButton"
import { StyledLink } from "@/components/ThemedLink"
import { LinkText } from "@/components/ThemedText"
import { PageTitleView } from "@/components/ThemedView"
import { useRouter } from "expo-router"
import { useState } from "react"

export type InputStudentCodeProps = {
  onSubmit: (code: string) => void;
}

export const InputStudentCode = ({ onSubmit }: InputStudentCodeProps) => {
  const [code, setCode] = useState("")
  const router = useRouter();

  const handleSubmit = () => {
    onSubmit(code);
  }

  return (
    <PageTitleView
      title={"학생 코드 입력하세요"}
    >
      <InputCode
        code={code}
        setCode={setCode}
        length={6}
      />
      <ButtonContainer>
        <ThemedButton text={"확인"} type={"green"} onPress={handleSubmit} />
        <StyledLink
          onPress={() => router.dismissAll()}
          $margin="24px"
        >
          <LinkText $size="md">홈으로</LinkText>
        </StyledLink>
      </ButtonContainer>
    </PageTitleView>
  )
}
