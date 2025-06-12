import { getStudentFromCode } from "@/api/student";
import { ButtonContainer } from "@/components/ButtonContainer";
import { Divider, DividerWithTitle } from "@/components/Divider";
import { StudentCards } from "@/components/StudentCards";
import { ThemedButton } from "@/components/ThemedButton"
import { LightText, SubtitleText, TitleText } from "@/components/ThemedText";
import { FullView } from "@/components/ThemedView";
import { useSession } from "@/context/AuthContext"
import { useStudent } from "@/context/StudentContext";
import { useEffect } from "react";

export default function Index() {
  const { signOut, user } = useSession();
  const { students, setStudent } = useStudent();

  useEffect(() => {
    if (students) {
      getStudentFromCode(students[0].id)
        .then((response) => {
          if (response.student) {
            setStudent(response.student);
          }
        })
    }

  }, [students])


  return (
    <FullView>
      {user && (<TitleText>Welcome {user.name} 👋</TitleText>)}
      <DividerWithTitle title={"학생 목록"} />
      <StudentCards />

      <ButtonContainer>
        <ThemedButton
          text={"Log Out"}
          type="outline"
          onPress={signOut}
        />
      </ButtonContainer>
    </FullView>

  )
}
