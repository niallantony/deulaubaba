// @ts-ignore
import settings from "@/assets/images/settings.png"
import { DropdownMenu, DropdownMenuOption } from "@/components/SettingsMenu/SettingsMenu";
import { StyledText } from "@/components/ThemedText";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native"
import { useAuth0 } from "react-native-auth0";

export const SettingsMenu = () => {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <DropdownMenu
        key={"settingsmenu"}
        visible={visible}
        dropdownWidth={300}
        handleOpen={() => setVisible(true)}
        handleClose={() => setVisible(false)}
        trigger={
          <Image source={settings} style={styles.icon} />
        }
      >
        <LogoutOption />
      </DropdownMenu>
    </View>
  )

}

const LogoutOption = () => {
  const { clearSession } = useAuth0();

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <DropdownMenuOption
      onSelect={onLogout}
    >
      <StyledText>로그아웃</StyledText>
    </DropdownMenuOption>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"

  },
  icon: {
    width: 32,
    height: 32,

  }
})
