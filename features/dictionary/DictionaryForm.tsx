import { ButtonContainer } from "@/components/ButtonContainer";
import { InputLikeButton, ThemedButton } from "@/components/ThemedButton";
import { ThemedTextArea } from "@/components/ThemedInput";
import { LightText } from "@/components/ThemedText";
import { UploadImageFrame } from "@/components/ThemedView";
import { CommunicationCategory, DictionaryListing, DictionaryPosting, ExpressionType } from "@/types/dictionary"
import { useState } from "react"
import { Image, ScrollView, View } from "react-native";
// @ts-ignore
import down from "@/assets/images/down.png"
import { CategoryIndicator } from "./CategoryPicker";
import { useStudentStore } from "@/store/currentStudent";
import { UploadImage } from "@/components/UploadImage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useModal } from "@/hooks/useModal";

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
  const [errors, setErrors] = useState<DictionaryErrors>({})
  const student = useStudentStore((s) => s.student)

  const { show } = useModal();

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
    if (!validate()) {
      return
    }
    if (!student || !student.studentId) {
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
    <KeyboardAwareScrollView
      extraScrollHeight={280}
    >
      <UploadImageFrame style={{ marginBottom: 12 }}>
        <UploadImage setImage={setImgsrc} image={imgsrc} preImage={entry?.imgsrc} />
        <View style={{ flexGrow: 1 }}>
          <ThemedTextArea
            label={"의사소통 내용"}
            value={title ?? ""}
            onChange={setTitle}
            numberOfLines={5}
            multiline={true}
            rows={3}
            error={title ? undefined : errors.titleError}
          />
        </View>
      </UploadImageFrame>
      <LightText >의사소통 기능</LightText>
      <InputLikeButton error={category.length > 0 ? undefined : errors.categoryError} onPress={() => {
        show("category", {
          category,
          setCategory
        })
      }}>
        <ScrollView contentContainerStyle={{ flexDirection: "row", alignItems: 'center', }} horizontal={true}>
          {category && category.map((category) => {
            return (<CategoryIndicator category={category} key={category} />)
          })}

        </ScrollView>
        <Image source={down} style={{ width: 24, height: 24 }} />
      </InputLikeButton>
      <ThemedTextArea
        label={"추가설명(선택)"}
        value={description ?? ""}
        onChange={setDescription}
        numberOfLines={5}
        multiline={true}
        rows={3}
      />
      <ButtonContainer width={150}>
        <ThemedButton text={"등록하기"} type={"green"} onPress={handleSubmit} />
      </ButtonContainer>
    </KeyboardAwareScrollView>

  )
}

