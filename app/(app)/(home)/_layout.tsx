import { Stack } from "expo-router";
import { StudentBorder } from "@/components/StudentBorder";
import { useStudentStore } from "@/store/currentStudent";
import { useModal } from "@/hooks/useModal";

export default function Root() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen
        name="index"
      />
      <Stack.Screen
        name="edit"
      />
      <Stack.Screen
        name="editCommunication"
        options={{
          animation: 'slide_from_right'
        }}
      />
      <Stack.Screen
        name="editChallenge"
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  )
}
