import { useQuery } from "@tanstack/react-query"
import API from '@/api/user'
import { useAuth } from "@/auth/AuthProvider"

export const useCurrentUser = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['user', user?.sub],
    queryFn: API.getUser,
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
    retry: 1,
  })
}
