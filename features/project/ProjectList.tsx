import { AllProjectsResponse } from "@/api/project";
import { ProjectBriefCard } from "@/components/Projects/ProjectBriefCard";
import { ErrorText } from "@/components/ThemedText";
import { NoProjects } from "@/components/Projects/NoProjects";
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

  const projects: ProjectPreview[] | undefined = data[status]

  if (!projects || projects.length === 0) {
    return (<NoProjects />)
  }

  return (
    <>
      {projects.map(project => (
        <ProjectBriefCard key={project.id} project={project} onPress={() => handlePress(project.id)} />
      ))}
    </>

  )


}
