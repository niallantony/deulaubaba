import API from "@/api/student";
import { UserAvatar } from "@/types/user";
import { useState } from "react";

export const useUserRibbon = () => {
  const [users, setUsers] = useState<UserAvatar[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (studentId: string) => {
    try {
      setLoading(true)
      setUsers(await API.getUsersFromStudent(studentId));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  return { loading, users, fetchUsers };
}
