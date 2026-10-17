import { useCurrentUser } from "@/hooks/useCurrentUser"

import { View, Image, TouchableWithoutFeedback } from "react-native"
import { SemiboldText } from "./ThemedText"
import { StudentAvatar } from "./StudentAvatar"
import settings from '@/assets/images/settings.png'
import { useLogout } from "@/auth/useLogout"
import { useModal } from "@/hooks/useModal"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "expo-router"
import { UserResponse } from "@/types/user"


export const UserToolbar = ({ studentSelected, data }: { studentSelected: boolean, data: UserResponse | null | undefined }) => {
  const { show, hide } = useModal();
  const logout = useLogout();
  const [position, setPosition] = useState<{ x: number, y: number, width: number }>()
  const router = useRouter();

  const handleLogout = async () => {
    try {
      hide();
      await logout();
    } catch {
      // Nothing to recover; the user stays logged in
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
          router.push("/home/edit")
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
          url={data?.imagesrc}
          width={48}
          height={48}
          style="round"
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 12 }}>
        <SemiboldText>안녕하세요</SemiboldText>
        {data && (<SemiboldText>{data.name}</SemiboldText>)}

      </View>
      <TouchableWithoutFeedback onPress={handleSettings}>
        <View ref={settingsRef} style={{ alignItems: 'center', justifyContent: 'center', }}>
          <Image source={settings} style={{ width: 32, height: 32 }} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )

}
