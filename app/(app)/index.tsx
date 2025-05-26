import { FullScreenView } from "@/components/FullScreenView";
import { ThemedButton } from "@/components/ThemedButton"
import { useSession } from "@/context/AuthContext"
import { Text } from "react-native"

export default function Index() {
  const { signOut } = useSession();
  return (
    <FullScreenView>
      <ThemedButton
        text={"Log Out"}
        type="outline"
        onPress={signOut}
      />
    </FullScreenView>

  )
}
