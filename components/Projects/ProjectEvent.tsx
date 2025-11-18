import { StyleSheet, Text, View } from "react-native"
import { theme } from "@/themes/global"

export const ProjectEvent = ({ body, date }: { body: string, date: string }) => {
  return (
    <View style={styles.frame}>
      <View style={styles.container}>
        <Text style={styles.text}>{body}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    alignItems: 'center',

  },
  container: {
    backgroundColor: theme.colors.subtle,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 24,
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center"
  },
  text: {
    color: theme.colors.light,
    fontSize: 11,
  },
  date: {
    fontSize: 10,
    color: theme.colors.light
  }
})
