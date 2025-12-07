import { FullView } from "@/components/ThemedView";
import { UserToolbar } from "@/components/UserToolbar";
import { NoSelectedStudent } from "@/features/student/NoSelectedStudent";
import { StudentProfile } from "@/features/student/StudentProfile";
import { useSelectedStudent } from "@/hooks/useSelectedStudent";
import { useStudentStore } from "@/store/currentStudent";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useAuth0 } from "react-native-auth0";
import API from "@/api/user"
import { ActivityIndicator } from "react-native";

export default function Index() {
  const { user } = useAuth0();
  const student = useStudentStore(s => s.student)
  const { data } = useSelectedStudent();
  const router = useRouter();

  const isLoggedIn = user && user.sub;

  const { data: userData, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: API.getUser,
    enabled: !!isLoggedIn,
  })

  const handleCommunicationRoute = () => {
    router.push('/home/editCommunication')
  }
  const handleChallengeRoute = () => {
    router.push('/home/editChallenge')
  }

  if (isLoading) return <ActivityIndicator />

  return (
    <FullView>
      <UserToolbar studentSelected={!!student} data={userData} />
      <FullView >
        {!student && (<NoSelectedStudent />)}
        {data?.student && (
          <StudentProfile
            data={data.student}
            onChallengesPress={handleChallengeRoute}
            onCommunicationPress={handleCommunicationRoute}
          />

        )}
      </FullView>

    </FullView>

  )
}
