import auth0 from "@/api/auth";
import API from "@/api/student";
import { ButtonContainer } from "@/components/ButtonContainer";
import { DividerWithTitle } from "@/components/Divider";
import { StudentList } from "@/components/StudentCards";
import { ThemedButton } from "@/components/ThemedButton"
import { ErrorText, TitleText } from "@/components/ThemedText";
import { FullView } from "@/components/ThemedView";
import { useStudent } from "@/context/StudentContext";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useAuth0 } from "react-native-auth0";

export default function Index() {
  const { students, setStudent, error } = useStudent();
  const { clearSession } = useAuth0();
  const { user } = useUser()

  useEffect(() => {
    if (students) {
      API.getStudentFromCode(students[0].studentId)
        .then((response) => {
          if (response.student) {
            setStudent(response.student);
          }
        })
    }
  }, [setStudent, students])

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <FullView>
      {user && (<TitleText>Welcome {user.name} 👋</TitleText>)}
      <DividerWithTitle title={"학생 목록"} />
      {error === "Students not found" && (
        <ErrorText>No students found</ErrorText>
      )}
      <StudentList />

      <ButtonContainer>
        <ThemedButton
          text={"Log Out"}
          type="outline"
          onPress={onLogout}
        />
      </ButtonContainer>
    </FullView>

  )
}
