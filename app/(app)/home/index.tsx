import { FullView } from "@/components/ThemedView";
import { UserToolbar } from "@/components/UserToolbar";
import { NoSelectedStudent } from "@/features/student/NoSelectedStudent";
import { StudentProfile } from "@/features/student/StudentProfile";
import { useSelectedStudent } from "@/hooks/useSelectedStudent";
import { useStudentStore } from "@/store/currentStudent";
import { useRouter } from "expo-router";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ActivityIndicator } from "react-native";

export default function Index() {
  const student = useStudentStore(s => s.student)
  const { data } = useSelectedStudent();
  const router = useRouter();

  const { data: userData, isLoading } = useCurrentUser();

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
