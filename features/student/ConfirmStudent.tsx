import { StudentAvatar } from "@/components/StudentAvatar";
import { ThemedButton } from "@/components/ThemedButton";
import { LightText, SemiboldText } from "@/components/ThemedText";
import { FullView } from "@/components/ThemedView";
import { Student } from "@/types/student";
import { styled } from "styled-components/native";

const ConfirmPage = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;

`

const ConfirmText = styled.View`
  margin-bottom: ${props => props.theme.spacing.default};
`

export const ConfirmStudent = ({ student, onConfirm }: { student: Pick<Student, "studentId" | "name" | "imagesrc"> | null; onConfirm: () => void }) => {
  return (
    <FullView>
      {student &&
        (
          <ConfirmPage>
            <StudentAvatar style="round" url={student.imagesrc} width={64} height={64} />
            <ConfirmText>
              <SemiboldText>Add student {student.name}?</SemiboldText>
            </ConfirmText>
            <ThemedButton
              text={"Confirm"}
              type="green"
              onPress={onConfirm}
            />
          </ConfirmPage>
        )
      }
      {
        !student &&
        (<LightText>Error, no student found</LightText>)
      }
    </FullView >
  )
}
