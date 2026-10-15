import { UserDetails } from "@/features/auth/UserDetails";
import { useState } from "react";
import { RegistrationComplete } from "@/features/auth/RegistrationComplete";
import { User } from "@/types/user";
import { PageTitleView } from "@/components/ThemedView";
import { Onboarding } from "@/features/auth/Onboarding";
import { ActivityIndicator, View } from "react-native";
import { SubtleButton } from "@/components/ThemedButton";
import { useLogout } from "@/auth/useLogout";
import { ErrorText, StyledText } from "@/components/ThemedText";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "@/api/user"



type Screen = "user" | "intro" | "finish"

export default function Register() {
  const [screen, setScreen] = useState<Screen>("intro");
  const queryClient = useQueryClient();
  const logout = useLogout()
  const query = useCurrentUser();

  const handleUserSubmit = async (user: User) => {
    submitUserMutation.mutate(user)
  }

  const submitUserMutation = useMutation({
    mutationFn: (user: User) => API.postUser(user),
    onSuccess: () => {
      setScreen("finish")
    },
  })

  const handleCancel = async () => {
    try {
      await logout()
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
            {screen === "user" && (<UserDetails onSubmit={handleUserSubmit} />)}
            {screen === "user" && submitUserMutation.error && (
              <ErrorText>{submitUserMutation.error.message}</ErrorText>
            )}
            {screen === "finish" && (<RegistrationComplete onPress={handleContinue} />)}
          </View>
          {screen !== "finish" &&
            <View style={{ alignItems: "center", width: '100%', }}>
              <SubtleButton onPress={handleCancel} style={{ width: 80, alignItems: 'center', }}>
                <StyledText style={{ width: "100%", textAlign: "center" }}>취소</StyledText>
              </SubtleButton>
            </View>
          }
        </View>
      </PageTitleView >
    )
  }
}
