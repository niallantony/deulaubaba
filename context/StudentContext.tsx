import { createContext, use, useState, type PropsWithChildren } from "react";
import { type Student } from "@/types/student";

const StudentContext = createContext<{
  student: Student | null;
  setStudent: (s: Student | null) => void;
}>({
  student: null,
  setStudent: () => { }
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

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentContext.Provider>
  )
}
