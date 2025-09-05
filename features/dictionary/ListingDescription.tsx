import { RowButtonContainer } from "@/components/ButtonContainer"
import { StudentAvatar } from "@/components/StudentAvatar"
import { ThemedButton } from "@/components/ThemedButton"
import { InfoLabel, StyledText } from "@/components/ThemedText"
import { ImageFrame, InfoPane, ProfileAvatarPane, ThemedScrollableView } from "@/components/ThemedView"
import { DictionaryListing, DictionaryPosting } from "@/types/dictionary"
import { View } from "react-native"
import { CategoryIndicator } from "./CategoryPicker"
import { useState } from "react"
import { DictionaryForm } from "./DictionaryForm"
import { OverlayDialog } from "@/components/OverlayDialog"
import { useDictionaryMutations } from "@/hooks/useDictionaryMutations"

export const ListingDescription = ({ entry, onUpdate }: { entry: DictionaryListing, onUpdate: () => void }) => {
  const [edit, setEdit] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false)
  const id = entry.id

  const { update, remove } = useDictionaryMutations();


  const handleEditSubmit = (dictionary: DictionaryPosting) => {
    update.mutate({ dictionary, id })
    onUpdate();
  }

  const handleDelete = () => {
    remove.mutate(entry.id);
    onUpdate();
  }

  return (
    <>
      {
        edit ?
          (
            <DictionaryForm type={entry.type} onSubmit={handleEditSubmit} entry={entry} />
          )
          :
          (
            <ThemedScrollableView>
              <ImageFrame>
                <ProfileAvatarPane>
                  <StudentAvatar style="full" url={entry.imgsrc} width={128} height={182} />
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
                  onPress={() => { setEdit(true) }}
                />
                <ThemedButton
                  text="삭체하기"
                  row={true}
                  type="outline"
                  onPress={() => { setOverlayVisible(true) }}
                />
              </RowButtonContainer>
              <OverlayDialog
                visible={overlayVisible}
                onDismiss={() => setOverlayVisible(false)}
              >
                <StyledText>정말로 삭제하겠습니까?</StyledText>
                <RowButtonContainer>
                  <ThemedButton
                    text="삭제"
                    row={true}
                    type="green"
                    onPress={handleDelete}
                  />
                  <ThemedButton
                    text="취소"
                    row={true}
                    type="outline"
                    onPress={() => { setOverlayVisible(false) }}
                  />
                </RowButtonContainer>
              </OverlayDialog>
            </ThemedScrollableView >
          )
      }
    </>
  )
}
