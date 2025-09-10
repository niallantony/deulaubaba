import { ConfirmDialog } from "@/components/ConfirmDialog";
import { SettingsMenu } from "@/components/SettingsMenu/SettingsMenu";
import { CategoryPicker } from "@/features/dictionary/CategoryPicker";
import { StudentCodeModal } from "@/features/student/StudentCodeDialog";
import { StudentMenu } from "@/features/student/StudentMenu";
import { UserDialog } from "@/features/student/UserDialog";
import { CommunicationCategory } from "@/types/dictionary";
import { StudentIdAvatar } from "@/types/student";
import { UserAvatar } from "@/types/user";
import { createContext, PropsWithChildren, use, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export type ModalProps = {
  studentCode: { student: StudentIdAvatar },
  userDialog: { user: UserAvatar },
  confirm: {
    onConfirm: () => void,
    text: string,
    confirmText: string
  },
  category: {
    setCategory: (c: CommunicationCategory[]) => void,
    category: CommunicationCategory[]
  },
  settings: {
    onLogout: () => void,
    position: { x: number, y: number, width: number },
  },
  studentAvatar: {
    onRequestSelect: () => void,
    onRequestEdit: () => void,
  }
}

export type ModalNames = keyof ModalProps

type ModalState =
  | { name: "studentCode", props: { student: StudentIdAvatar } }
  | { name: "userDialog", props: { user: UserAvatar } }
  | { name: "confirm", props: { onConfirm: () => void, text: string, confirmText: string } }
  | {
    name: "category", props: {
      setCategory: (c: CommunicationCategory[]) => void,
      category: CommunicationCategory[]
    }
  }
  | { name: "settings", props: { onLogout: () => void, position: { x: number, y: number, width: number } } }
  | {
    name: "studentAvatar", props: {
      onRequestSelect: () => void,
      onRequestEdit: () => void,
    }
  }
  | null

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


  const show = <K extends ModalNames>(name: K, props: ModalProps[K]) => setModal({ name, props } as ModalState)
  const hide = () => setModal(null)

  return (
    <ModalContext.Provider value={{ show, hide }}>
      {children}
      {modal &&
        <TouchableWithoutFeedback onPress={hide}>
          <View style={styles.overlay} >
            {modal.name === "studentCode" && (<StudentCodeModal {...modal.props} onClose={hide} />)}
            {modal.name === "userDialog" && (<UserDialog {...modal.props} onClose={hide} />)}
            {modal.name === "confirm" && (<ConfirmDialog {...modal.props} onClose={hide} />)}
            {modal.name === "category" && (<CategoryPicker {...modal.props} onClose={hide} />)}
            {modal.name === "settings" && (<SettingsMenu {...modal.props} onClose={hide} />)}
            {modal.name === "studentAvatar" && (<StudentMenu {...modal.props} onClose={hide} />)}
          </View>
        </TouchableWithoutFeedback>
      }
    </ModalContext.Provider>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
})
