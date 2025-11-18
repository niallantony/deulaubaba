import API from "@/api/project"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useProjectFeed = (id: string) => {
  const queryClient = useQueryClient();

  const getFeed = useQuery({
    queryKey: ['project-feed', id],
    queryFn: () => {
      return API.getProjectFeed(id)
    }
  })

  const comment = useMutation({
    mutationFn: (body: string) => {
      return API.postProjectComment({ id, body })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['project-feed', id] }),
    onError: (error, v, ctx) => {
      console.error("Error from mutation: ", error)
    }
  })

  const deleteComment = useMutation({
    mutationFn: (commentId: string) => {
      return API.deleteComment(commentId)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['project-feed', id] }),
    onError: (error, v, ctx) => {
      console.error(error)
    }
  })

  return {
    getFeed,
    comment,
    deleteComment
  }

}
