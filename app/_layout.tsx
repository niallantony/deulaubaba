import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { theme } from "@/themes/global";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { authConfig } from "@/config/authConfig";
import { Auth0Provider, useAuth0 } from "react-native-auth0";
import { UserProvider, useUser } from "@/context/UserContext";

export default function RootLayout() {


  return (

    <Auth0Provider domain={authConfig.domain} clientId={authConfig.clientId}  >
      <UserProvider>
        <ThemeProvider theme={theme}>
          <RootNavigator />
        </ThemeProvider>
      </UserProvider>
    </Auth0Provider>
  );
}

function RootNavigator() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth0();
  const { isUser } = useUser();

  const isSignedIn = user !== undefined && user !== null;

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
        <Stack.Protected guard={isSignedIn && isUser}>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="(hidden)/student/add" />
        </Stack.Protected>
        <Stack.Protected guard={isSignedIn && !isUser}>
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </View>
  )
}
