import { useCurrentUser } from "@/hooks/useCurrentUser"
import { View } from "react-native"
import { SemiboldText } from "./ThemedText"
import { StudentAvatar } from "./StudentAvatar"
import { SettingsMenu } from "@/features/SettingsMenu"


export const UserToolbar = () => {
  const { data } = useCurrentUser()

  return (
    <View style={{ flexDirection: "row", marginHorizontal: 24 }}>
      <View>
        <StudentAvatar
          url={data?.user?.imagesrc}
          width={48}
          height={48}
          style="round"
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 12 }}>
        <SemiboldText>안녕하세요</SemiboldText>
        {data?.user && (<SemiboldText>{data?.user.name}</SemiboldText>)}

      </View>
      <SettingsMenu />
    </View>
  )

}
