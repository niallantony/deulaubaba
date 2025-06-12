import { CenterText, LightText } from "@/components/ThemedText";
import { Login } from "@/features/auth/Login";
import { ThemedLink } from "@/components/ThemedLink";
import { FullScreenView } from "@/components/FullScreenView";
import { View } from "react-native";
import { useLogin } from "@/hooks/useLogin";
import { Loading } from "@/components/Loading";


export default function Index() {

  const { handleLogin, error, loading } = useLogin();

  return (
    <FullScreenView>
      <View style={{ alignItems: 'center' }}>
        <Login onLogin={handleLogin} error={error} />
        <CenterText>
          <LightText>아이디가 없나요? </LightText>
          <ThemedLink size={"md"} text={"가입하기"} href={"/register"} />
        </CenterText>
      </View>
      {loading && (<Loading />)}
    </FullScreenView>
  );
}
