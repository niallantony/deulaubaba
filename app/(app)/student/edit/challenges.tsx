import { ButtonContainer } from "@/components/ButtonContainer";
import { ThemedButton } from "@/components/ThemedButton";
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
  const { updateChallenge } = useUpdateStudent()
  const router = useRouter();
  const initial = data?.student?.challengesDetails ?? ""
  const [content, setContent] = useState(initial);

  const onSubmit = () => {
    const student: Pick<Student, "challengesDetails" | "studentId"> = {
      challengesDetails: content,
      studentId: data?.student?.studentId,
    }
    updateChallenge.mutate(student)
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
      <ThemedTextArea
        label={"주요 도전행동특성"}
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
