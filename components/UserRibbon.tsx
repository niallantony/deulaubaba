import { ActivityIndicator, Pressable, ScrollView, View, Text, Image, TextProps, StyleSheet } from "react-native"
import { UserAvatar } from "@/types/user"
import { StudentAvatar } from "./StudentAvatar";
// @ts-ignore
import addUser from "@/assets/images/addUser.png"
import { useEffect } from "react";
import { useUserRibbon } from "@/hooks/useUserRibbon";
import { useStudentStore } from "@/store/currentStudent";
import { theme } from "@/themes/global";
import { useModal } from "@/hooks/useModal";

export const UserLabelBig = ({ children }: TextProps) => (
  <Text style={styles.userLabelBig}>{children}</Text>
);

export const UserRibbon = ({ handleShowStudentCode }: UserRibbonProps) => {
  const student = useStudentStore((s) => s.student);

  const { loading, users, fetchUsers } = useUserRibbon();
  useEffect(() => {
    if (student?.studentId) {
      fetchUsers(student.studentId)
    }
  }, [student])

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
                key={user.id}
                user={user}
              />
            )

          })}
        </ScrollView>
      </View>
      <Pressable testID="show-code" style={styles.addUserButton} onPress={handleShowStudentCode}>
        , <Image style={styles.addUserIcon} source={addUser} />
        <Text style={styles.addUserButton}>초대하기</Text>
      </Pressable>
    </View>
  )

}

const UserAvatarButton = ({ user }: { user: UserAvatar }) => {
  const { show } = useModal();
  return (
    <Pressable style={styles.userAvatarView} onPress={() => show("userDialog", { user })}>
      <StudentAvatar
        url={user.src}
        width={32}
        height={32}
      />
      <Text style={styles.userLabel} numberOfLines={1}>{user.type}</Text>
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
    borderRadius: 8, // md
    padding: 12, // small
    flex: 1,
    marginRight: 12, // small
  },
  userAvatars: {
    flex: 1,
  },
  userAvatarView: {
    marginLeft: 4, // mini
    marginRight: 4, // mini
    alignItems: "center",
    width: 54,
  },
  userLabel: {
    textAlign: "center",
    flex: 1,
    color: theme.colors.light,
    marginTop: 4, // mini
  },
  userLabelBig: {
    textAlign: "center",
    fontSize: 18, // md
    color: theme.colors.text,
    marginTop: 12, // small
  },
  addUserButton: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.accent,
    borderRadius: 16, // xl
    alignItems: "center",
    justifyContent: "center",
  },
  addUserIcon: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: theme.colors.lightText,
    borderRadius: 128, // full
    padding: 4, // mini
    margin: 4, // mini
  },
  addUserText: {
    fontSize: 10, // xs
    color: theme.colors.lightText,
  },
});

export type UserRibbonProps = {
  handleShowStudentCode: () => void;
}

