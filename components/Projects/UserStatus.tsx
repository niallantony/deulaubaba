import { theme } from "@/themes/global"
import { UserAvatar } from "@/types/user"
import { Image } from "expo-image"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { StudentAvatar } from "../StudentAvatar"

export const UserStatusHolder = ({
  onPress,
  userStatuses,

}: {
  onPress: () => void,
  userStatuses: {
    user: UserAvatar,
    completed: boolean,
    completedOn: Date | null,
  }[]
}) => {

  const completeCount = userStatuses.reduce((acc, cur) => { return cur.completed ? 1 : 0 }, 0)

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Text style={styles.text}>프로젝트 완료</Text>
        <Text style={styles.count}>({completeCount}/{userStatuses.length})</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 4, flex: 1, justifyContent: 'center', }}>
        {userStatuses.map(user => (<UserIndicator key={user.user.username} userStatus={user} />))}
      </View>
    </TouchableOpacity>
  )
}

const UserIndicator = ({ userStatus }: { userStatus: { user: UserAvatar, completed: boolean, completedOn: Date | null } }) => {
  return (
    <View style={{ backgroundColor: "#000", borderRadius: 16 }}>
      <StudentAvatar url={userStatus.user.imagesrc} width={24} height={24} style="round" deactivated={!userStatus.completed} />
    </View>
  )


}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.accent,
    borderRadius: 16,
    paddingTop: 12,
    paddingBottom: 14,
    marginVertical: 12,
    paddingHorizontal: 24,
    gap: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.inputs,
    fontWeight: "700",
    fontSize: 16
  },
  count: {
    color: theme.colors.inputs,
    fontSize: 14,
    fontWeight: "700",

  },
  incomplete: {
    filter: [{ brightness: "80%" }]

  },

})
