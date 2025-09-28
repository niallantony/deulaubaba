import { ActivityIndicator, Pressable, ScrollView, View, Text, Image, StyleSheet } from "react-native"
import { UserAvatar } from "@/types/user"
import { StudentAvatar } from "./StudentAvatar";
// @ts-ignore
import addUser from "@/assets/images/addUser.png"
import { useEffect } from "react";
import { useUserRibbon } from "@/hooks/useUserRibbon";
import { theme } from "@/themes/global";
import { useModal } from "@/hooks/useModal";


export const UserRibbon = ({
  onPressShowStudentCode,
  studentId
}: UserRibbonProps) => {

  const { loading, users, fetchUsers } = useUserRibbon();

  useEffect(() => {
    if (studentId) {
      fetchUsers(studentId)
    }
  }, [studentId])

  return (
    <View style={styles.ribbonFrame}>
      <View style={styles.userRibbonView}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.userAvatars}
        >
          {loading && <ActivityIndicator testID="loading" />}
          {users && users.map((user) => {
            return (
              <UserAvatarButton
                key={user.username}
                user={user}
              />
            )

          })}
        </ScrollView>
      </View>
      <Pressable
        testID="show-code"
        style={styles.addUserButton}
        onPress={onPressShowStudentCode}
      >
        <Image style={styles.addUserIcon} source={addUser} />
        <Text style={styles.addUserText}>초대하기</Text>
      </Pressable>
    </View>
  )

}

const UserAvatarButton = ({ user }: { user: UserAvatar }) => {
  const { show } = useModal();
  return (
    <Pressable style={styles.userAvatarView} onPress={() => show("userDialog", { user })}>
      <StudentAvatar
        url={user.imagesrc}
        width={32}
        height={32}
      />
      <Text style={styles.userLabel} numberOfLines={1}>{user.userType}</Text>
    </Pressable>
  )

}

const styles = StyleSheet.create({
  ribbonFrame: {
    flexDirection: "row",
    alignItems: "center",
  },
  userRibbonView: {
    backgroundColor: theme.colors.inputs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 3,
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 12,
  },
  userAvatars: {
    flex: 1,
  },
  userAvatarView: {
    marginLeft: 4,
    marginRight: 4,
    alignItems: "center",
    width: 54,
  },
  userLabel: {
    textAlign: "center",
    flex: 1,
    color: theme.colors.light,
    marginTop: 4,
  },
  addUserButton: {
    flexShrink: 1,
    width: 60,
    height: 60,
    backgroundColor: theme.colors.accent,
    borderRadius: 16,
    color: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addUserIcon: {
    width: 32,
    height: 32,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 128,
    margin: 4,
  },
  addUserText: {
    textAlign: 'center',
    width: '100%',
    fontSize: 10,
    color: theme.colors.lightText,
  },
});

export type UserRibbonProps = {
  onPressShowStudentCode: () => void;
  studentId: string | undefined;
}

