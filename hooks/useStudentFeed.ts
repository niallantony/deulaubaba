import { useStudentStore } from "@/store/currentStudent"
import API, { PostFeedBody } from "@/api/feed";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useStudentFeed = () => {
  const studentId = useStudentStore((s) => s.studentId)
  const queryClient = useQueryClient();



  const fetchFeed = ({ pageParam = 0 }) => {
    if (!studentId) throw new Error("No student selected");
    return API.getFeed(studentId, pageParam)
  }

  const create = useMutation({
    mutationFn: (post: { id: string, body: PostFeedBody }) => API.postFeed(post),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['feed', studentId] }),
  })

  const deleteItem = useMutation({
    mutationFn: (id: string) => API.deleteFeedItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['feed', studentId] }),
  })

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['feed', studentId],
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
    create,
    deleteItem
  }
}
