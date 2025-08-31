import API from "@/api/student";
import { useQuery } from "@tanstack/react-query";

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: API.getAllStudents,
  })
}
