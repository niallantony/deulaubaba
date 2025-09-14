import { ComponentType } from "react"
import { CommunicationCategory } from "./dictionary"
import { StudentIdAvatar } from "./student"
import { UserAvatar } from "./user"
import { StudentCodeModal } from "@/features/student/StudentCodeDialog"
import { UserDialog } from "@/features/student/UserDialog"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import { CategoryPicker } from "@/features/dictionary/CategoryPicker"
import { SettingsMenu } from "@/components/SettingsMenu/SettingsMenu"
import { StudentMenu } from "@/features/student/StudentMenu"
import { FullSizeImageModal } from "@/components/FullSizeImageModal"

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
  },
  fullSizeImage: {
    uri: string
  }
}

export type ModalNames = keyof ModalProps

export const modalMap: Record<ModalNames, ComponentType<any>> = {
  studentCode: StudentCodeModal,
  userDialog: UserDialog,
  confirm: ConfirmDialog,
  category: CategoryPicker,
  settings: SettingsMenu,
  studentAvatar: StudentMenu,
  fullSizeImage: FullSizeImageModal,
}
