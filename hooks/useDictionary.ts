import { useQuery } from "@tanstack/react-query"
import API from "@/api/dictionary"
import { useStudentStore } from "@/store/currentStudent"

export const useDictionary = () => {
  const student = useStudentStore((s) => s.student)

  return useQuery({
    queryKey: ['dictionary', student],
    queryFn: () => {
      if (!student) throw new Error("No student selected");
      return API.getDictionaryListings(student?.studentId)
    },
    enabled: !!student
  })
}
