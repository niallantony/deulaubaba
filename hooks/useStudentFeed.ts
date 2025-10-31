import { useStudentStore } from "@/store/currentStudent"
import API from "@/api/feed";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useStudentFeed = () => {
  const student = useStudentStore((s) => s.student)
  const queryClient = useQueryClient();



  const fetchFeed = ({ pageParam = 0 }) => {
    if (!student?.studentId) throw new Error("No student selected");
    return API.getFeed(student?.studentId, pageParam)
  }

  const create = useMutation({
    mutationFn: API.postFeed,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['feed'] })
  })

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['feed', student],
    queryFn: fetchFeed,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined;
    }
  })

  return {
    data,
    isFetchingNextPage,
    fetchNextPage,
    create
  }
}
