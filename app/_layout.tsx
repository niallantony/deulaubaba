import { Stack } from "expo-router";
import { theme } from "@/themes/global";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";
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
  const { data, isLoading } = useCurrentUser();

  const isSignedIn = !!user;
  const isRegistered = isSignedIn && data?.ok === true;
  const needsRegistration = isSignedIn && data?.ok === false && data.reason === "not_found";

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
