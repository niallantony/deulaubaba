import { StudentAvatar } from "@/components/StudentAvatar";
import { ThemedButton } from "@/components/ThemedButton";
import { ErrorText, LightText, SemiboldText } from "@/components/ThemedText";
import { FullView } from "@/components/ThemedView";
import { Student } from "@/types/student";
import { View } from "react-native";

export const ConfirmStudent = ({ student, onConfirm, error }: {
  student: Pick<Student, "studentId" | "name" | "imagesrc"> | null;
  onConfirm: () => void;
  error?: string | null;
}) => {
  return (
    <FullView>
      {student &&
        (
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <StudentAvatar style="round" url={student.imagesrc} width={64} height={64} />
            <View style={{ marginBottom: 24 }}>
              <SemiboldText>{student.name} 학생을 추가하시겠습니까?</SemiboldText>
            </View>
            <ThemedButton
              text={"확인"}
              type="green"
              onPress={onConfirm}
            />
            {error && (<ErrorText>{error}</ErrorText>)}
          </View>
        )
      }
      {
        !student &&
        (<LightText>오류: 학생을 찾을 수 없습니다</LightText>)
      }
    </FullView >
  )
}
