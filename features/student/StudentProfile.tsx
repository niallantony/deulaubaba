import { StudentAvatar } from "@/components/StudentAvatar"
import { InfoLabel, SemiboldText, StyledText, TitleText } from "@/components/ThemedText"
import { AvatarPane, ImageFrame, InfoPane, PageTitleScrollableView, ProfileAvatarPane, RowText, ThemedScrollableView } from "@/components/ThemedView"
import { UserRibbon } from "@/components/UserRibbon"
import { useUserRibbon } from "@/hooks/useUserRibbon"
import { Student } from "@/types/student"
import { useEffect } from "react"
import { View } from "react-native"

export const StudentProfile = ({ student }: { student: Student }) => {





  return (
    <ThemedScrollableView>
      <ImageFrame>
        <ProfileAvatarPane>
          <StudentAvatar style="full" url={student.imagesrc} width={128} height={182} />
        </ProfileAvatarPane>
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
      <UserRibbon student={student} />
      <InfoLabel>주요 의사소통특성</InfoLabel>
      <InfoPane>
        <StyledText>{student.communicationDetails}</StyledText>
      </InfoPane>
      <InfoLabel>주요 도전행동 특성</InfoLabel>
      <InfoPane>
        <StyledText>{student.challengesDetails}</StyledText>
      </InfoPane>
    </ThemedScrollableView>
  )
}
