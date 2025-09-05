import { ButtonContainer } from "@/components/ButtonContainer"
import { OverlayDialog } from "@/components/OverlayDialog"
import { StudentAvatar } from "@/components/StudentAvatar"
import { ThemedButton } from "@/components/ThemedButton"
import { InfoLabel, SemiboldText, StyledText, SubtitleText, TitleText } from "@/components/ThemedText"
import { ImageFrame, InfoPane, ProfileAvatarPane, RowText, ThemedScrollableView } from "@/components/ThemedView"
import { UserRibbon } from "@/components/UserRibbon"
import { useSelectedStudent } from "@/hooks/useSelectedStudent"
import { useState } from "react"
import { View, Text } from "react-native"

export const StudentProfile = ({ requestForm }: { requestForm: () => void }) => {
  const [studentCodeVisible, setStudentCodeVisible] = useState(false)

  const { data } = useSelectedStudent()

  const student = data?.student

  const handleShowStudentCode = () => {
    setStudentCodeVisible(true)
  }


  return (
    <ThemedScrollableView>
      <ImageFrame>
        <ProfileAvatarPane>
          <StudentAvatar style="full" url={student?.imagesrc} width={128} height={182} />
        </ProfileAvatarPane>
        <View>
          <RowText>
            <TitleText>{student?.name}</TitleText>
            <SemiboldText>({student?.age}세)</SemiboldText>
          </RowText>
          <InfoLabel>소속학교</InfoLabel>
          <StyledText>{student?.school} {student?.grade}학년</StyledText>
          <InfoLabel>배치유형</InfoLabel>
          <StyledText>{student?.setting}</StyledText>
          <InfoLabel>장애유형</InfoLabel>
          <StyledText>{student?.disability}</StyledText>
        </View>
      </ImageFrame>
      <InfoLabel>의사소통 팀 구성원</InfoLabel>
      <UserRibbon handleShowStudentCode={handleShowStudentCode} />
      <InfoLabel>주요 의사소통특성</InfoLabel>
      <InfoPane>
        <StyledText>{student?.communicationDetails}</StyledText>
      </InfoPane>
      <InfoLabel>주요 도전행동 특성</InfoLabel>
      <InfoPane>
        <StyledText>{student?.challengesDetails}</StyledText>
      </InfoPane>
      <ButtonContainer width={150}>
        <ThemedButton
          text="정보 수정하기"
          type="green"
          onPress={requestForm}
        />
      </ButtonContainer>
      <OverlayDialog
        key="studentCodeDialog"
        visible={studentCodeVisible}
        onDismiss={() => setStudentCodeVisible(false)}
      >
        <StudentAvatar
          url={student?.imagesrc}
          width={128}
          height={128}
          style="round"
        />
        <Text style={{ marginTop: 12 }}>{student?.name}의 학생 코드:</Text>
        <SubtitleText>{student?.studentId}</SubtitleText>
      </OverlayDialog>
    </ThemedScrollableView>
  )
}
