import { ButtonContainer } from "@/components/ButtonContainer";
import { DividerWithTitle } from "@/components/Divider";
import { StudentList } from "@/components/StudentCards";
import { ThemedButton } from "@/components/ThemedButton"
import { ErrorText, TitleText } from "@/components/ThemedText";
import { FullView } from "@/components/ThemedView";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useStudents } from "@/hooks/useStudents";
import { useAuth0 } from "react-native-auth0";

export default function Index() {
  const { clearSession } = useAuth0();
  const query = useCurrentUser();
  const { data } = useStudents();


  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <FullView>
      {query.data?.user && (<TitleText>Welcome {query.data?.user.name} 👋</TitleText>)}
      <DividerWithTitle title={"학생 목록"} />
      {!data?.students && (
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
