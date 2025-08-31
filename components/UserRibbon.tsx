import { ActivityIndicator } from "react-native"
import { UserAvatar } from "@/types/user"
import { styled } from "styled-components/native";
import { StudentAvatar } from "./StudentAvatar";
// @ts-ignore
import addUser from "@/assets/images/addUser.png"
import { useEffect, useState } from "react";
import { OverlayDialog } from "./OverlayDialog";
import { useUserRibbon } from "@/hooks/useUserRibbon";
import { Student } from "@/types/student";
import { useStudentStore } from "@/store/currentStudent";

const RibbonFrame = styled.View`
  flex-direction: row;
  align-items: center;
`

const UserRibbonView = styled.View`
  background-color: ${props => props.theme.colors.inputs};
  box-shadow: 0 7px 6px rgba(0,0,0,0.03);
  border-radius: ${props => props.theme.radii.md};
  padding: ${props => props.theme.spacing.small};
  flex: 1;
  margin-right: ${props => props.theme.spacing.small};
`

const UserAvatars = styled.ScrollView`
  overflow: hidden;
  flex: 1;
`

const UserAvatarView = styled.Pressable`
  margin-left: ${props => props.theme.spacing.mini};
  margin-right: ${props => props.theme.spacing.mini};
  align-items: center;
  width: 54px;
`

const UserLabel = styled.Text`
  text-align: center;
  flex: 1;
  color: ${props => props.theme.colors.light};
  margin-top: ${props => props.theme.spacing.mini};
`
const UserLableBig = styled.Text`
  text-align: center;
  font-size: ${props => props.theme.sizes.md};
  color: ${props => props.theme.colors.text};
  margin-top: ${props => props.theme.spacing.small};

`

const AddUserButton = styled.Pressable`
  width: 60px;
  height: 60px;
  background-color: ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.radii.xl};
  align-items: center;
  justify-content: center;
`

const AddUserIcon = styled.Image`
  width: 32px;
  height: 32px;
  border: 2px solid ${props => props.theme.colors.lightText};
  border-radius: ${props => props.theme.radii.full};
  padding: ${props => props.theme.spacing.mini};
  margin: ${props => props.theme.spacing.mini};
`

const AddUserText = styled.Text`
  font-size: ${props => props.theme.sizes.xs};
  color: ${props => props.theme.colors.lightText};
`

export type UserRibbonProps = {
  handleShowStudentCode: () => void;
}

export const UserRibbon = ({ handleShowStudentCode }: UserRibbonProps) => {
  const [userSelect, setUserSelect] = useState<UserAvatar | null>(null);
  const [modalVisible, setModalVisible] = useState(false)
  const student = useStudentStore((s) => s.student);

  const { loading, users, fetchUsers } = useUserRibbon();
  useEffect(() => {
    if (student?.studentId) {
      fetchUsers(student.studentId)
    }

  }, [student])

  const handleUserClick = (user: UserAvatar) => {
    setUserSelect(user);
    setModalVisible(true);
  }

  const handleDismiss = () => {
    setModalVisible(false)
    setTimeout(() => {
      setUserSelect(null);
    }, 500);
  }
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
                onPress={() => handleUserClick(user)}
              />
            )

          })}
        </UserAvatars>
      </UserRibbonView>
      <OverlayDialog
        visible={modalVisible}
        onDismiss={handleDismiss}
      >
        <StudentAvatar
          url={userSelect?.src}
          width={128}
          height={128}
        />
        <UserLableBig>{userSelect?.type}</UserLableBig>
      </OverlayDialog>
      <AddUserButton onPress={handleShowStudentCode}>
        <AddUserIcon source={addUser} />
        <AddUserText>초대하기</AddUserText>
      </AddUserButton>
    </RibbonFrame>
  )

}

const UserAvatarButton = ({ user, onPress }: { user: UserAvatar, onPress: () => void }) => {
  return (
    <UserAvatarView onPress={onPress}>
      <StudentAvatar
        url={user.src}
        width={32}
        height={32}
      />
      <UserLabel numberOfLines={1}>{user.type}</UserLabel>
    </UserAvatarView>
  )

}
