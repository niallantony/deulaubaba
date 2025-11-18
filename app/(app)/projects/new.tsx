import { ProjectForm } from "@/features/project/ProjectForm";
import { ProjectTypeSelect } from "@/features/project/ProjectTypeSelect";
import { ProjectUsersPick } from "@/features/project/ProjectUsersPick";
import { useUserRibbon } from "@/hooks/useUserRibbon";
import { useStudentStore } from "@/store/currentStudent";
import { ProjectDetails, ProjectPostDTO, ProjectType } from "@/types/project";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useProject } from "@/hooks/useProject";
import { useRouter } from "expo-router";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Root() {
  const { data } = useCurrentUser();

  const [type, setType] = useState<ProjectType | null>(null);
  const [details, setDetails] = useState<ProjectDetails>();
  const [selectedUsers, setSelectedUsers] = useState<string[]>(data?.user?.username ? [data.user.username] : [])
  const [screen, setScreen] = useState<"DETAILS" | "USERS" | "TYPE">("TYPE")
  const { create } = useProject();
  const router = useRouter()

  const student = useStudentStore((s) => s.student)
  const { users, fetchUsers } = useUserRibbon();


  useEffect(() => {
    fetchUsers(student!.studentId)
  }, [student])

  const handleSubmit = () => {
    if (!type || !student?.studentId || !details) return;
    const postRequest: ProjectPostDTO = {
      ...details,
      usernames: selectedUsers,
      type: type,
      studentId: student?.studentId
    }
    create.mutate(postRequest);
    if (create.isSuccess) {
      router.dismissAll()
    }
  }

  const onSetSelectedUsers = (username: string) => {
    if (username === data?.user?.username) return; // TODO: Put toast here
    const updated = selectedUsers.includes(username) ?
      selectedUsers.filter((u) => u !== username) :
      [...selectedUsers, username];
    setSelectedUsers(updated);

  }

  if (screen === "DETAILS") {
    return (
      <ProjectForm
        onBack={() => setScreen("TYPE")}
        onSubmit={(details) => {
          setDetails(details);
          setScreen("USERS")
        }}
      />
    )
  }

  if (screen === "TYPE") {
    return (
      <ProjectTypeSelect onSelect={(type) => {
        setType(type);
        setScreen("DETAILS")
      }} />
    )
  }

  if (screen === "USERS") {
    return (
      <ProjectUsersPick
        users={users}
        selected={selectedUsers}
        setSelected={(username: string) => onSetSelectedUsers(username)}
        onBack={() => setScreen("DETAILS")}
        onSubmit={() => handleSubmit()}
      />
    )
  }

  return (
    <View><Text>No Screen...</Text></View>
  )
}
