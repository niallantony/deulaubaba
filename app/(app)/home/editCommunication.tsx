import { ButtonContainer } from "@/components/ButtonContainer";
import { BackHeader, ThemedButton } from "@/components/ThemedButton";
import { ThemedTextArea } from "@/components/ThemedInput"
import { useSelectedStudent } from "@/hooks/useSelectedStudent"
import { useUpdateStudent } from "@/hooks/useUpdateStudent";
import { theme } from "@/themes/global";
import { Student } from "@/types/student";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function Route() {
  const { data } = useSelectedStudent();
  const { updateCommunication } = useUpdateStudent();
  const router = useRouter();
  const initial = data?.student?.communicationDetails ?? ""
  const [content, setContent] = useState(initial);

  const onSubmit = () => {
    const student: Pick<Student, "communicationDetails" | "studentId"> = {
      communicationDetails: content,
      studentId: data?.student?.studentId,
    }
    updateCommunication.mutate(student)
    router.dismissAll();
  }
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
        rows={8}
      />
      {content !== initial && (
        <ButtonContainer width={150}>
          <ThemedButton
            text={"등록하기"}
            type="green"
            onPress={onSubmit}
          />
        </ButtonContainer>
      )}
    </KeyboardAwareScrollView>

  )
}
