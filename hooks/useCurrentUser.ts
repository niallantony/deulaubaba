import { useQuery } from "@tanstack/react-query"
import API from '@/api/user'
import { useAuth0 } from "react-native-auth0"

export const useCurrentUser = () => {
  const { user } = useAuth0();
  return useQuery({
    queryKey: ['user'],
    queryFn: API.getUser,
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
    retry: 1,
  })
}
