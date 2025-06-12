import { StudentBorder } from "@/components/StudentBorder";
import { Slot } from "expo-router";

export default function Root() {
  return (
    <StudentBorder title={"프로필"} subtitle={"A profile"}>
      <Slot />
    </StudentBorder>
  )
}
