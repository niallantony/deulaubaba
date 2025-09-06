import { theme } from "@/themes/global"
import { PropsWithChildren } from "react"
import { Pressable, StyleSheet } from "react-native"

export const PositionedDialog = ({
  position,
  onClose,
  children,
  width,
}: {
  position: { x: number, y: number, width: number },
  onClose: () => void,
  width: number,
} & PropsWithChildren) => {
  return (
    <Pressable
      onPress={(e) => e.stopPropagation()}
      accessibilityViewIsModal
      style={[
        styles.dialogBox,
        {
          top: position.y,
          left: position.x + position.width - width,
          width
        }
      ]}
    >
      {children}
    </Pressable>
  )


}

const styles = StyleSheet.create({
  dialogBox: {
    position: 'absolute',
    backgroundColor: theme.colors.inputs,
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  }
})
