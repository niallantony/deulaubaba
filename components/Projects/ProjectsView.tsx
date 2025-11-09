import { ProjectList } from "@/features/project/ProjectList"
import { useProject } from "@/hooks/useProject"
import { theme } from "@/themes/global"
import { StyleSheet, View } from "react-native"
import { StatusSlider } from "./StatusSlider"
import { useState } from "react"
import { NoProjects } from "./NoProjects"
import { ButtonContainer } from "../ButtonContainer"
import { AddButton } from "../ThemedButton"

export const ProjectsView = () => {
  const { allProjects } = useProject()
  const [statusSelection, setStatusSelection] = useState<"pending" | "current" | "completed">("current")

  return (
    <View style={styles.container}>
      <StatusSlider status={statusSelection} setStatusSelection={setStatusSelection} />
      {allProjects.data &&
        <ProjectList data={allProjects.data} status={statusSelection} />
      }
      <ButtonContainer width={150}>
        <AddButton href={"/projects/new"} />
      </ButtonContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.inputs,
    flex: 1,
    width: "100%",
    alignItems: 'center'

  }
})
