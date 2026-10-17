import { useStudentStore } from "@/store/currentStudent"
import { useQuery } from "@tanstack/react-query"
import API from "@/api/student";

export const useSelectedStudent = () => {
  const studentId = useStudentStore((s) => s.studentId)

  return useQuery({
    queryKey: ['student-data', studentId],
    queryFn: () => {
      if (!studentId) throw new Error("No student selected");
      return API.getStudentFromCode(studentId);
    },
    enabled: !!studentId,
  })
}
