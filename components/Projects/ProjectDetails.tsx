import { theme } from "@/themes/global"
import { Project } from "@/types/project"
import { StyleSheet, Text, View } from "react-native"
import { TouchableAvatar } from "../TouchableAvatar"
import { StudentAvatar } from "../StudentAvatar"
import { CategoryIndicator } from "@/features/dictionary/CategoryPicker"
import { CommunicationCategoryDTO } from "@/types/dictionary"
import { UserStatusHolder } from "./UserStatus"

export const ProjectDetails = ({ project, onStatusChange }: { project: Project, onStatusChange: () => void }) => {

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-")
    return `${year}년 ${month}월 ${day}일`

  }
  console.log(project)
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{formatDate(project.startedOn)}</Text>

      <View style={styles.topDetails}>
        <TouchableAvatar imagesrc={project.imgsrc}>
          <StudentAvatar url={project.imgsrc} width={150} height={180} />
        </TouchableAvatar>
        <View style={styles.sideDetails}>
          <View>
            <Text style={styles.subtitle}>프로젝트 목표</Text>
            <Text style={styles.text} lineBreakStrategyIOS="hangul-word">{project.objective}</Text>
          </View>
          <View>
            <Text style={styles.subtitle}>의사소통 기능</Text>
            <View>
              {project.categories.map((category: CommunicationCategoryDTO) => {
                return (
                  <View key={category.id} style={{ marginBottom: 4 }} >
                    <CategoryIndicator category={category.label} />
                  </View>
                )
              })
              }
            </View>
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.subtitle}>이렇게 지도해주세요</Text>
        <Text style={styles.text} lineBreakStrategyIOS="hangul-word">{project.description}</Text>
      </View>

      <UserStatusHolder onPress={onStatusChange} userStatuses={project.userStatuses} />

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.inputs,
    marginHorizontal: 24,
    padding: 24,

  },
  topDetails: {
    flexDirection: "row",
    marginVertical: 10,
  },
  sideDetails: {
    justifyContent: "flex-start",
    gap: 12,
    flexShrink: 1,
    margin: 12,

  },
  subtitle: {
    fontWeight: "700",
    fontSize: 16,
    color: theme.colors.light,
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: theme.colors.light

  }



})
