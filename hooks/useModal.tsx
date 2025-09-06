import { StudentCodeModal } from "@/features/student/StudentCodeDialog";
import { StudentIdAvatar } from "@/types/student";
import { createContext, PropsWithChildren, use, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";

type ModalProps = {
  studentCode: { student: StudentIdAvatar }
}

type ModalNames = keyof ModalProps

type ModalState = { name: ModalNames, props: ModalProps[ModalNames] } | null

const modalComponents: {
  [K in ModalNames]: React.ComponentType<
    ModalProps[K] & {
      onClose: () => void
    }>
} = {
  studentCode: StudentCodeModal,
}

export const ModalContext = createContext<{
  show: <K extends ModalNames>(name: K, props: ModalProps[K]) => void,
  hide: () => void
}>({
  show: () => { },
  hide: () => { }
})

export const useModal = () => {
  const value = use(ModalContext);
  if (!value) {
    throw new Error("Must be wrapped with ModalProvider")
  }

  return value;
}

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState<ModalState>(null)

  const show = <K extends ModalNames>(name: K, props: ModalProps[K]) => setModal({ name, props })
  const hide = () => setModal(null)

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
            {(() => {
              console.log(modal)
              const Component = modalComponents[modal.name]
              return (<Component onClose={hide} {...modal.props} />)
            })()}
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
