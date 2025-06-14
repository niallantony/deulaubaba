
import { StudentBorder } from "@/components/StudentBorder";
import { Slot } from "expo-router";

export default function Root() {
  return (
    <StudentBorder title={"의사소통 사전"} subtitle={"A profile"}>
      <Slot />
    </StudentBorder>
  )
}
