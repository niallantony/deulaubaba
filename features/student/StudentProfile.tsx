import { StudentAvatar } from "@/components/StudentAvatar"
import { InfoLabel, SemiboldText, StyledText, TitleText } from "@/components/ThemedText"
import { ImageFrame, PressableInfoPane, ProfileAvatarPane, RowText, ThemedScrollableView } from "@/components/ThemedView"
import { TouchableAvatar } from "@/components/TouchableAvatar"
import { UserRibbon } from "@/components/UserRibbon"
import { useModal } from "@/hooks/useModal"
import { useSelectedStudent } from "@/hooks/useSelectedStudent"
import { useStudentStore } from "@/store/currentStudent"
import { useRouter } from "expo-router"
import { View } from "react-native"

export const StudentProfile = () => {

  const { data } = useSelectedStudent()
  const student = useStudentStore(s => s.student)

  const router = useRouter();

  const { show } = useModal();

  return (
    <ThemedScrollableView>
      <ImageFrame>
        <ProfileAvatarPane>
          <TouchableAvatar imagesrc={data?.student?.imagesrc}>
            <StudentAvatar style="full" pressable url={data?.student?.imagesrc} width={128} height={182} />
          </TouchableAvatar>
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
      {student &&
        <UserRibbon handleShowStudentCode={() => show("studentCode", { student })} />
      }
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
