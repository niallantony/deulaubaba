import { Student } from "@/types/student";
import { useRouter } from "expo-router";
import { useUpdateStudent } from "@/hooks/useUpdateStudent";
import { useSelectedStudent } from "@/hooks/useSelectedStudent";
import { StudentForm } from "@/features/student/StudentForm";

export default function EditStudent() {
  const { data } = useSelectedStudent();
  const student = data?.student ?? undefined
  const { updateDetails } = useUpdateStudent();
  const router = useRouter()



  const handleSubmit = (student: Omit<Student, "communicationDetails" | "challengesDetails">) => {
    updateDetails.mutate(student)
    router.dismissAll()
  }

  const handleCancel = () => {
    router.dismissAll()
  }

  return (
    <StudentForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      student={student}
    />
  )


}
