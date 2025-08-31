import { useQuery } from "@tanstack/react-query"
import API from '@/api/user'

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: API.getUser,
    staleTime: 1000 * 60 * 5,
  })
}
