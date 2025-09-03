import { TitleText } from "@/components/ThemedText"
// @ts-ignore
import noStudent from '@/assets/images/personSearch.png'
import { IconLink } from "@/components/ThemedLink"
import { FullView } from "@/components/ThemedView"

export const NoSelectedStudent = () => {
  return (
    <FullView>
      <TitleText>
        No Selected Student
      </TitleText>
      <IconLink
        margin={"0"}
        text="Select Student"
        href={'/selectstudent'} size={"md"}
        imageSource={noStudent}
        imageOptions={{ width: 64, height: 64, marginTop: 42 }}
      />
    </FullView>
  )
}
