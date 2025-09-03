import { ButtonContainer } from "@/components/ButtonContainer";
import { FullScreenView } from "@/components/FullScreenView";
import { OverlayDialog } from "@/components/OverlayDialog";
import { InputLikeButton, ThemedButton } from "@/components/ThemedButton";
import { ThemedTextArea } from "@/components/ThemedInput";
import { ErrorText, LightText } from "@/components/ThemedText";
import { UploadImageFrame } from "@/components/ThemedView";
import { CommunicationCategory, DictionaryListing, DictionaryPosting, ExpressionType } from "@/types/dictionary"
import { useState } from "react"
import { Image, ScrollView, View } from "react-native";
// @ts-ignore
import down from "@/assets/images/down.png"
import { CategoryIndicator, CategoryPicker } from "./CategoryPicker";
import { useStudentStore } from "@/store/currentStudent";
import { UploadImage } from "@/components/UploadImage";

type DictionaryErrors = {
  titleError?: string,
  categoryError?: string,
}

export const DictionaryForm = ({ type, onSubmit, entry }: {
  type: ExpressionType;
  onSubmit: (d: DictionaryPosting) => void
  entry?: DictionaryListing
}) => {
  const [title, setTitle] = useState<string | undefined>(entry?.title)
  const [category, setCategory] = useState<CommunicationCategory[]>(entry ? entry.category : [])
  const [imgsrc, setImgsrc] = useState<string | null>(null)
  const [description, setDescription] = useState<string | undefined>(entry?.description)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [errors, setErrors] = useState<DictionaryErrors>({})
  const student = useStudentStore((s) => s.student)

  const validate = () => {
    const newErrors: DictionaryErrors = {}
    if (!title?.trim()) {
      newErrors.titleError = "의사소통 내용을 입력해주세요"
    }
    if (category.length === 0) {
      newErrors.categoryError = "의사소통 기능을 선택해 주세요"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  const handleSubmit = async () => {
    // TODO: Handle Validation
    if (!student || !student.studentId) {
      return
    }
    if (!validate()) {
      return
    }
    const listing: DictionaryPosting = {
      studentId: student.studentId,
      type,
      title: title!.trim(),
      category,
      imgsrc: imgsrc ? imgsrc : undefined,
      description,
    }
    onSubmit(listing);
  }

  return (
    <FullScreenView>
      <UploadImageFrame style={{ marginBottom: 12 }}>
        <UploadImage setImage={setImgsrc} image={imgsrc} preImage={entry?.imgsrc} />
        <View style={{ flexGrow: 1 }}>
          <ThemedTextArea
            label={"의사소통 내용"}
            value={title ?? ""}
            onChange={setTitle}
            numberOfLines={5}
            multiline={true}
            height={3}
            error={!!errors.titleError}
          />
          {errors.titleError && <ErrorText>{errors.titleError}</ErrorText>}
        </View>
      </UploadImageFrame>
      <LightText >의사소통 기능</LightText>
      <InputLikeButton error={!!errors.categoryError} onPress={() => { setOverlayVisible(true) }}>
        <ScrollView contentContainerStyle={{ flexDirection: "row", alignItems: 'center', }} horizontal={true}>
          {category && category.map((category) => {
            return (<CategoryIndicator category={category} key={category} />)
          })}

        </ScrollView>
        <Image source={down} style={{ width: 24, height: 24 }} />
      </InputLikeButton>
      {errors.categoryError && <ErrorText>{errors.categoryError}</ErrorText>}
      <OverlayDialog
        visible={overlayVisible}
        onDismiss={() => setOverlayVisible(false)}
      >
        <CategoryPicker setCategory={setCategory} category={category} />
      </OverlayDialog>
      <ThemedTextArea
        label={"추가설명(선택)"}
        value={description ?? ""}
        onChange={setDescription}
        numberOfLines={5}
        multiline={true}
        height={3}
      />
      <ButtonContainer>
        <ThemedButton text={"등록하기"} type={"green"} onPress={handleSubmit} />
      </ButtonContainer>
    </FullScreenView>

  )
}

