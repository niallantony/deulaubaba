import { createContext, use, useEffect, useState, type PropsWithChildren } from "react";
import { StudentIdAvatar, type Student } from "@/types/student";
import { useSession } from "./AuthContext";
import { getAllStudents, StudentsResponse } from "@/api/student";

const StudentContext = createContext<{
  student: Student | null;
  setStudent: (s: Student | null) => void;
  students: StudentIdAvatar[] | null;
  lastStudent?: StudentIdAvatar;
}>({
  student: null,
  setStudent: () => { },
  students: null,
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

  useEffect(() => {
    if (user) {
      getAllStudents(user.userId)
        .then((response: StudentsResponse) => setStudents(response.students));
    }


  }, [user])


  return (
    <StudentContext.Provider value={{ student, students, setStudent }}>
      {children}
    </StudentContext.Provider>
  )
}
