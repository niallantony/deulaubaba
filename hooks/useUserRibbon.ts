import API from "@/api/student";
import { UserAvatar } from "@/types/user";
import { useState } from "react";

export const useUserRibbon = () => {
  const [users, setUsers] = useState<UserAvatar[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (studentId: string) => {
    try {
      setLoading(true)
      const fetchedUsers = await API.getUsersFromStudent(studentId);
      if (fetchedUsers.users) {
        setUsers(fetchedUsers.users);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  return { loading, users, fetchUsers };
}
