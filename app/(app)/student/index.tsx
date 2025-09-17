import { NoSelectedStudent } from "@/features/student/NoSelectedStudent";
import { NoStudent } from "@/features/student/NoStudent";
import { StudentProfile } from "@/features/student/StudentProfile";
import { useSelectedStudent } from "@/hooks/useSelectedStudent";
import { useStudents } from "@/hooks/useStudents";
import { useRouter } from "expo-router";

export default function Student() {

  const { data: selected } = useSelectedStudent();
  const { data } = useStudents();
  const router = useRouter();

  const handleCommunicationRoute = () => {
    router.push('/student/edit/communication')
  }
  const handleChallengeRoute = () => {
    router.push('/student/edit/challenges')
  }

  if (!selected?.student && !data?.students) {
    return (
      <NoStudent />
    )
  }

  if (!selected?.student) {
    return (<NoSelectedStudent />)
  }


  return (
    <StudentProfile
      data={selected}
      onChallengesPress={handleChallengeRoute}
      onCommunicationPress={handleCommunicationRoute}
    />
  )
}
