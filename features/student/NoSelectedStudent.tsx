import { TitleText } from "@/components/ThemedText"
// @ts-ignore
import noStudent from '@/assets/images/personSearch.png'
import { IconLink } from "@/components/ThemedButton"
import { FullView } from "@/components/ThemedView"

export const NoSelectedStudent = () => {
  return (
    <FullView>
      <TitleText>
        No Selected Student
      </TitleText>
      <IconLink
        text="Select Student"
        href={'/selectstudent'} size={"md"}
        imageSource={noStudent}
        imageOptions={{ width: 64, height: 64, marginTop: 42 }}
      />
    </FullView>
  )
}
