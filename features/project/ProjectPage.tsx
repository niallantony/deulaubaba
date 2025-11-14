import { ProjectDetails } from "@/components/Projects/ProjectDetails"
import { theme } from "@/themes/global"
import { Project } from "@/types/project"
import { View } from "react-native"

export const ProjectPage = ({ project }: { project: Project }) => {
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <ProjectDetails project={project} />
    </View>
  )
}
