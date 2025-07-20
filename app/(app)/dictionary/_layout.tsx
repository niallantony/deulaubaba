import { StudentBorder } from "@/components/StudentBorder";
import { DictionaryProvider } from "@/context/DictionaryContext";
import { useStudent } from "@/context/StudentContext";
import { Stack } from "expo-router";

export default function Root() {
  const { student } = useStudent();
  return (
    <DictionaryProvider>
      <StudentBorder title={"의사소통 사전"} subtitle={student ? `${student.name}이 어떻게 표현하나요?` : ""}>
        <Stack screenOptions={{ headerShown: false, animation: "none" }}>
          <Stack.Screen
            name="index" />
          <Stack.Screen name="viewList/[extype]" />
        </Stack>
      </StudentBorder>
    </DictionaryProvider>
  )
}
