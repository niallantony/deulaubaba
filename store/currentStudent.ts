import { create } from 'zustand'

// Only the selection lives here. Student details come from React Query
// (see hooks/useCurrentStudent), so edits show up everywhere once refetched.
type State = {
  studentId: string | null
}

type Action = {
  setStudentId: (studentId: string) => void
}

export const useStudentStore = create<State & Action>((set) => ({
  studentId: null,
  setStudentId: (studentId: string) => set(() => ({ studentId }))
}))
