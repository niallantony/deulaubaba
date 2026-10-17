import { useQuery } from "@tanstack/react-query"
import API from "@/api/dictionary"
import { useStudentStore } from "@/store/currentStudent"

export const useDictionary = () => {
  const studentId = useStudentStore((s) => s.studentId)

  return useQuery({
    queryKey: ['dictionary', studentId],
    queryFn: () => {
      if (!studentId) throw new Error("No student selected");
      return API.getDictionaryListings(studentId)
    },
    enabled: !!studentId
  })
}
