import { Stack } from "expo-router";
import { theme } from "@/themes/global";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";
import { authConfig } from "@/config/authConfig";
import { Auth0Provider, useAuth0 } from "react-native-auth0";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ModalProvider } from "@/hooks/useModal";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (

    <Auth0Provider domain={authConfig.domain} clientId={authConfig.clientId}  >
      <ModalProvider>
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
        </QueryClientProvider>
      </ModalProvider>
    </Auth0Provider>
  );
}

function RootNavigator() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth0();
  const query = useCurrentUser();

  const isSignedIn = user !== undefined && user !== null;

  if (query.isLoading) {
    return (<ActivityIndicator />)
  }

  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      backgroundColor: theme.colors.background,
    }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isSignedIn && (query.data?.ok || false)}>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={isSignedIn && !query.data?.ok && query.data?.reason === 'not_found'}>
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </View>
  )
}
