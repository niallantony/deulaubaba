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
  const studentId = useStudentStore(s => s.studentId)
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
      <UserToolbar studentSelected={!!studentId} data={userData} />
      <FullView >
        {!studentId && (<NoSelectedStudent />)}
        {data && (
          <StudentProfile
            data={data}
            onChallengesPress={handleChallengeRoute}
            onCommunicationPress={handleCommunicationRoute}
          />

        )}
      </FullView>

    </FullView>

  )
}
