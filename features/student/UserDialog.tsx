import { StyleSheet, Text, TextProps } from "react-native"
import { CenteredOverlay } from "@/components/CenteredOverlay";
import { StudentAvatar } from "@/components/StudentAvatar";
import { UserAvatar } from "@/types/user";
import { theme } from "@/themes/global";

export const UserLabelBig = ({ children }: TextProps) => (
  <Text style={styles.userLabelBig}>{children}</Text>
);

export const UserDialog = ({ user }: {
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

const styles = StyleSheet.create({
  userLabelBig: {
    textAlign: "center",
    fontSize: 18, // md
    color: theme.colors.text,
    marginTop: 12, // small
  }
})
