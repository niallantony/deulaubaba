import { StudentAvatar } from "@/components/StudentAvatar"
import { InfoLabel, SemiboldText, StyledText, TitleText } from "@/components/ThemedText"
import { ImageFrame, InfoPane, PageTitleScrollableView, RowText } from "@/components/ThemedView"
import { Student } from "@/types/student"
import { View } from "react-native"

export const StudentProfile = ({ student }: { student: Student }) => {


  return (
    <PageTitleScrollableView title={"프로필"}>
      <View>
        <ImageFrame>
          <StudentAvatar style="full" url={student.imagesrc} width={128} height={182} />
          <View>
            <RowText>
              <TitleText>{student.name}</TitleText>
              <SemiboldText>({student.age}세)</SemiboldText>
            </RowText>
            <InfoLabel>소속학교</InfoLabel>
            <StyledText>{student.school} {student.grade}학년</StyledText>
            <InfoLabel>배치유형</InfoLabel>
            <StyledText>{student.setting}</StyledText>
            <InfoLabel>장애유형</InfoLabel>
            <StyledText>{student.disability}</StyledText>
          </View>
        </ImageFrame>
        <InfoLabel>의사소통 팀 구성원</InfoLabel>
        <InfoLabel>주요 의사소통특성</InfoLabel>
        <InfoPane>
          <StyledText>{student.communicationDetails}</StyledText>
        </InfoPane>
        <InfoLabel>주요 도전행동 특성</InfoLabel>
        <InfoPane>
          <StyledText>{student.challengesDetails}</StyledText>
        </InfoPane>
      </View>
    </PageTitleScrollableView>
  )
}
