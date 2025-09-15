import { PropsWithChildren } from "react";
import { StudentAvatar } from "./StudentAvatar";
import { PressableAvatarPane, } from "./ThemedView";
import { SemiboldLightText, TitleText } from "./ThemedText";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { theme } from "@/themes/global";
import { StudentIdAvatar } from "@/types/student";
import { ModalNames } from "@/types/modal";


type StudentBorderProps = {
  student: StudentIdAvatar | null;
  title: string;
  subtitle: string;
  showModal: (name: ModalNames, props: any) => void;
} & PropsWithChildren;




export const StudentBorder = ({ children, title, subtitle, student, showModal }: StudentBorderProps) => {
  const imageSize = 48
  const router = useRouter()


  const toggleList = () => {
    showModal("studentAvatar", {
      onRequestSelect: () => router.push('/selectstudent'),
      onRequestEdit: () => router.push('/student/edit'),
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
            <StudentAvatar url={student?.imagesrc} width={imageSize} height={imageSize} style="full" />
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
