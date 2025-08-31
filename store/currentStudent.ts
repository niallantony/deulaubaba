import { StudentIdAvatar } from '@/types/student'
import { create } from 'zustand'

type State = {
  student: StudentIdAvatar | null
}

type Action = {
  setStudent: (student: StudentIdAvatar) => void
}

export const useStudentStore = create<State & Action>((set) => ({
  student: null,
  setStudent: (student: StudentIdAvatar) => set(() => ({ student: student }))
}))
