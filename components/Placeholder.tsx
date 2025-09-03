import { StyleSheet, View } from "react-native"
import { StyledText } from "./ThemedText"

export const Placeholder = ({ color, message, flex }: {
  color: string,
  message: string,
  flex: number
}) => {
  return (
    <View style={[styles.container, { flex, backgroundColor: color }]}>
      <StyledText>{message}</StyledText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 12,
    padding: 12,
    borderRadius: 12
  }
})
