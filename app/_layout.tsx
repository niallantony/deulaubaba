import { Stack } from "expo-router";
import { theme } from "@/themes/global";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";
import { ButtonContainer } from "@/components/ButtonContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { CenterText, ErrorText } from "@/components/ThemedText";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ModalProvider } from "@/hooks/useModal";
import { AuthProvider, useAuth } from "@/auth/AuthProvider";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { isApiError } from "@/api/errors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Client errors (4xx) won't succeed on retry; network failures and 5xx might.
      retry: (failureCount, error) =>
        !(isApiError(error) && error.status >= 400 && error.status < 500) && failureCount < 3,
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <RootNavigator />
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function RootNavigator() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { data, isLoading, isError, refetch } = useCurrentUser();

  const isSignedIn = !!user;
  const isRegistered = isSignedIn && !!data;
  const needsRegistration = isSignedIn && data === null;

  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      backgroundColor: theme.colors.background,
    }}>
      {isSignedIn && isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : isSignedIn && isError ? (
        <View style={{ flex: 1, justifyContent: "center", gap: 16 }}>
          <CenterText>
            <ErrorText>사용자 정보를 불러올 수 없습니다</ErrorText>
          </CenterText>
          <ButtonContainer width={150}>
            <ThemedButton text={"다시 시도"} type={"green"} onPress={() => refetch()} />
          </ButtonContainer>
        </View>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={isRegistered}>
            <Stack.Screen name="(app)" options={{ headerShown: false, freezeOnBlur: false }} />
          </Stack.Protected>
          <Stack.Protected guard={needsRegistration}>
            <Stack.Screen name="register" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Protected guard={!isRegistered && !needsRegistration}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      )}
    </View >
  )
}
