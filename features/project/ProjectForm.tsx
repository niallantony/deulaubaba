import { InputLikeButton, ThemedButton } from "@/components/ThemedButton";
import { ThemedTextArea } from "@/components/ThemedInput";
import { LightText } from "@/components/ThemedText";
import down from "@/assets/images/down.png"
import calendar from "@/assets/images/calendar.png"
import { UploadImageFrame } from "@/components/ThemedView";
import { UploadImage } from "@/components/UploadImage";
import { useModal } from "@/hooks/useModal";
import { CommunicationCategory } from "@/types/dictionary";
import { Project, ProjectDetails } from "@/types/project"
import { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CategoryIndicator } from "../dictionary/CategoryPicker";
import { theme } from "@/themes/global";

type ProjectErrors = {
  objectiveError?: string,
  startedOnError?: string,
  categoriesError?: string,
}

export const ProjectForm = ({
  project, onSubmit, onBack
}: {
  project?: Project,
  onSubmit: (p: ProjectDetails) => void,
  onBack: () => void,
}) => {
  const [objective, setObjective] = useState<string | undefined>(project?.objective);
  const [startedOn, setStartedOn] = useState<number>(Date.now());
  const [categories, setCategories] = useState<CommunicationCategory[]>(project ? project.categories.map(dto => dto.label) : [])
  const [imgsrc, setImgsrc] = useState<string | null>(null)
  const [description, setDescription] = useState<string | undefined>(project?.description)
  const [errors, setErrors] = useState<ProjectErrors>({})
  const { show } = useModal();

  const dateString = new Date(startedOn!).toLocaleDateString()

  const validate = () => {
    const newErrors: ProjectErrors = {}
    if (!objective?.trim()) {
      newErrors.objectiveError = "프로젝트 목표를 입력해주세요"
    }
    if (!startedOn) {
      newErrors.startedOnError = "시작 날짜 선택해주세요"
    }
    if (categories.length === 0) {
      newErrors.categoriesError = "의사소통 기능을 선택해 주세요"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatDate = (d?: number) => {
    if (!d) return "2000-01-01"
    const [day, month, year] = new Date(d).toLocaleDateString().split('/')
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  }

  const handleSubmit = async () => {
    if (!validate()) {
      return
    }
    const post: ProjectDetails = {
      description,
      objective: objective!.trim(),
      imgsrc: imgsrc ? imgsrc : undefined,
      startedOn: formatDate(startedOn),
      categories,
    }
    onSubmit(post);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 24 }}>
      <KeyboardAwareScrollView
        extraScrollHeight={280}
      >
        <UploadImageFrame style={{ marginBottom: 12 }}>
          <UploadImage setImage={setImgsrc} image={imgsrc} preImage={project?.imgsrc} />
          <View style={{ flexGrow: 1 }}>
            <ThemedTextArea
              label={"프로젝트 목표"}
              value={objective ?? ""}
              onChange={setObjective}
              numberOfLines={5}
              multiline={true}
              rows={3}
              error={objective ? undefined : errors.objectiveError}
            />
            <LightText>프로젝트 시작</LightText>
            <InputLikeButton error={errors.startedOnError} onPress={() => {
              show("date", {
                date: startedOn,
                onSelect: setStartedOn
              })
            }}
            >
              <LightText>{dateString}</LightText>
              <Image source={calendar} style={{ width: 24, height: 24 }} />
            </InputLikeButton>
          </View>
        </UploadImageFrame>
        <LightText >의사소통 기능</LightText>
        <InputLikeButton error={categories.length > 0 ? undefined : errors.categoriesError} onPress={() => {
          show("category", {
            category: categories,
            setCategory: setCategories
          })
        }}>
          <ScrollView contentContainerStyle={{ flexDirection: "row", alignItems: 'center', }} horizontal={true}>
            {categories && categories.map((category) => {
              return (<CategoryIndicator category={category} key={category} />)
            })}

          </ScrollView>
          <Image source={down} style={{ width: 24, height: 24 }} />
        </InputLikeButton>
        <ThemedTextArea
          label={"이렇게 지도해주세요"}
          value={description ?? ""}
          onChange={setDescription}
          numberOfLines={5}
          multiline={true}
          rows={3}
        />
        <View style={{ flexDirection: 'row', justifyContent: "space-evenly", marginTop: 18 }} >
          <ThemedButton text={"  뒤로  "} type={"green"} onPress={onBack} row={true} />
          <ThemedButton text={"  다음  "} type={"green"} onPress={handleSubmit} row={true} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  )

}
