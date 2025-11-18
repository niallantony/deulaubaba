import { UserAvatar } from "@/types/user"
import { StyleSheet, Text, View } from "react-native"
import { StudentAvatar } from "../StudentAvatar"
import { theme } from "@/themes/global"

export const NewUserComment = ({ user, date }: { user: UserAvatar, date: string }) => {
  return (
    <View style={styles.frame}>
      <View style={styles.container}>
        <Text style={styles.text}>구성원 추가되었다: </Text>
        <View style={styles.user}>
          <Text style={styles.text}>{user.userType}</Text>
          <StudentAvatar url={user.imagesrc} width={20} height={20} style="round" />
        </View>
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
  user: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  },
  date: {
    fontSize: 10,
    color: theme.colors.light
  }
})
