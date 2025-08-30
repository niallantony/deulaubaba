import { createContext, use, useEffect, useState, type PropsWithChildren } from "react";
import { StudentIdAvatar, type Student } from "@/types/student";
import API from "@/api/student";
import { useCurrentUser } from "@/hooks/useCurrentUser";

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
  const [student, setStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<StudentIdAvatar[] | null>(null);
  const [error, setError] = useState("");
  const query = useCurrentUser();

  useEffect(() => {
    if (query.data && query.data.user) {
      API.getAllStudents()
        .then((response) => {
          if (response.status === 404 && response.message) {
            setError(response.message);
          }
          if (response.students) {
            setStudents(response.students);
          }
        })
    }


  }, [query.data])

  const selectStudent = async (studentId: string) => {
    const response = await API.getStudentFromCode(studentId);
    if (response.student) {
      setStudent(response.student);
    }
  }

  const updateStudent = async (data: Student) => {
    if (student && student.studentId && query.data?.user) {
      const response = await API.putStudent(data, student.studentId)
      if (response?.status === 200) {
        await selectStudent(student.studentId)
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
