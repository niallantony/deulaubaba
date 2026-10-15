import API from "@/api/student";
import { Student } from "@/types/student";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useReducer } from "react"

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "오류가 발생했습니다";

type Screen = "add" | "code" | "register" | "confirm_new" | "confirm_link";

type Operation = "preview" | "link" | "post";
type Errors = Record<Operation, string | null>

type AddStudentState = {
  screen: Screen;
  error: Errors;
  student: Student | null;
  studentPreview: Pick<Student, 'studentId' | 'name' | 'imagesrc'> | null;
}

type Action =
  | { type: "RESET" }
  | { type: 'INPUT_CODE' }
  | { type: 'MAKE_CODE' }
  | { type: 'SET_ERROR', op: Operation, message: string | null }
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
        error: {
          preview: null,
          link: null,
          post: null,
        }
      };
    case "INPUT_CODE":
      return { ...state, screen: "code" };
    case "MAKE_CODE":
      return { ...state, screen: "register" }
    case "SET_ERROR":
      return { ...state, error: { ...state.error, [action.op]: action.message } }
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
    error: {
      preview: null,
      link: null,
      post: null,
    }
  })

  const { student, studentPreview, screen, error } = state;

  const reset = useCallback(() => {
    dispatch({ type: "RESET" })
  }, []);

  const inputCode = () => dispatch({ type: 'INPUT_CODE' })
  const makeCode = () => dispatch({ type: 'MAKE_CODE' })

  const handleStudentCode = async (code: string) => {
    try {
      const preview = await API.getStudentPreviewFromCode(code);
      if (!preview) {
        dispatch({ type: "SET_ERROR", op: "preview", message: "학생을 찾을 수 없습니다" })
        return false
      }
      dispatch({ type: "SET_PREVIEW", studentPreview: preview })
      dispatch({ type: "CONFIRM_LINK" })
      return true;
    } catch (err) {
      dispatch({ type: 'SET_ERROR', op: "preview", message: errorMessage(err) })
      return false;
    }
  }

  const linkStudentMutation = useMutation({
    mutationFn: (id: string) => API.linkStudentFromCode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onError: (e) => dispatch({ type: 'SET_ERROR', op: "link", message: `Link failed: ${e.message}` })
  })

  const submitStudent = (onSuccess?: () => void) => {
    if (student) {
      submitStudentMutation.mutate(student, { onSuccess })
    }
  }

  const submitStudentMutation = useMutation({
    mutationFn: (student: Student) => API.postStudent(student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onError: (e) => dispatch({ type: 'SET_ERROR', op: "post", message: `Student Submission failed: ${e.message}` })
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

  const linkStudent = (onSuccess?: () => void) => {
    if (studentPreview?.studentId) {
      linkStudentMutation.mutate(studentPreview.studentId, { onSuccess })
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
