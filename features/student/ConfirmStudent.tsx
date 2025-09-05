import { StudentAvatar } from "@/components/StudentAvatar";
import { ThemedButton } from "@/components/ThemedButton";
import { LightText, SemiboldText } from "@/components/ThemedText";
import { FullView } from "@/components/ThemedView";
import { Student } from "@/types/student";
import { View } from "react-native";

export const ConfirmStudent = ({ student, onConfirm }: { student: Pick<Student, "studentId" | "name" | "imagesrc"> | null; onConfirm: () => void }) => {
  return (
    <FullView>
      {student &&
        (
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <StudentAvatar style="round" url={student.imagesrc} width={64} height={64} />
            <View style={{ marginBottom: 24 }}>
              <SemiboldText>Add student {student.name}?</SemiboldText>
            </View>
            <ThemedButton
              text={"Confirm"}
              type="green"
              onPress={onConfirm}
            />
          </View>
        )
      }
      {
        !student &&
        (<LightText>Error, no student found</LightText>)
      }
    </FullView >
  )
}
