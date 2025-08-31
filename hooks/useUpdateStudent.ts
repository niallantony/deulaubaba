import API from "@/api/student"
import { Student } from "@/types/student";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (student: Student) => API.putStudent(student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students', 'student-data'] })
    },
    onError: (e) => {
      console.error("Failed to update student", e)
    }
  })
}
