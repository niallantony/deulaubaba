import { CenteredOverlay } from "@/components/CenteredOverlay"
import { Divider } from "@/components/Divider"
import { DropdownMenuOption } from "@/components/SettingsMenu/SettingsMenu"
import { ClickableText } from "@/components/ThemedText"
import React from "react"
import { StyleSheet, View } from "react-native"



export const StudentMenu = ({
  onRequestSelect,
  onRequestEdit,
  onClose,
}: {
  onRequestSelect: () => void,
  onRequestEdit: () => void,
  onClose: () => void,
}) => {

  return (
    <CenteredOverlay  >
      <View style={[
        styles.menu,
      ]}>
        <DropdownMenuOption onSelect={() => {
          onRequestEdit()
          onClose();
        }}>

          <ClickableText>학생 정보 수정</ClickableText>
        </DropdownMenuOption>
        <Divider />
        <DropdownMenuOption onSelect={() => {
          onRequestSelect()
          onClose();
        }}>
          <ClickableText>학생 변경</ClickableText>
        </DropdownMenuOption>
      </View>
    </CenteredOverlay>

  )
}

const styles = StyleSheet.create({
  menu: {
    width: '100%',
    justifyContent: 'space-between',
  },
  menuOption: {
    padding: 5
  },
})
