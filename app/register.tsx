import { UserDetails } from "@/features/auth/UserDetails";
import { useState } from "react";
import { RegistrationComplete } from "@/features/auth/RegistrationComplete";
import { RegistrationErrorType } from "@/types/registrationErrors";
import { User } from "@/types/user";
import { PageTitleView } from "@/components/ThemedView";
import { Onboarding } from "@/features/auth/Onboarding";
import { ActivityIndicator, View } from "react-native";
import { SubtleButton } from "@/components/ThemedButton";
import { useAuth0 } from "react-native-auth0";
import { StyledText } from "@/components/ThemedText";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "@/api/user"



type Screen = "user" | "intro" | "finish"

export default function Register() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [errors, setErrors] = useState<RegistrationErrorType>();
  const queryClient = useQueryClient();
  const { clearSession } = useAuth0()
  const query = useCurrentUser();

  const handleUserSubmit = async (user: User) => {
    submitUserMutation.mutate(user)
  }

  const submitUserMutation = useMutation({
    mutationFn: API.postUser,
    onSuccess: () => {
      setScreen("finish")
    },
    onError: (error: any) => {
      setErrors(error)
    }
  })

  const handleCancel = async () => {
    try {
      await clearSession()
    } catch (e) {
      console.error(e)
    }
  }

  const handleContinue = () => {
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }


  if (query.isLoading) {
    return (<ActivityIndicator />)
  } else {
    return (
      <PageTitleView title={"환영합니다"} style={{ flex: 1 }}>
        <View style={{ justifyContent: "space-between", flex: 1, }}>
          <View style={{ width: '100%', flex: 1, marginTop: 36 }}>
            {screen === "intro" && (<Onboarding onPress={() => setScreen("user")} />)}
            {screen === "user" && (<UserDetails onSubmit={handleUserSubmit} errors={errors} />)}
            {screen === "finish" && (<RegistrationComplete onPress={handleContinue} />)}
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
}
