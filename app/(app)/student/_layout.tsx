import { Stack } from "expo-router";
import { StudentBorder } from "@/components/StudentBorder";
import { useStudentStore } from "@/store/currentStudent";
import { useModal } from "@/hooks/useModal";

export default function Root() {
  const student = useStudentStore((s) => s.student)
  const { show } = useModal()
  return (
    <StudentBorder
      title={"프로필"}
      subtitle={""}
      student={student}
      showModal={show}
    >
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
