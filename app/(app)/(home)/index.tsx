import { FullView } from "@/components/ThemedView";
import { UserToolbar } from "@/components/UserToolbar";
import { NoSelectedStudent } from "@/features/student/NoSelectedStudent";
import { StudentProfile } from "@/features/student/StudentProfile";
import { useSelectedStudent } from "@/hooks/useSelectedStudent";
import { useStudentStore } from "@/store/currentStudent";
import { useRouter } from "expo-router";

export default function Index() {
  const student = useStudentStore(s => s.student)
  const { data } = useSelectedStudent();
  const router = useRouter();
  const handleCommunicationRoute = () => {
    router.push('/editCommunication')
  }
  const handleChallengeRoute = () => {
    router.push('/editChallenge')
  }
  return (
    <FullView>
      <UserToolbar studentSelected={!!student} />
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
