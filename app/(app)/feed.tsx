import { StudentBorder } from "@/components/StudentBorder";
import { Feed } from "@/features/Feed";
import { useStudentStore } from "@/store/currentStudent";

export default function Root() {

  const student = useStudentStore((s) => s.student)


  return (
    <StudentBorder
      title={"Good Morning :)"}
      subtitle={`${student?.name} 아침은 어떤가요?`}
      student={student}
    >
      <Feed student={student} />
    </StudentBorder>
  )
}
