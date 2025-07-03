import API from "@/api/student";
import { useStudent } from "@/context/StudentContext";
import { useState } from "react"

export const useStudents = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const { setStudents, students } = useStudent();



  const fetchStudents = async (userId: string) => {
    try {
      setLoading(true);
      const response = await API.getAllStudents(userId);

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
