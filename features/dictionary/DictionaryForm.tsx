import { ButtonContainer } from "@/components/ButtonContainer";
import { FullScreenView } from "@/components/FullScreenView";
import { OverlayDialog } from "@/components/OverlayDialog";
import { InputLikeButton, ThemedButton } from "@/components/ThemedButton";
import { FormLabel, ThemedTextArea, UploadImage } from "@/components/ThemedInput";
import { LightText } from "@/components/ThemedText";
import { UploadImageFrame } from "@/components/ThemedView";
import { theme } from "@/themes/global";
import { CommunicationCategory, DictionaryPosting, ExpressionType } from "@/types/dictionary"
import { useState } from "react"
import { Image, View } from "react-native";
import down from "@/assets/images/down.png"

export const DictionaryForm = ({ type, onSubmit }: {
  type: ExpressionType;
  onSubmit: (d: DictionaryPosting) => void
}) => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<CommunicationCategory[]>()
  const [imgsrc, setImgsrc] = useState()
  const [description, setDescription] = useState("")
  const [overlayVisible, setOverlayVisible] = useState(false)

  const handleSubmit = () => {
    if (!category || !title) {
      return;
    }
    const listing: DictionaryPosting = {
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
        <View style={{ flexGrow: 1 }}>
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
        <View>
        </View>
        <Image source={down} style={{ width: 24, height: 24 }} />
      </InputLikeButton>
      <OverlayDialog
        visible={overlayVisible}
        onDismiss={() => setOverlayVisible(false)}
      >
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
