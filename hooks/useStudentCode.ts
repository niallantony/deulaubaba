import API from "@/api/student";
import { Student } from "@/types/student";
import { useCallback, useState } from "react"

type Screen = "add" | "code" | "register" | "confirm";

export const useAddStudent = () => {
  const [screen, setScreen] = useState<Screen>("add");
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [studentPreview, setStudentPreview] = useState<Pick<Student, "studentId" | "name" | "imagesrc"> | null>(null);

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

  const handleNewStudent = async (student: Student) => {
    try {
      const response = await API.postStudent(student)
      if (response.status === 200) {
        setStudent(student)
        setStudentPreview({
          studentId: student.studentId,
          name: student.name,
          imagesrc: student.imagesrc,
        })
        setScreen("confirm")
      }
      // TODO : ERROR WITH POST
    } catch (err) {
      console.error(err)
    }
  }

  const linkStudent = async () => {
    try {
      if (studentPreview && studentPreview.studentId) {
        const response = await API.linkStudentFromCode(studentPreview?.studentId)
        if (response.status === 200 && response.student) {
          setStudent(response.student)
        } else if (response.status === 404) {
          setError("Incorrect Code")
        }
      }
    } catch (e) {
      console.log(e)
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
    confirm
  }
}
