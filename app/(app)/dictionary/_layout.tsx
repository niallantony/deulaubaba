
import { StudentBorder } from "@/components/StudentBorder";
import { Slot } from "expo-router";

export default function Root() {
  return (
    <StudentBorder title={"Student Profile"} subtitle={"A profile"}>
      <Slot />
    </StudentBorder>
  )
}
