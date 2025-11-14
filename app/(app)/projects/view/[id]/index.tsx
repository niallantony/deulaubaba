import { ProjectPage } from "@/features/project/ProjectPage";
import { useCurrentProject } from "@/hooks/useProject";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function Root() {

  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isFetching } = useCurrentProject({ id })


  if (isFetching) return (<ActivityIndicator />);
  if (data) {
    return (<ProjectPage project={data} />)
  }

}
