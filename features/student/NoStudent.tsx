import { TitleText } from "@/components/ThemedText"
// @ts-ignore
import noStudent from '@/assets/images/personSearch.png'
import { IconLink } from "@/components/ThemedButton"
import { FullView } from "@/components/ThemedView"

export const NoStudent = () => {
  return (
    <FullView>
      <TitleText>
        No Student Found
      </TitleText>
      <IconLink
        text="Add Student"
        href={'/student/add'} size={"md"}
        imageSource={noStudent}
        imageOptions={{ width: 64, height: 64, marginTop: 42 }}
      />
    </FullView>
  )
}
