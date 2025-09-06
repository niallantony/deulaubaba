import { Stack } from "expo-router";
import { StudentBorder } from "@/components/StudentBorder";

export default function Root() {
  return (
    <StudentBorder title={"프로필"} subtitle={""}>
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen
          name="index"
        />
        <Stack.Screen
          name="edit/index"
        />
        <Stack.Screen
          name="edit/communication"
          options={{
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name="edit/challenges"
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack>
    </StudentBorder>
  )
}
