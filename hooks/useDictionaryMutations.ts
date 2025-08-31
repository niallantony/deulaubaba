import { useMutation, useQueryClient } from "@tanstack/react-query"
import API from "@/api/dictionary"


export const useDictionaryMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: API.postDictionary,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dictionary'] }),
  })

  const update = useMutation({
    mutationFn: API.putDictionary,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dictionary'] }),
  })

  const remove = useMutation({
    mutationFn: API.deleteDictionary,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dictionary'] })
  })

  return {
    create,
    update,
    remove
  }

}
