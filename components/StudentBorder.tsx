import { useStudent } from "@/context/StudentContext"
import { PropsWithChildren, useState } from "react";
import { styled } from "styled-components/native";
import { StudentAvatar } from "./StudentAvatar";
import { PressableAvatarPane, } from "./ThemedView";
import { SemiboldLightText, TitleText } from "./ThemedText";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ChangeStudentDialog, StudentList } from "./StudentList";

type BorderProps = {
  $tabHeight: number;
}

type StudentBorderProps = {
  title: string;
  subtitle: string;
} & PropsWithChildren;

const BorderView = styled.View<BorderProps>`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.sides};
  flex:1;
`
const HeaderFrame = styled.View`
  flex-direction: row;
  padding-top: ${props => props.theme.spacing.default};
  padding-bottom: ${props => props.theme.spacing.default};
  justify-content: space-between;
  align-items: center;
`

const HeaderTextFrame = styled.View`

`

const AvatarFrame = styled.View`
  position : relative;
`

export const StudentBorder = ({ children, title, subtitle }: StudentBorderProps) => {
  const { student } = useStudent();
  const [showList, setShowList] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();

  const toggleList = () => {
    showList ? setShowList(false) : setShowList(true);
  }

  return (
    <BorderView $tabHeight={tabBarHeight}>
      {student &&
        <HeaderFrame>
          <HeaderTextFrame>
            <TitleText>{title}</TitleText>
            <SemiboldLightText>{subtitle}</SemiboldLightText>
          </HeaderTextFrame>
          <PressableAvatarPane onPress={toggleList}>
            <StudentAvatar url={student?.imagesrc} width={48} height={48} style="full" />
          </PressableAvatarPane>
        </HeaderFrame>
      }
      {showList && (<ChangeStudentDialog onDismiss={() => setShowList(false)} />)}
      {children}
    </BorderView>
  )

}
