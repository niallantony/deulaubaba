import { ButtonContainer } from "@/components/ButtonContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { FullView } from "@/components/ThemedView";
import { Image, View } from "react-native";
import { useAuth } from "@/auth/AuthProvider";
import { DEMO_MODE } from "@/config/demo";
import { DEMO_PERSONAS } from "@/api/mock/personas";
// @ts-ignore
import Logo from "@/assets/images/logo.png"

export default function Index() {
  const { login } = useAuth();

  const onPress = async (personaId?: string) => {
    try {
      await login(personaId);
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <FullView style={{ justifyContent: 'space-between', flex: 1, paddingTop: 50, paddingBottom: 50 }}>
      <View style={{ alignItems: 'center' }}>
        <Image source={Logo} style={{ width: 300, height: 300 }} />
      </View>
      <View style={{ width: "100%", gap: 12 }}>
        {DEMO_MODE ? (
          DEMO_PERSONAS.map((persona, i) => (
            <ButtonContainer key={persona.id} width={200}>
              <ThemedButton text={persona.label} type={i === 0 ? "green" : "outline"} onPress={() => onPress(persona.id)} />
            </ButtonContainer>
          ))
        ) : (
          <ButtonContainer width={150}>
            <ThemedButton text={"로그인"} type={"green"} onPress={() => onPress()} />
          </ButtonContainer>
        )}
      </View>
    </FullView>
  )
}
