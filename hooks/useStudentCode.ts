import API from "@/api/student";
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
      const response = await API.getStudentFromCode(code);
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

  const handleNewStudent = async (student: Student, uid: string) => {
    try {
      const response = await API.postStudent(student, uid)
      if (response.status === 200) {
        setStudent(student)
        setScreen("confirm")
      }
      // TODO : ERROR WITH POST
    } catch (err) {
      console.error(err)
    }
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
