import { View } from "react-native"
import { SemiboldLightText } from "../ThemedText"

export const NoProjects = () => {

  return (
    <View style={{ paddingVertical: 48, alignItems: "center" }}>
      <SemiboldLightText>프로젝트가 없습니다</SemiboldLightText>
    </View>)
}
