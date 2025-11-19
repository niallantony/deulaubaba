import { useCurrentUser } from "@/hooks/useCurrentUser"

import { View, Image, TouchableWithoutFeedback } from "react-native"
import { SemiboldText } from "./ThemedText"
import { StudentAvatar } from "./StudentAvatar"
// @ts-ignore
import settings from '@/assets/images/settings.png'
import { useAuth0 } from "react-native-auth0"
import { useModal } from "@/hooks/useModal"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "expo-router"


export const UserToolbar = ({ studentSelected }: { studentSelected: boolean }) => {
  const { data } = useCurrentUser()
  const { show, hide } = useModal();
  const { clearSession } = useAuth0();
  const [position, setPosition] = useState<{ x: number, y: number, width: number }>()
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await clearSession();
      hide();
    } catch (e) {
      console.error(e)
    }
  }

  const settingsRef = useRef<View>(null)

  useEffect(() => {
    if (settingsRef.current) {
      settingsRef.current.measure((fx, fy, width, height, px, py) => {
        setPosition({
          x: px,
          y: py + 30,
          width
        })

      })
    }

  }, [settingsRef])


  const handleSettings = () => {
    if (studentSelected) {
      show("settingsWithStudent", {
        onLogout: handleLogout,
        position: position!,
        onRequestSelect: () => {
          router.push("/selectstudent")
          hide()
        },
        onRequestEdit: () => {
          router.push("/edit")
          hide()
        },
      })
    } else {
      show("settings", {
        onLogout: handleLogout,
        position: position!,
      })
    }
  }

  return (
    <View style={{ flexDirection: "row", marginHorizontal: 24 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', }}>
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
      <TouchableWithoutFeedback onPress={handleSettings}>
        <View ref={settingsRef} style={{ alignItems: 'center', justifyContent: 'center', }}>
          <Image source={settings} style={{ width: 32, height: 32 }} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )

}
