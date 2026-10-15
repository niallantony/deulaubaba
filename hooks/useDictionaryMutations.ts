import { useMutation, useQueryClient } from "@tanstack/react-query"
import API from "@/api/dictionary"
import { DictionaryPosting } from "@/types/dictionary"


export const useDictionaryMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (dictionary: DictionaryPosting) => API.postDictionary(dictionary),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dictionary'] }),
  })

  const update = useMutation({
    mutationFn: (update: { dictionary: DictionaryPosting, id: number }) => API.putDictionary(update),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dictionary'] }),
  })

  const remove = useMutation({
    mutationFn: (id: number) => API.deleteDictionary(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dictionary'] })
  })

  return {
    create,
    update,
    remove
  }

}
