import { ButtonContainer } from "@/components/ButtonContainer";
import { FullScreenView } from "@/components/FullScreenView";
import { OverlayDialog } from "@/components/OverlayDialog";
import { InputLikeButton, ThemedButton } from "@/components/ThemedButton";
import { ThemedTextArea, UploadImage } from "@/components/ThemedInput";
import { LightText } from "@/components/ThemedText";
import { UploadImageFrame } from "@/components/ThemedView";
import { CommunicationCategory, DictionaryPosting, ExpressionType } from "@/types/dictionary"
import { useState } from "react"
import { Image, ScrollView, View } from "react-native";
import down from "@/assets/images/down.png"
import { CategoryIndicator, CategoryPicker } from "./CategoryPicker";
import { useStudent } from "@/context/StudentContext";

export const DictionaryForm = ({ type, onSubmit }: {
  type: ExpressionType;
  onSubmit: (d: DictionaryPosting) => void
}) => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<CommunicationCategory[]>([])
  const [imgsrc, setImgsrc] = useState()
  const [description, setDescription] = useState("")
  const [overlayVisible, setOverlayVisible] = useState(false)

  const { student } = useStudent();

  const handleSubmit = () => {
    // TODO: Handle Validation
    if (!student || !student.studentId) {
      return
    }
    if (!category || !title) {
      return;
    }
    const listing: DictionaryPosting = {
      studentId: student.studentId,
      type,
      title,
      category,
      imgsrc,
      description,
    }
    onSubmit(listing);
  }

  const handleUploadImage = () => {
  }

  return (
    <FullScreenView>
      <UploadImageFrame style={{ marginBottom: 12 }}>
        <UploadImage onPress={handleUploadImage} />
        <View style={{ flexGrow: 1, width: 100, }}>
          <ThemedTextArea
            label={"의사소통 내용"}
            value={title}
            onChange={setTitle}
            numberOfLines={5}
            multiline={true}
            $height={"92px"}
          />
        </View>
      </UploadImageFrame>
      <LightText >의사소통 기능(선택)</LightText>
      <InputLikeButton onPress={() => { setOverlayVisible(true) }}>
        <ScrollView contentContainerStyle={{ flexDirection: "row", alignItems: 'center', }} horizontal={true}>
          {category && category.map((category) => {
            return (<CategoryIndicator category={category} key={category} />)
          })}

        </ScrollView>
        <Image source={down} style={{ width: 24, height: 24 }} />
      </InputLikeButton>
      <OverlayDialog
        visible={overlayVisible}
        onDismiss={() => setOverlayVisible(false)}
      >
        <CategoryPicker setCategory={setCategory} category={category} />
      </OverlayDialog>
      <ThemedTextArea
        label={"추가설명(선택)"}
        value={description}
        onChange={setDescription}
        numberOfLines={5}
        multiline={true}
        $height={"82px"}
      />
      <ButtonContainer>
        <ThemedButton text={"등록하기"} type={"green"} onPress={handleSubmit} />
      </ButtonContainer>
    </FullScreenView>

  )
}
