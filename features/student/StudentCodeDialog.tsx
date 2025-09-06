import { CenteredOverlay } from "@/components/CenteredOverlay";
import { StudentAvatar } from "@/components/StudentAvatar";
import { SubtitleText } from "@/components/ThemedText";
import { StudentIdAvatar } from "@/types/student";
import { Text } from "react-native";

export const StudentCodeModal = ({ student, onClose }: {
  student: StudentIdAvatar,
  onClose: () => void
}) => {


  return (
    <CenteredOverlay>
      <StudentAvatar
        url={student.imagesrc}
        width={128}
        height={128}
        style="round"
      />
      <Text style={{ marginTop: 12 }}>{student.name}의 학생 코드:</Text>
      <SubtitleText>{student?.studentId}</SubtitleText>
    </CenteredOverlay>

  );
};


