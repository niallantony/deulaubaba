import { RowButtonContainer } from "@/components/ButtonContainer"
import { StudentAvatar } from "@/components/StudentAvatar"
import { ThemedButton } from "@/components/ThemedButton"
import { InfoLabel, StyledText } from "@/components/ThemedText"
import { ImageFrame, InfoPane, ProfileAvatarPane } from "@/components/ThemedView"
import { DictionaryListing, DictionaryPosting } from "@/types/dictionary"
import { ScrollView, View } from "react-native"
import { CategoryIndicator } from "./CategoryPicker"
import { useState } from "react"
import { DictionaryForm } from "./DictionaryForm"
import { useDictionaryMutations } from "@/hooks/useDictionaryMutations"
import { useModal } from "@/hooks/useModal"

export const ListingDescription = ({ entry, onUpdate }: { entry: DictionaryListing, onUpdate: () => void }) => {
  const [edit, setEdit] = useState(false);
  const id = entry.id

  const { update, remove } = useDictionaryMutations();


  const { show } = useModal();

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
            <ScrollView>
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
                  onPress={() => show("confirm", {
                    text: "정말 삭제하겠습니까?",
                    onConfirm: handleDelete,
                    confirmText: "삭제"
                  })}
                />
              </RowButtonContainer>
            </ScrollView >
          )
      }
    </>
  )
}
