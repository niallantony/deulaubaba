import { StudentAvatar } from "@/components/StudentAvatar"
import { InfoLabel, SemiboldText, StyledText, TitleText } from "@/components/ThemedText"
import { ImageFrame, PressableInfoPane, ProfileAvatarPane, RowText, ThemedScrollableView } from "@/components/ThemedView"
import { TouchableAvatar } from "@/components/TouchableAvatar"
import { UserRibbon } from "@/components/UserRibbon"
import { useModal } from "@/hooks/useModal"
import { Student } from "@/types/student"
import { View } from "react-native"

export const StudentProfile = ({
  data,
  onCommunicationPress,
  onChallengesPress,
}: {
  data: Student,
  onCommunicationPress: () => void,
  onChallengesPress: () => void,
}) => {

  const { show } = useModal();

  const handleShowStudentCode = () => {
    if (data.studentId) {
      show("studentCode", {
        student: {
          studentId: data.studentId,
          imagesrc: data.imagesrc,
          name: data.name
        }
      })
    }
  }

  if (!data) return null

  return (
    <ThemedScrollableView>
      <ImageFrame>
        <ProfileAvatarPane>
          <TouchableAvatar imagesrc={data.imagesrc}>
            <StudentAvatar style="full" pressable url={data.imagesrc} width={128} height={182} />
          </TouchableAvatar>
        </ProfileAvatarPane>
        <View>
          <RowText>
            <TitleText>{data.name}</TitleText>
            <SemiboldText>({data.age}세)</SemiboldText>
          </RowText>
          <InfoLabel>소속학교</InfoLabel>
          <StyledText>{data.school} {data.grade}학년</StyledText>
          <InfoLabel>배치유형</InfoLabel>
          <StyledText>{data.setting}</StyledText>
          <InfoLabel>장애유형</InfoLabel>
          <StyledText>{data.disability}</StyledText>
        </View>
      </ImageFrame>
      <InfoLabel>의사소통 팀 구성원</InfoLabel>
      <UserRibbon
        onPressShowStudentCode={handleShowStudentCode}
        studentId={data.studentId}
      />
      <InfoLabel>주요 의사소통특성</InfoLabel>
      <PressableInfoPane
        accessibilityLabel="주요 의사소통특성 수정하기"
        onPress={onCommunicationPress}
        testID="communication-pane"
      >
        <StyledText>{data.communicationDetails}</StyledText>
      </PressableInfoPane>
      <InfoLabel>주요 도전행동 특성</InfoLabel>
      <PressableInfoPane
        accessibilityLabel="주요 도전행동 특성 수정하기"
        onPress={onChallengesPress}
        testID="challenge-pane"
      >
        <StyledText>{data.challengesDetails}</StyledText>
      </PressableInfoPane>
    </ThemedScrollableView>
  )
}
