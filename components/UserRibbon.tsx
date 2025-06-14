import { Image } from "react-native"
import { UserAvatar } from "@/types/user"
import styled from "styled-components/native";
import { StudentAvatar } from "./StudentAvatar";
import { StyledIcon } from "./ThemedLink";
import { LinkText } from "./ThemedText";
import addUser from "@/assets/images/addUser.png"

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

const UserAvatarView = styled.View`
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
  users: UserAvatar[] | null;
}

export const UserRibbon = ({ users }: UserRibbonProps) => {

  return (
    <RibbonFrame>
      <UserRibbonView>
        <UserAvatars horizontal={true}>
          {users && users.map((user) => {
            return (
              <UserAvatarButton key={user.id} user={user} />
            )

          })}
        </UserAvatars>
      </UserRibbonView>
      <AddUserButton >
        <StyledIcon>
          <AddUserIcon source={addUser} />
          <AddUserText>초대하기</AddUserText>
        </StyledIcon>
      </AddUserButton>
    </RibbonFrame>
  )

}

const UserAvatarButton = ({ user }: { user: UserAvatar }) => {
  return (
    <UserAvatarView>
      <StudentAvatar
        url={user.src}
        width={32}
        height={32}
      />
      <UserLabel numberOfLines={1}>{user.type}</UserLabel>
    </UserAvatarView>
  )

}
