import { StudentBorder } from "@/components/StudentBorder";
import { Feed } from "@/features/Feed";
import { useCurrentStudent } from "@/hooks/useCurrentStudent";

export default function Root() {

  const student = useCurrentStudent()


  return (
    <StudentBorder
      title={"Good Morning :)"}
      subtitle={`${student?.name} 아침은 어떤가요?`}
      student={student}
    >
      <Feed studentId={student?.studentId ?? null} />
    </StudentBorder>
  )
}
