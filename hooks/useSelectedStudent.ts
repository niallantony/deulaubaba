import { useStudentStore } from "@/store/currentStudent"
import { useQuery } from "@tanstack/react-query"
import API from "@/api/student";

export const useSelectedStudent = () => {
  const student = useStudentStore((s) => s.student)

  return useQuery({
    queryKey: ['student-data', student?.studentId],
    queryFn: () => {
      if (!student) throw new Error("No student selected");
      return API.getStudentFromCode(student.studentId);
    },
    enabled: !!student,
  })
}
