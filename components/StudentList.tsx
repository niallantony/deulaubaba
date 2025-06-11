import { useSession } from "@/context/AuthContext"
import { useStudents } from "@/hooks/useStudents";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { ErrorText } from "./ThemedText";
import { StudentAvatar } from "./StudentAvatar";

export const StudentList = () => {

  const { user } = useSession();
  const { students, fetchStudents, loading, error } = useStudents();

  useEffect(() => {
    if (user?.userId) {
      fetchStudents(user?.userId);
    }
  }, [fetchStudents, user])

  return (
    <View>
      {loading && (
        <ActivityIndicator />
      )}
      {!loading && students && students.map((student) => {
        return (
          // TODO : Student List Styling 
          <View key={student.id}>
            <StudentAvatar url={student.imagesrc} width={24} height={24} style="full" />
            <Text >
              {student.name}
            </Text>
          </View>
        )
      }
      )}
      {error && (
        <ErrorText>{error}</ErrorText>
      )}

    </View>
  )
}
