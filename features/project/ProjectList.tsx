import { NoProjects } from "@/components/Projects/NoProjects";
import { ErrorText } from "@/components/ThemedText";
import { useProject } from "@/hooks/useProject"
import { ActivityIndicator, Text, View } from "react-native";

export const ProjectList = () => {
  const { allProjects } = useProject();

  if (allProjects.isLoading) return <ActivityIndicator />

  if (!allProjects.data) {
    return (<ErrorText>No Data</ErrorText>)
  }

  if (allProjects.data.status !== 200 && allProjects.data.status !== 204) {
    return (<ErrorText>{allProjects.data.message}</ErrorText>)
  }

  if (allProjects.data.status === 204) {
    return (<NoProjects />)
  }

  return (
    <Text>Projects Found</Text>
  )


}
