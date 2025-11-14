import { RowButtonContainer } from "@/components/ButtonContainer"
import { StudentAvatar } from "@/components/StudentAvatar"
import { InfoLabel, StyledText } from "@/components/ThemedText"
import { ImageFrame, InfoPane, ProfileAvatarPane } from "@/components/ThemedView"
import { DictionaryListing } from "@/types/dictionary"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { CategoryIndicator } from "./CategoryPicker"
import { ThemedButton } from "@/components/ThemedButton"
import { TouchableAvatar } from "@/components/TouchableAvatar"

export const DictionaryView = ({ entry, onDeleteRequest, onEditPress }: {
  entry: DictionaryListing,
  onDeleteRequest: () => void,
  onEditPress: () => void,

}) => {
  return (

    <ScrollView style={{ paddingHorizontal: 4 }}>
      <ImageFrame>
        <ProfileAvatarPane>
          <TouchableAvatar imagesrc={entry.imgsrc}>
            <StudentAvatar style="full" url={entry.imgsrc} width={128} height={182} />
          </TouchableAvatar>
        </ProfileAvatarPane >
        <View style={{ flex: 1 }}>
          <InfoLabel>의사소통내용</InfoLabel>
          <InfoPane>
            <StyledText>{entry.title}</StyledText>
          </InfoPane>

          <InfoLabel>의사소통기능</InfoLabel>
          <InfoPane>
            {entry.category.map((category) => {
              return (
                <View key={category} style={{ marginBottom: 4 }} >
                  <CategoryIndicator category={category} />
                </View>
              )
            })
            }
          </InfoPane>

        </View>
      </ImageFrame >
      <InfoLabel>추가설명</InfoLabel>
      <InfoPane>
        <StyledText>{entry.description}</StyledText>
      </InfoPane>
      <RowButtonContainer>
        <ThemedButton
          text="수정하기"
          row={true}
          type="green"
          onPress={onEditPress}
        />
        <ThemedButton
          text="삭제하기"
          row={true}
          type="outline"
          onPress={onDeleteRequest}
        />
      </RowButtonContainer>
    </ScrollView >
  )
}
