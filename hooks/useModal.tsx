import { createContext, PropsWithChildren, ReactNode, use, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";

type ModalProps = {
  studentCode: { studentId: string }
}

type ModalNames = keyof ModalProps

type ModalState = { name: ModalNames, props: ModalProps[ModalNames] } | null

export const ModalContext = createContext<{
  show: (n: string, p: any) => void,
  hide: () => void
}>({
  show: () => { },
  hide: () => { }
})

const useModal = () => {
  const value = use(ModalContext);
  if (!value) {
    throw new Error("Must be wrapped with ModalProvider")
  }

  return value;
}

const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState<ModalState>(null)

  const show = (name, props) => setModal({ name, props })
  const hide = () => { }

  return (
    <ModalContext value={{ show, hide }}>
      {children}
      {modal &&
        <Modal
          transparent
          visible
          onRequestClose={hide}
        >
          <View style={styles.modalOverlay}>

          </View>
        </Modal>
      }
    </ModalContext>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  }
})
