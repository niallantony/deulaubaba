import { useStudentStore } from "@/store/currentStudent"
import { StudentIdAvatar } from "@/types/student"
import { useStudents } from "./useStudents"

// Name and avatar of the selected student, read from the cached student list.
export const useCurrentStudent = (): StudentIdAvatar | null => {
  const studentId = useStudentStore((s) => s.studentId)
  const { data } = useStudents()
  return data?.find((s) => s.studentId === studentId) ?? null
}
