import { ProjectForm } from "@/features/project/ProjectForm";
import { ProjectTypeSelect } from "@/features/project/ProjectTypeSelect";
import { ProjectUsersPick } from "@/features/project/ProjectUsersPick";
import { useUserRibbon } from "@/hooks/useUserRibbon";
import { useStudentStore } from "@/store/currentStudent";
import { ProjectDetails, ProjectPostDTO, ProjectType } from "@/types/project";
import { useEffect, useState } from "react";
import API from "@/api/project"
import { View, Text } from "react-native";

export default function Root() {
  const [type, setType] = useState<ProjectType | null>(null);
  const [details, setDetails] = useState<ProjectDetails>();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [screen, setScreen] = useState<"DETAILS" | "USERS" | "TYPE">("TYPE")

  const student = useStudentStore((s) => s.student)
  const { users, fetchUsers } = useUserRibbon();


  useEffect(() => {
    fetchUsers(student!.studentId)
    console.log(users)
  }, [student])

  const handleSubmit = () => {
    if (!type || !student?.studentId || !details) return;
    const postRequest: ProjectPostDTO = {
      ...details,
      usernames: selectedUsers,
      projectType: type,
      studentId: student?.studentId
    }
    API.postProject(postRequest)

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
        setSelected={(username: string) => {
          const updated = selectedUsers.includes(username) ?
            selectedUsers.filter((u) => u !== username) :
            [...selectedUsers, username];
          setSelectedUsers(updated);
        }}
        onBack={() => setScreen("DETAILS")}
        onSubmit={() => handleSubmit()}
      />
    )
  }

  return (
    <View><Text>No Screen...</Text></View>
  )
}
