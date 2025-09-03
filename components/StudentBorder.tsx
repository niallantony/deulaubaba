import { PropsWithChildren, useState } from "react";
import { StudentAvatar } from "./StudentAvatar";
import { PressableAvatarPane, } from "./ThemedView";
import { ClickableText, SemiboldLightText, TitleText } from "./ThemedText";
import { useStudentStore } from "@/store/currentStudent";
import { useRouter } from "expo-router";
import { DropdownMenu, DropdownMenuOption } from "./SettingsMenu/SettingsMenu";
import { StyleSheet, View } from "react-native";
import { theme } from "@/themes/global";


type StudentBorderProps = {
  title: string;
  subtitle: string;
} & PropsWithChildren;




export const StudentBorder = ({ children, title, subtitle }: StudentBorderProps) => {
  const student = useStudentStore((s) => s.student)
  const [showList, setShowList] = useState(false);
  const imageSize = 48
  const router = useRouter()

  const toggleList = () => {
    if (showList) {
      setShowList(false);
    } else {
      setShowList(true);
    }
  }

  return (
    <View style={styles.borderView} >
      {student &&
        <View style={styles.headerFrame}>
          <View style={styles.headerTextFrame}>
            <TitleText>{title}</TitleText>
            <SemiboldLightText>{subtitle}</SemiboldLightText>
          </View>
          <DropdownMenu
            visible={showList}
            handleOpen={() => setShowList(true)}
            handleClose={() => setShowList(false)}
            trigger={

              <PressableAvatarPane $size={imageSize + 8} onPress={toggleList}>
                <StudentAvatar url={student?.imagesrc} width={imageSize} height={imageSize} style="full" />
              </PressableAvatarPane>
            }
          >
            <DropdownMenuOption onSelect={() => {
              router.push('/selectstudent')
              setShowList(false)
            }}>
              <ClickableText>학생 변경</ClickableText>
            </DropdownMenuOption>

          </DropdownMenu>
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
