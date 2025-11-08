import { StudentBorder } from "@/components/StudentBorder";
import { Feed } from "@/features/Feed";
import { useModal } from "@/hooks/useModal";
import { useStudentStore } from "@/store/currentStudent";

export default function Root() {

  const { show } = useModal()

  const student = useStudentStore((s) => s.student)


  return (
    <StudentBorder
      title={"Good Morning :)"}
      subtitle={`${student?.name} 아침은 어떤가요?`}
      student={student}
      showModal={show}
    >
      <Feed student={student} />
    </StudentBorder>
  )
}
