import { getAllStudents } from "@/api/student";
import { Student } from "@/types/student"
import { useState } from "react"

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")


  const fetchStudents = async (userId: string) => {
    try {
      setLoading(true);
      const response = await getAllStudents(userId);
      if (response.status === 401 && response.message) {
        setError(response.message)
        setLoading(false);
        return false;
      }
      if (response.status === 200 && response.students) {
        setStudents(response.students);
        setLoading(false);
        return true;
      }
    } catch (err) {
      console.error(err);
      setError("Attempt Failed")
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { students, loading, error, fetchStudents }
}
