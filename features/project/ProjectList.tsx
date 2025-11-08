import { AllProjectsResponse } from "@/api/project";
import { NoProjects } from "@/components/Projects/NoProjects";
import { ErrorText } from "@/components/ThemedText";
import { Project } from "@/types/project";
import { Text } from "react-native";

export const ProjectList = ({ data, status }: {
  data: AllProjectsResponse,
  status: "pending" | "current" | "completed"
}) => {

  if (!data) {
    return (<ErrorText>No Data</ErrorText>)
  }

  if (data.status !== 200 && data.status !== 204) {
    return (<ErrorText>{data.message}</ErrorText>)
  }

  if (data.status === 204) {
    return (<NoProjects />)
  }

  if (!data[status]) {
    return (<ErrorText>Status missing</ErrorText>)
  }

  const projects: Project[] = data[status]

  return (
    <>
      {projects.map(project => (
        <Text key={project.id}>{project.objective}</Text>
      ))}
    </>

  )


}
