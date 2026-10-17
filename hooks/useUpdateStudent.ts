import API from "@/api/student"
import { Student } from "@/types/student";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  const updateDetails = useMutation({
    mutationFn: (student: Omit<Student, "communicationDetails" | "challengesDetails">) => API.putStudentInfo(student),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['student-data', variables.studentId] })
    }
  })

  const updateCommunication = useMutation({
    mutationFn: (student: Pick<Student, "communicationDetails" | "studentId">) => API.putStudentCommunication(student),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['student-data', variables.studentId] })
    }
  })

  const updateChallenge = useMutation({
    mutationFn: (student: Pick<Student, "challengesDetails" | "studentId">) => API.putStudentChallenge(student),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['student-data', variables.studentId] })
    }
  })

  return {
    updateDetails,
    updateCommunication,
    updateChallenge
  }
}
