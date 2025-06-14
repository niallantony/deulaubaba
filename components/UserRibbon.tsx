import { UserAvatar } from "@/types/user"
import styled from "styled-components/native";
import { StudentAvatar } from "./StudentAvatar";

const RibbonFrame = styled.View`
  flex-direction: row;
`

const UserRibbonView = styled.View`
  flex-direction: row;
`

const UserAvatarView = styled.View`

`

export type UserRibbonProps = {
  users: UserAvatar[] | null;
}
export const UserRibbon = ({ users }: UserRibbonProps) => {

  return (
    <RibbonFrame>
      <UserRibbonView>
        {users && users.map((user) => {
          return (
            <UserAvatarButton user={user} />
          )

        })}
      </UserRibbonView>
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
    </UserAvatarView>
  )

}
