import { AllProjectsResponse } from "@/api/project";
import { NoProjects } from "@/components/Projects/NoProjects";
import { ProjectBriefCard } from "@/components/Projects/ProjectBriefCard";
import { ErrorText } from "@/components/ThemedText";
import { ProjectPreview } from "@/types/project";
import { useRouter } from "expo-router";

export const ProjectList = ({ data, status }: {
  data: AllProjectsResponse,
  status: "pending" | "current" | "completed"
}) => {

  const router = useRouter();

  const handlePress = (id: number) => {
    router.push(`/(app)/projects/view/${id}`)


  }

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

  const projects: ProjectPreview[] = data[status]

  return (
    <>
      {projects.map(project => (
        <ProjectBriefCard key={project.id} project={project} onPress={() => handlePress(project.id)} />
      ))}
    </>

  )


}
