import { ButtonContainer } from "@/components/ButtonContainer";
import { ThemedButton } from "@/components/ThemedButton"
import { TitleText } from "@/components/ThemedText";
import { FullView } from "@/components/ThemedView";
import { useSession } from "@/context/AuthContext"

export default function Index() {
  const { signOut, user } = useSession();
  return (
    <FullView>
      {user && (<TitleText>Welcome {user.name} 👋</TitleText>)}
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
