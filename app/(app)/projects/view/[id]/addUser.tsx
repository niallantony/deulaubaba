
import { ErrorText } from "@/components/ThemedText";
import { ProjectUsersPick } from "@/features/project/ProjectUsersPick";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useCurrentProject } from "@/hooks/useProject";
import { useUserRibbon } from "@/hooks/useUserRibbon";
import { useStudentStore } from "@/store/currentStudent";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Root() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { query, addUsers } = useCurrentProject({ id })
  const student = useStudentStore(s => s.student)
  const router = useRouter();
  const project = query.data
  const [selected, setSelected] = useState<string[] | undefined>(project?.userStatuses.map(user => user.user.username))
  const { users, fetchUsers } = useUserRibbon();
  const { data } = useCurrentUser()


  useEffect(() => {
    fetchUsers(student!.studentId)
  }, [student])


  if (!project) return (
    (<ErrorText>No Project!</ErrorText>)

  )

  const handleSubmit = () => {
    if (selected) {
      addUsers.mutate(selected);
    }
    router.back()
  }

  const onSetSelected = (username: string) => {
    if (username === data?.user?.username) return; // TODO: Put toast here
    const updated = selected!.includes(username) ? selected! : [...selected!, username];
    setSelected(updated);

  }

  return (
    <ProjectUsersPick
      users={users}
      selected={selected!}
      setSelected={(username: string) => onSetSelected(username)}
      onBack={() => router.back()}
      onSubmit={handleSubmit}
    />
  )
}
