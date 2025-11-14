import { theme } from "@/themes/global"
import { ProjectPreview } from "@/types/project"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { StudentAvatar } from "../StudentAvatar"

export const ProjectBriefCard = ({ project, onPress }: { project: ProjectPreview, onPress: () => void }) => {
  const formatDate = (date: string) => {
    return date.replaceAll("-", ". ")
  }

  // Placeholder image?

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.image}>
        <StudentAvatar url={project.imgsrc} width={100} height={100} style="full" />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{project.objective}</Text>
        <Text style={styles.date}>{formatDate(project.startedOn)}</Text>
        <Text style={styles.description}>{project.description}</Text>
      </View>


    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "80%",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 7 },
    backgroundColor: theme.colors.inputs,
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    height: 132,
    justifyContent: "flex-start",
  },
  image: {
    width: 100,
  },
  info: {
    marginLeft: 14,
    flexShrink: 1,
    overflow: 'hidden',
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    color: theme.colors.light,
    width: "100%",

  },
  date: {
    fontWeight: "600",
    fontSize: 12,
    color: theme.colors.light
  },
  description: {
    fontWeight: "500",
    fontSize: 12,
    color: theme.colors.light

  },

})
