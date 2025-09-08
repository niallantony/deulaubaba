import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { StudentAvatar } from "./StudentAvatar";
import { PressableAvatarPane, } from "./ThemedView";
import { SemiboldLightText, TitleText } from "./ThemedText";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { theme } from "@/themes/global";
import { StudentIdAvatar } from "@/types/student";
import { ModalNames } from "@/hooks/useModal";


type StudentBorderProps = {
  student: StudentIdAvatar | null;
  title: string;
  subtitle: string;
  showModal: (name: ModalNames, props: any) => void;
} & PropsWithChildren;




export const StudentBorder = ({ children, title, subtitle, student, showModal }: StudentBorderProps) => {
  const [position, setPosition] = useState<{ x: number, y: number, width: number }>()
  const imageSize = 48
  const router = useRouter()

  const buttonRef = useRef<View>(null)

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.measure((fx, fy, width, height, px, py) => {
        setPosition({
          x: px,
          y: py + 30,
          width
        })

      })
    }

  }, [buttonRef])

  const toggleList = () => {
    showModal("studentAvatar", {
      onRequestSelect: () => router.push('/selectstudent'),
      onRequestEdit: () => router.push('/student/edit'),
      position: position,
    })

  }


  return (
    <View style={styles.borderView} >
      {student &&
        <View style={styles.headerFrame}>
          <View style={styles.headerTextFrame}>
            <TitleText>{title}</TitleText>
            <SemiboldLightText>{subtitle}</SemiboldLightText>
          </View>
          <PressableAvatarPane testID="avatar-pressable" size={imageSize + 8} onPress={toggleList}>
            <View ref={buttonRef}>

              <StudentAvatar url={student?.imagesrc} width={imageSize} height={imageSize} style="full" />
            </View>
          </PressableAvatarPane>
        </View>
      }
      <View style={styles.content}>
        {children}
      </View>
    </View >
  )

}

const styles = StyleSheet.create({
  borderView: {
    backgroundColor: theme.colors.background,
    width: "100%",
    flex: 1,
    margin: 0
  },
  headerFrame: {
    flexDirection: "row",
    padding: 24,
    justifyContent: "space-between"
  },
  headerTextFrame: {
    width: "80%"
  },
  content: {
    flex: 1,
    borderRadius: 16,
    marginBottom: 24
  }
})
