import { ReactNode } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { SlideIn } from "../SlideIn"
import { ClickableText, LinkText } from "../ThemedText"
import { SafeAreaView } from "react-native-safe-area-context"

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
  onClose
}: {
  onLogout: () => void,
  onClose: () => void,
}) => {

  return (
    <SlideIn side={"right"} amount={0.5}>
      <SafeAreaView style={[
        styles.menu,
      ]}>
        <View style={styles.top}>
        </View>
        <View style={styles.bottom}>
          <DropdownMenuOption onSelect={onLogout}>
            <ClickableText>로그아웃</ClickableText>
          </DropdownMenuOption>
        </View>
      </SafeAreaView>
    </SlideIn>

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
