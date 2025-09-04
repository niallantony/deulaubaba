import { ButtonContainer } from "@/components/ButtonContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { FullView } from "@/components/ThemedView";
import { ActivityIndicator, Image, View } from "react-native";
import { useAuth0 } from "react-native-auth0";
import Logo from "@/assets/images/logo.png"
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Index() {

  const { authorize } = useAuth0();
  const { isLoading } = useCurrentUser();
  const onPress = async () => {
    try {
      await authorize({
        audience: "https://deulaubaba/api",
        scope: "openid offline_access profile email",
      });
    } catch (e) {
      console.log(e)
    }
  }

  if (isLoading) {
    return (<ActivityIndicator />)
  }
  return (
    <FullView style={{ justifyContent: 'space-between', flex: 1, paddingTop: 50, paddingBottom: 50 }}>
      <View style={{ alignItems: 'center' }}>
        <Image source={Logo} style={{ width: 300, height: 300 }} />
      </View>
      <View style={{ width: "100%" }}>
        <ButtonContainer width={150}>
          <ThemedButton text={"로그인"} type={"green"} onPress={onPress} />
        </ButtonContainer>
      </View>
    </FullView>
  )
}
