import { useStudent } from "@/context/StudentContext"
import { PropsWithChildren, useState } from "react";
import { styled } from "styled-components/native";
import { Text } from "react-native";
import { StudentAvatar } from "./StudentAvatar";
import { PressableAvatarPane, } from "./ThemedView";
import { SemiboldLightText, TitleText } from "./ThemedText";
import { OverlayDialog } from "./OverlayDialog";


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
          <PressableAvatarPane $size={imageSize + 8} onPress={toggleList}>
            <StudentAvatar url={student?.imagesrc} width={imageSize} height={imageSize} style="full" />
          </PressableAvatarPane>
        </HeaderFrame>
      }
      <OverlayDialog
        key="studentBorderModal"
        visible={showList}
        onDismiss={() => setShowList(false)}
        buttons={
          [
            { text: "학생 선택", onPress: () => setShowList(false) }
          ]
        } >
        <Text style={{ fontSize: 16 }}>현재 학생을 변경하시겠습니까?</Text>
      </OverlayDialog>
      <ContentFrame>
        {children}
      </ContentFrame>
    </BorderView>
  )

}
