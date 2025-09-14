import { StudentAvatar } from "@/components/StudentAvatar"
import { InfoLabel, SemiboldText, StyledText, TitleText } from "@/components/ThemedText"
import { ImageFrame, PressableInfoPane, ProfileAvatarPane, RowText, ThemedScrollableView } from "@/components/ThemedView"
import { UserRibbon } from "@/components/UserRibbon"
import { useModal } from "@/hooks/useModal"
import { useSelectedStudent } from "@/hooks/useSelectedStudent"
import { useRouter } from "expo-router"
import { View } from "react-native"

export const StudentProfile = () => {

  const { data } = useSelectedStudent()

  const router = useRouter();

  const { show } = useModal();

  return (
    <ThemedScrollableView>
      <ImageFrame>
        <ProfileAvatarPane>
          <StudentAvatar style="full" pressable url={data?.student?.imagesrc} width={128} height={182} />
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
      <UserRibbon handleShowStudentCode={() => show("studentCode", { student: data?.student })} />
      <InfoLabel>주요 의사소통특성</InfoLabel>
      <PressableInfoPane onPress={() => router.push('/student/edit/communication')}>
        <StyledText>{data?.student?.communicationDetails}</StyledText>
      </PressableInfoPane>
      <InfoLabel>주요 도전행동 특성</InfoLabel>
      <PressableInfoPane onPress={() => router.push('/student/edit/challenges')}>
        <StyledText>{data?.student?.challengesDetails}</StyledText>
      </PressableInfoPane>
    </ThemedScrollableView>
  )
}
