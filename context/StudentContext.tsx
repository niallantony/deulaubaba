import { createContext, use, useEffect, useState, type PropsWithChildren } from "react";
import { StudentIdAvatar, type Student } from "@/types/student";
import { useSession } from "./AuthContext";
import API from "@/api/student";

const StudentContext = createContext<{
  student: Student | null;
  setStudent: (s: Student | null) => void;
  selectStudent: (s: string) => void;
  students: StudentIdAvatar[] | null;
  lastStudent?: StudentIdAvatar;
  error?: string | null;
  setStudents: (s: StudentIdAvatar[] | null) => void;
  updateStudent: (data: Student) => void;
}>({
  student: null,
  setStudent: () => { },
  selectStudent: () => { },
  updateStudent: () => { },
  setStudents: () => { },
  students: null,
  error: null,
})

export const useStudent = () => {
  const value = use(StudentContext);
  if (!value) {
    throw new Error("useStudent must be wrapped in a <StudentProvider />");
  }

  return value;
}

export const StudentProvider = ({ children }: PropsWithChildren) => {
  const { user } = useSession();
  const [student, setStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<StudentIdAvatar[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      API.getAllStudents(user.userId)
        .then((response) => {
          if (response.status === 404 && response.message) {
            setError(response.message);
          }
          if (response.students) {
            setStudents(response.students);
          }
        })
    }


  }, [user])

  const selectStudent = async (studentId: string) => {

    const response = await API.getStudentFromCode(studentId);
    if (response.student) {
      setStudent(response.student);
    }

  }

  const updateStudent = async (data: Student) => {
    if (student && student.studentId && user) {
      const response = await API.putStudent(data, student.studentId, user.userId)
      if (response?.status === 200) {
        selectStudent(student.studentId)
      }
      return response
    }
  }



  return (
    <StudentContext.Provider value={{ error, student, selectStudent, updateStudent, students, setStudent, setStudents }}>
      {children}
    </StudentContext.Provider>
  )
}
