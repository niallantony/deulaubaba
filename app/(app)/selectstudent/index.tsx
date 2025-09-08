import { DividerWithTitle } from "@/components/Divider";
import { StudentList } from "@/components/StudentList";
import { SemiboldText } from "@/components/ThemedText";
import { FullView } from "@/components/ThemedView";
import { NoStudent } from "@/features/student/NoStudent";
import { useStudents } from "@/hooks/useStudents";
import { useStudentStore } from "@/store/currentStudent";

export default function SelectStudent() {
  const { data } = useStudents();
  const student = useStudentStore((s) => s.student);

  if (!data?.students) {
    return (<NoStudent />)
  }
  return (
    <FullView>
      <SemiboldText style={{ paddingLeft: 24, width: "100%", textAlign: "left" }}>학생 선택해 주세요</SemiboldText>
      <DividerWithTitle title={"학생 목록"} />
      <StudentList studentsData={data} selectedStudent={student} />
    </FullView>
  )

}
