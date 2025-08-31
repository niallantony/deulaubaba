import API from "@/api/student";
import { Student } from "@/types/student";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react"

type Screen = "add" | "code" | "register" | "confirm_new" | "confirm_link";

export const useAddStudent = () => {
  const [screen, setScreen] = useState<Screen>("add");
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [studentPreview, setStudentPreview] = useState<Pick<Student, "studentId" | "name" | "imagesrc"> | null>(null);
  const queryClient = useQueryClient();

  const reset = useCallback(() => {
    setScreen("add");
    setStudent(null);
    setError("");
    setLoading(false);
    setStudentPreview(null);
  }, []);

  const inputCode = () => setScreen("code");
  const makeCode = () => setScreen("register");

  const handleStudentCode = async (code: string) => {
    try {
      setLoading(true);
      const response = await API.getStudentPreviewFromCode(code);
      if (response.status === 401 && response.message) {
        setError(response.message)
        return false
      }
      if (response.status === 200 && response.student) {
        setStudentPreview(response.student)
        setScreen("confirm_link")
        return true;
      }
    } catch (err) {
      console.error(err)
      setError("Attempt Failed")
      return false;
    } finally {
      setLoading(false)
    }
  }

  const linkStudentMutation = useMutation({
    mutationFn: (id: string) => API.linkStudentFromCode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onError: () => setError("Link failed")
  })

  const submitStudent = () => {
    if (student) {
      submitStudentMutation.mutate(student)
      setStudent(student)
    }
  }

  const submitStudentMutation = useMutation({
    mutationFn: API.postStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    }
  })

  const handleNewStudent = async (student: Student) => {
    setStudent(student)
    setStudentPreview({
      studentId: student.studentId,
      name: student.name,
      imagesrc: student.imagesrc,
    })
    setScreen("confirm_new")
  }

  const linkStudent = async () => {
    if (studentPreview?.studentId) {
      linkStudentMutation.mutate(studentPreview?.studentId)
    }
  }

  const confirm = (cb: (s: Student) => void) => {
    if (student) {
      setScreen("add")
      cb(student)
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
    loading,
    student,
    confirm,
    submitStudent
  }
}
