import { Stack } from "expo-router";
import "../global.css"
import { ThemeProvider } from "styled-components/native";
import { theme } from "@/themes/global";

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
