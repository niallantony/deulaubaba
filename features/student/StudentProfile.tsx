import { OverlayDialog } from "@/components/OverlayDialog"
import { StudentAvatar } from "@/components/StudentAvatar"
import { InfoLabel, SemiboldText, StyledText, SubtitleText, TitleText } from "@/components/ThemedText"
import { ImageFrame, PressableInfoPane, ProfileAvatarPane, RowText, ThemedScrollableView } from "@/components/ThemedView"
import { UserRibbon } from "@/components/UserRibbon"
import { useSelectedStudent } from "@/hooks/useSelectedStudent"
import { useRouter } from "expo-router"
import { useState } from "react"
import { View, Text } from "react-native"

export const StudentProfile = () => {
  const [studentCodeVisible, setStudentCodeVisible] = useState(false)

  const { data } = useSelectedStudent()

  const router = useRouter();


  const handleShowStudentCode = () => {
    setStudentCodeVisible(true)
  }


  return (
    <ThemedScrollableView>
      <ImageFrame>
        <ProfileAvatarPane>
          <StudentAvatar style="full" url={data?.student?.imagesrc} width={128} height={182} />
        </ProfileAvatarPane>
        <View>
          <RowText>
            <TitleText>{data?.student?.name}</TitleText>
            <SemiboldText>({data?.student?.age}세)</SemiboldText>
          </RowText>
          <InfoLabel>소속학교</InfoLabel>
          <StyledText>{data?.student?.school} {data?.student?.grade}학년</StyledText>
          <InfoLabel>배치유형</InfoLabel>
          <StyledText>{data?.student?.setting}</StyledText>
          <InfoLabel>장애유형</InfoLabel>
          <StyledText>{data?.student?.disability}</StyledText>
        </View>
      </ImageFrame>
      <InfoLabel>의사소통 팀 구성원</InfoLabel>
      <UserRibbon handleShowStudentCode={handleShowStudentCode} />
      <InfoLabel>주요 의사소통특성</InfoLabel>
      <PressableInfoPane onPress={() => router.push('/student/edit/communication')}>
        <StyledText>{data?.student?.communicationDetails}</StyledText>
      </PressableInfoPane>
      <InfoLabel>주요 도전행동 특성</InfoLabel>
      <PressableInfoPane onPress={() => router.push('/student/edit/challenges')}>
        <StyledText>{data?.student?.challengesDetails}</StyledText>
      </PressableInfoPane>
      <OverlayDialog
        key="studentCodeDialog"
        visible={studentCodeVisible}
        onDismiss={() => setStudentCodeVisible(false)}
      >
        <StudentAvatar
          url={data?.student?.imagesrc}
          width={128}
          height={128}
          style="round"
        />
        <Text style={{ marginTop: 12 }}>{data?.student?.name}의 학생 코드:</Text>
        <SubtitleText>{data?.student?.studentId}</SubtitleText>
      </OverlayDialog>
    </ThemedScrollableView>
  )
}
