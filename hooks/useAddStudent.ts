import API from "@/api/student";
import { Student } from "@/types/student";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useReducer } from "react"

type Screen = "add" | "code" | "register" | "confirm_new" | "confirm_link";

type AddStudentState = {
  screen: Screen;
  error: string;
  student: Student | null;
  studentPreview: Pick<Student, 'studentId' | 'name' | 'imagesrc'> | null;
}

type Action =
  | { type: "RESET" }
  | { type: 'INPUT_CODE' }
  | { type: 'MAKE_CODE' }
  | { type: 'SET_ERROR', error: string }
  | { type: 'SET_STUDENT', student: Student }
  | { type: 'SET_PREVIEW', studentPreview: AddStudentState['studentPreview'] }
  | { type: 'CONFIRM_NEW' }
  | { type: 'CONFIRM_LINK' }

export const addStudentReducer = (state: AddStudentState, action: Action): AddStudentState => {
  switch (action.type) {

    case "RESET":
      return {
        screen: 'add',
        student: null,
        studentPreview: null,
        error: '',
      };
    case "INPUT_CODE":
      return { ...state, screen: "code" };
    case "MAKE_CODE":
      return { ...state, screen: "register" }
    case "SET_ERROR":
      return { ...state, error: action.error }
    case "SET_STUDENT":
      return { ...state, student: action.student }
    case "SET_PREVIEW":
      return { ...state, studentPreview: action.studentPreview }
    case "CONFIRM_NEW":
      return { ...state, screen: "confirm_new" }
    case "CONFIRM_LINK":
      return { ...state, screen: "confirm_link" }
    default:
      return state
  }

}

export const useAddStudent = () => {
  const queryClient = useQueryClient();

  const [state, dispatch] = useReducer(addStudentReducer, {
    screen: 'add',
    student: null,
    studentPreview: null,
    error: '',
  })

  const { student, studentPreview, screen, error } = state;

  const reset = useCallback(() => {
    dispatch({ type: "RESET" })
  }, []);

  const inputCode = () => dispatch({ type: 'INPUT_CODE' })
  const makeCode = () => dispatch({ type: 'MAKE_CODE' })

  const handleStudentCode = async (code: string) => {
    try {
      const response = await API.getStudentPreviewFromCode(code);
      if (response.status === 401 && response.message) {
        dispatch({ type: 'SET_ERROR', error: response.message })
        return false
      }
      if (response.status === 200 && response.student) {
        dispatch({ type: "SET_PREVIEW", studentPreview: response.student })
        dispatch({ type: "CONFIRM_LINK" })
        return true;
      }
    } catch (err) {
      console.error(err)
      dispatch({ type: 'SET_ERROR', error: `Attempt Failed: ${err} ` })
      return false;
    }
  }

  const linkStudentMutation = useMutation({
    mutationFn: (id: string) => API.linkStudentFromCode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onError: (e) => dispatch({ type: 'SET_ERROR', error: `Link failed: ${e.message}` })
  })

  const submitStudent = () => {
    if (student) {
      submitStudentMutation.mutate(student)
    }
  }

  const submitStudentMutation = useMutation({
    mutationFn: API.postStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onError: (e) => dispatch({ type: 'SET_ERROR', error: `Student Submission failed: ${e.message}` })
  })

  const handleNewStudent = (student: Student) => {
    dispatch({ type: 'SET_STUDENT', student })
    dispatch({
      type: 'SET_PREVIEW', studentPreview: {
        name: student.name,
        imagesrc: student.imagesrc,
      }
    })
    dispatch({ type: 'CONFIRM_NEW' })
  }

  const linkStudent = async () => {
    if (studentPreview?.studentId) {
      linkStudentMutation.mutate(studentPreview?.studentId)
    }
  }

  return {
    studentPreview,
    handleStudentCode,
    handleNewStudent,
    linkStudent,
    screen,
    reset,
    inputCode,
    makeCode,
    error,
    student,
    submitStudent
  }
}
