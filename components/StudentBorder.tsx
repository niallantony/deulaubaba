import { useStudent } from "@/context/StudentContext"
import { PropsWithChildren, useState } from "react";
import { styled } from "styled-components/native";
import { StudentAvatar } from "./StudentAvatar";
import { PressableAvatarPane, } from "./ThemedView";
import { SemiboldLightText, TitleText } from "./ThemedText";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ChangeStudentDialog } from "./StudentList";


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
  height: fit-content;
  padding: ${props => props.theme.spacing.default};
  justify-content: space-between;
`

const HeaderTextFrame = styled.View`
`

const ContentFrame = styled.View`
flex: 1;
border-radius: ${props => props.theme.radii.xl};
margin: ${props => props.theme.spacing.sides};
margin-bottom: ${props => props.theme.spacing.default};
`



export const StudentBorder = ({ children, title, subtitle }: StudentBorderProps) => {
  const { student } = useStudent();
  const [showList, setShowList] = useState(false);
  const imageSize = 48

  const toggleList = () => {
    showList ? setShowList(false) : setShowList(true);
  }

  return (
    <BorderView >
      {student &&
        <HeaderFrame>
          <HeaderTextFrame>
            <TitleText>{title}</TitleText>
            <SemiboldLightText>{subtitle}</SemiboldLightText>
          </HeaderTextFrame>
          <PressableAvatarPane $size={imageSize + 8} onPress={toggleList}>
            <StudentAvatar url={student?.imagesrc} width={imageSize} height={imageSize} style="full" />
          </PressableAvatarPane>
        </HeaderFrame>
      }
      {showList && (<ChangeStudentDialog onDismiss={() => setShowList(false)} />)}
      <ContentFrame>
        {children}
      </ContentFrame>
    </BorderView>
  )

}
