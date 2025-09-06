import { ActivityIndicator, Pressable, ScrollView, View, Text, Image, ViewProps, ScrollViewProps, PressableProps, TextProps, ImageProps, StyleSheet } from "react-native"
import { UserAvatar } from "@/types/user"
import { StudentAvatar } from "./StudentAvatar";
// @ts-ignore
import addUser from "@/assets/images/addUser.png"
import { useEffect, useState } from "react";
import { OverlayDialog } from "./OverlayDialog";
import { useUserRibbon } from "@/hooks/useUserRibbon";
import { useStudentStore } from "@/store/currentStudent";
import { theme } from "@/themes/global";
import { useModal } from "@/hooks/useModal";


export const RibbonFrame = ({ children }: ViewProps) => (
  <View style={styles.ribbonFrame}>{children}</View>
);

export const UserRibbonView = ({ children }: ViewProps) => (
  <View style={styles.userRibbonView}>{children}</View>
);

export const UserAvatars = ({ children }: ScrollViewProps) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.userAvatars}
  >
    {children}
  </ScrollView>
);

export const UserAvatarView = ({ children, onPress }: PressableProps) => (
  <Pressable style={styles.userAvatarView} onPress={onPress}>
    {children}
  </Pressable>
);

export const UserLabel = ({ children }: TextProps) => (
  <Text style={styles.userLabel}>{children}</Text>
);

export const UserLabelBig = ({ children }: TextProps) => (
  <Text style={styles.userLabelBig}>{children}</Text>
);

export const AddUserButton = ({ children, onPress }: PressableProps) => (
  <Pressable style={styles.addUserButton} onPress={onPress}>
    {children}
  </Pressable>
);

export const AddUserIcon = ({ source }: ImageProps) => (
  <Image source={source} style={styles.addUserIcon} />
);

export const AddUserText = ({ children }: TextProps) => (
  <Text style={styles.addUserText}>{children}</Text>
);

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

export const UserRibbon = ({ handleShowStudentCode }: UserRibbonProps) => {
  const student = useStudentStore((s) => s.student);

  const { loading, users, fetchUsers } = useUserRibbon();
  useEffect(() => {
    if (student?.studentId) {
      fetchUsers(student.studentId)
    }
  }, [student])

  return (
    <RibbonFrame>
      <UserRibbonView>
        <UserAvatars horizontal={true}>
          {loading && <ActivityIndicator />}
          {users && users.map((user) => {
            return (
              <UserAvatarButton
                key={user.id}
                user={user}
              />
            )

          })}
        </UserAvatars>
      </UserRibbonView>
      <AddUserButton onPress={handleShowStudentCode}>
        <AddUserIcon source={addUser} />
        <AddUserText>초대하기</AddUserText>
      </AddUserButton>
    </RibbonFrame>
  )

}

const UserAvatarButton = ({ user }: { user: UserAvatar }) => {
  const { show } = useModal();
  return (
    <UserAvatarView onPress={() => show("userDialog", { user })}>
      <StudentAvatar
        url={user.src}
        width={32}
        height={32}
      />
      <UserLabel numberOfLines={1}>{user.type}</UserLabel>
    </UserAvatarView>
  )

}
