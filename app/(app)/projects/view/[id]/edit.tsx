import { ErrorText } from "@/components/ThemedText";
import { ProjectForm } from "@/features/project/ProjectForm";
import { useCurrentProject } from "@/hooks/useProject";
import { ProjectDetails } from "@/types/project";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Root() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { query, updateDetails } = useCurrentProject({ id })
  const router = useRouter();
  const project = query.data

  if (!project) return (
    (<ErrorText>No Project!</ErrorText>)

  )

  const handleSubmit = (details: ProjectDetails) => {
    updateDetails.mutate(details);
    router.back()
  }


  return (
    <ProjectForm project={project} onSubmit={handleSubmit} onBack={() => router.back()} />
  )
}
