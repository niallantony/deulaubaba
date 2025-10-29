import { useStudentStore } from "@/store/currentStudent"
import API from "@/api/feed";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react";

export const useStudentFeed = () => {
  const student = useStudentStore((s) => s.student)
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0)

  const nextPage = () => {
    if (data?.body?.hasNext) {
      setPage(page + 1)
    }
  }

  const create = useMutation({
    mutationFn: API.postFeed,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['feed'] })
  })

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
    nextPage,
    create
  }
}
