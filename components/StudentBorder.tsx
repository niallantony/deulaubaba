import { PropsWithChildren, useState } from "react";
import { styled } from "styled-components/native";
import { StudentAvatar } from "./StudentAvatar";
import { PressableAvatarPane, } from "./ThemedView";
import { ButtonTextTheme, SemiboldLightText, TitleText } from "./ThemedText";
import { useStudentStore } from "@/store/currentStudent";
import { useRouter } from "expo-router";
import { DropdownMenu, DropdownMenuOption } from "./SettingsMenu/SettingsMenu";


type StudentBorderProps = {
  title: string;
  subtitle: string;
} & PropsWithChildren;

const BorderView = styled.View`
  background-color: ${props => props.theme.colors.background};
  width: 100%;
  flex:1;
  margin: 0;
`
const HeaderFrame = styled.View`
  flex-direction: row;
  padding: ${props => props.theme.spacing.default};
  justify-content: space-between;
`

const HeaderTextFrame = styled.View`
  width: 80%
`

const ContentFrame = styled.View`
flex: 1;
border-radius: ${props => props.theme.radii.xl};
margin: ${props => props.theme.spacing.sides};
margin-bottom: ${props => props.theme.spacing.default};
`



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
    <BorderView >
      {student &&
        <HeaderFrame>
          <HeaderTextFrame>
            <TitleText>{title}</TitleText>
            <SemiboldLightText>{subtitle}</SemiboldLightText>
          </HeaderTextFrame>
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
              <ButtonTextTheme>학생 변경</ButtonTextTheme>
            </DropdownMenuOption>

          </DropdownMenu>
        </HeaderFrame>
      }
      <ContentFrame>
        {children}
      </ContentFrame>
    </BorderView >
  )

}
