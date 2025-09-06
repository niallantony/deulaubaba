import { Divider } from "@/components/Divider"
import { PositionedDialog } from "@/components/PositionedDialog"
import { DropdownMenuOption } from "@/components/SettingsMenu/SettingsMenu"
import { ClickableText } from "@/components/ThemedText"
import { StyleSheet, View } from "react-native"



export const StudentMenu = ({
  onRequestSelect,
  onRequestEdit,
  position,
  onClose,
}: {
  onRequestSelect: () => void,
  onRequestEdit: () => void,
  position: { x: number, y: number, width: number },
  onClose: () => void,
}) => {

  return (
    <PositionedDialog position={position} width={200} onClose={onClose}>
      <View style={[
        styles.menu,
      ]}>
        <DropdownMenuOption onSelect={onRequestEdit}>
          <ClickableText>학생 정보 수정</ClickableText>
        </DropdownMenuOption>
        <Divider />
        <DropdownMenuOption onSelect={onRequestSelect}>
          <ClickableText>학생 변경</ClickableText>
        </DropdownMenuOption>
      </View>
    </PositionedDialog>

  )
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  menuOption: {
    padding: 5
  },
})
