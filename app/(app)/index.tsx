import { Placeholder } from "@/components/Placeholder";
import { FullView } from "@/components/ThemedView";
import { UserToolbar } from "@/components/UserToolbar";

export default function Index() {
  return (
    <FullView>
      <UserToolbar />
      <FullView style={{ width: "100%", padding: 12 }}>
        <Placeholder
          color={"#EBEBEB"}
          message={"Projects"}
          flex={2}
        />
        <Placeholder
          color={"#EBEBEB"}
          message={"Messages"}
          flex={4}
        />
        <Placeholder
          color={"#EBEBEB"}
          message={"Calendar"}
          flex={4}
        />
      </FullView>

    </FullView>

  )
}
