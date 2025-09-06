import { useCurrentUser } from "@/hooks/useCurrentUser"
import { View, Image, Pressable } from "react-native"
import { SemiboldText } from "./ThemedText"
import { StudentAvatar } from "./StudentAvatar"
import settings from '@/assets/images/settings.png'
import { useAuth0 } from "react-native-auth0"
import { useModal } from "@/hooks/useModal"


export const UserToolbar = () => {
  const { data } = useCurrentUser()
  const { show } = useModal();
  const { clearSession } = useAuth0();

  const handleLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.error(e)
    }
  }


  const handleSettings = () => {
    show("settings", {
      onLogout: handleLogout,

    })
  }
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
      <Pressable onPress={handleSettings} style={{ alignItems: 'center', justifyContent: 'center', }}>
        <Image source={settings} style={{ width: 32, height: 32 }} />
      </Pressable>
    </View>
  )

}
