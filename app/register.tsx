import { UserDetails } from "@/features/auth/UserDetails";
import { useState } from "react";
import { RegistrationComplete } from "@/features/auth/RegistrationComplete";
import { RegistrationErrorType } from "@/types/registrationErrors";
import { useRegister } from "@/hooks/useRegister";
import { Loading } from "@/components/Loading";
import { User } from "@/types/user";
import { PageTitleScrollableView, PageTitleView } from "@/components/ThemedView";
import { Onboarding } from "@/features/auth/Onboarding";
import { View } from "react-native";
import { BackButton, SubtleButton } from "@/components/ThemedButton";
import { useAuth0 } from "react-native-auth0";
import { StyledText } from "@/components/ThemedText";


type Screen = "user" | "intro" | "finish"

export default function Register() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [errors, setErrors] = useState<RegistrationErrorType>();
  const { loading, register } = useRegister();
  const { clearSession } = useAuth0()

  const handleUserSubmit = async (user: User) => {
    const response = await register(user);
    if (response.success) {
      setScreen("finish")
    }

    if (response.success) {
      setScreen("finish")
    }
  }

  const handleCancel = async () => {
    try {
      await clearSession()
    } catch (e) {
      console.error(e)
    }
  }


  return (
    <PageTitleView title={"환영합니다"} style={{ flex: 1 }}>
      <View style={{ justifyContent: "space-between", flex: 1, }}>
        <View style={{ width: '100%', flex: 1, marginTop: 36 }}>
          {screen === "intro" && (<Onboarding onPress={() => setScreen("user")} />)}
          {screen === "user" && (<UserDetails onSubmit={handleUserSubmit} errors={errors} />)}
          {screen === "finish" && (<RegistrationComplete />)}
          {loading && (<Loading />)}
        </View>
        {screen !== "finish" &&
          <View style={{ alignItems: "center" }}>
            <SubtleButton onPress={handleCancel} style={{ width: 80 }}>
              <StyledText style={{ width: "100%", textAlign: "center" }}>취소</StyledText>
            </SubtleButton>
          </View>
        }
      </View>
    </PageTitleView >
  )
}
