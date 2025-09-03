import { ReactNode, useEffect, useRef, useState } from "react"
import { Modal, Pressable, StyleSheet, TouchableWithoutFeedback, View } from "react-native"

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

export const DropdownMenuTrigger = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
    </>
  )
}

type DropdownMenuProps = {
  visible: boolean,
  handleOpen: () => void,
  handleClose: () => void,
  trigger: ReactNode,
  children: ReactNode,
  dropdownWidth?: number
}

export const DropdownMenu = ({
  visible,
  handleOpen,
  handleClose,
  trigger,
  children,
  dropdownWidth = 150

}: DropdownMenuProps) => {
  const triggerRef = useRef<View>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0 })

  useEffect(() => {
    if (triggerRef.current && visible) {
      triggerRef.current.measure((fx, fy, width, height, px, py) => {
        setPosition({
          x: px,
          y: py + height,
          width: width
        })
      })
    }
  }, [triggerRef, visible])

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleOpen}>
        <View ref={triggerRef}>{trigger}</View>
      </TouchableWithoutFeedback>
      {visible && (
        <Modal
          transparent={true}
          visible={visible}
          animationType="fade"
          onRequestClose={handleClose}
        >
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.modalOverlay}>
              <View style={[
                styles.menu,
                {
                  top: position.y,
                  left: position.x + position.width / 2 - dropdownWidth / 2,
                  width: dropdownWidth,
                }
              ]}>
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>

        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    width: 80,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  menuOption: {
    padding: 5
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  }
})
