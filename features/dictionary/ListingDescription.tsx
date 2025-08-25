import { RowButtonContainer } from "@/components/ButtonContainer"
import { StudentAvatar } from "@/components/StudentAvatar"
import { ThemedButton } from "@/components/ThemedButton"
import { InfoLabel, StyledText } from "@/components/ThemedText"
import { ImageFrame, InfoPane, ProfileAvatarPane, RowText, ThemedScrollableView } from "@/components/ThemedView"
import { DictionaryListing } from "@/types/dictionary"
import { View } from "react-native"
import { CategoryIndicator } from "./CategoryPicker"

export const ListingDescription = ({ entry }: { entry: DictionaryListing }) => {

  return (
    <ThemedScrollableView>
      <ImageFrame>
        <ProfileAvatarPane>
          <StudentAvatar style="full" url={entry.imgsrc} width={128} height={182} />
        </ProfileAvatarPane>
        <View style={{ flex: 1 }}>
          <InfoLabel>의사소통내용</InfoLabel>
          <StyledText>{entry.title}</StyledText>
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
      </ImageFrame>
      <InfoLabel>추가설명</InfoLabel>
      <InfoPane>
        <StyledText>{entry.description}</StyledText>
      </InfoPane>
      <RowButtonContainer>
        <ThemedButton
          text="수정하기"
          row={true}
          type="green"
          onPress={() => { }}
        />
        <ThemedButton
          text="삭체하기"
          row={true}
          type="outline"
          onPress={() => { }}
        />
      </RowButtonContainer>

    </ThemedScrollableView>
  )
}
