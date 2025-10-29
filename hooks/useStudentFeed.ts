import { useStudentStore } from "@/store/currentStudent"
import API from "@/api/feed";
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";

export const useStudentFeed = () => {
  const student = useStudentStore((s) => s.student)

  const [page, setPage] = useState(0)

  const nextPage = () => {
    if (data?.body?.hasNext) {
      setPage(page + 1)
    }
  }

  const { data } = useQuery({
    queryKey: ['feed', student, page],
    queryFn: () => {
      if (!student) throw new Error("No student selected");
      return API.getFeed(student.studentId, page)
    },
    enabled: !!student
  })

  return {
    data,
    nextPage
  }
}
