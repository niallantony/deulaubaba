
import { CenteredOverlay } from "@/components/CenteredOverlay";
import { StudentAvatar } from "@/components/StudentAvatar";
import { UserLabelBig } from "@/components/UserRibbon";
import { UserAvatar } from "@/types/user";
import { View } from "react-native";

export const UserDialog = ({ user, onClose }: {
  user: UserAvatar,
  onClose: () => void
}) => {
  return (
    <CenteredOverlay>
      <StudentAvatar
        url={user.src}
        width={128}
        height={128}
      />
      <UserLabelBig>{user.type}</UserLabelBig>

    </CenteredOverlay>
  );
};
