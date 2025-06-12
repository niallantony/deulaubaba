import { getStudentFromCode } from "@/api/student";
import { Student } from "@/types/student";
import { useCallback, useState } from "react"

type Screen = "add" | "code" | "register" | "confirm";

export const useAddStudent = () => {
  const [screen, setScreen] = useState<Screen>("add");
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);

  const reset = useCallback(() => {
    setScreen("add");
    setStudent(null);
    setError("");
    setLoading(false);
  }, []);

  const inputCode = () => setScreen("code");
  const makeCode = () => setScreen("register");

  const handleStudentCode = async (code: string) => {
    try {
      setLoading(true);
      const response = await getStudentFromCode(code);
      if (response.status === 401 && response.message) {
        setError(response.message)
        return false
      }
      if (response.status === 200 && response.student) {
        setStudent(response.student)
        setScreen("confirm")
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

  const handleNewStudent = (student: Student) => {
    setStudent(student)
    setScreen("confirm")
  }

  const confirm = (cb: (s: Student) => void) => {
    if (student) {
      setScreen("add")
      cb(student)
    }
  }

  return {
    handleStudentCode,
    handleNewStudent,
    screen,
    reset,
    inputCode,
    makeCode,
    error,
    loading,
    student,
    confirm
  }
}
