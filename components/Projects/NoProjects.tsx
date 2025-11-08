import { Text, View } from "react-native"
import { StatusSlider } from "./StatusSlider"

export const NoProjects = () => {

  return (
    <View style={{ flex: 1, width: "100%", alignItems: 'center', }}>
      <StatusSlider />
      <Text> No Projects </Text>
    </View>)
}
