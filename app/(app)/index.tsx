import { ButtonContainer } from "@/components/ButtonContainer";
import { ThemedButton } from "@/components/ThemedButton"
import { TitleText } from "@/components/ThemedText";
import { FullView } from "@/components/ThemedView";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useStudents } from "@/hooks/useStudents";
import { useAuth0 } from "react-native-auth0";

export default function Index() {
  const { clearSession } = useAuth0();
  const query = useCurrentUser();


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
      <FullView>
        <ButtonContainer>
          <ThemedButton
            text={"Log Out"}
            type="outline"
            onPress={onLogout}
          />
        </ButtonContainer>
      </FullView>

    </FullView>

  )
}
