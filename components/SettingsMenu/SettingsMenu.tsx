import { ReactNode } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { ClickableText } from "../ThemedText"
import { PositionedDialog } from "../PositionedDialog"

export const DropdownMenuOption = ({
  onSelect,
  children
}: {
  onSelect: () => void,
  children: ReactNode
}) => {
  return (
    <Pressable onPress={onSelect} style={styles.menuOption}>
      {children}
    </Pressable>
  )

}


export const SettingsMenu = ({
  onLogout,
  position,
  onClose,
}: {
  onLogout: () => void,
  position: { x: number, y: number, width: number },
  onClose: () => void,
}) => {

  return (
    <PositionedDialog position={position} width={150} onClose={onClose}>
      <View style={[
        styles.menu,
      ]}>
        <DropdownMenuOption onSelect={onLogout}>
          <ClickableText>로그아웃</ClickableText>
        </DropdownMenuOption>
      </View>
    </PositionedDialog>

  )
}

const styles = StyleSheet.create({
  top: {

  },
  bottom: {

  },
  menu: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  menuOption: {
    padding: 5
  },
})
