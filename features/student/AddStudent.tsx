import { ButtonContainer } from "@/components/ButtonContainer"
import { FullScreenView } from "@/components/FullScreenView"
import { ThemedButton } from "@/components/ThemedButton"
import { CenterText, LightTextVariable, LinkText } from "@/components/ThemedText"
import { ThemedTextInput, ThemedTwinInput, UploadImage } from "@/components/ThemedInput"
import { TwinInputs, UploadImageFrame } from "@/components/ThemedView"
import { useState } from "react"
import { Pressable, View } from "react-native"
import { Student } from "@/types/student"
import { useSession } from "@/context/AuthContext"
import * as ImagePicker from "expo-image-picker"

export type AddStudentProps = {
  onSubmit: (student: Student, uid: string) => void;
  onSelectInput: () => void;
}

export const AddStudentForm = ({ onSubmit, onSelectInput }: AddStudentProps) => {
  const [name, setName] = useState("")
  const [school, setSchool] = useState("")
  const [age, setAge] = useState("")
  const [grade, setGrade] = useState("")
  const [setting, setSetting] = useState("")
  const [disability, setDisability] = useState("")
  const [imgsrc, setImgsrc] = useState("")

  const { user } = useSession();

  const handleSubmit = () => {
    const student: Student = {
      name,
      school,
      age: parseInt(age),
      grade: parseInt(grade),
      setting,
      disability,
      imagesrc: imgsrc ? imgsrc : undefined,
    }
    if (user) {
      onSubmit(student, user?.userId)
    } else {
      throw new Error("No user logged in")
    }

  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImgsrc(result.assets[0].uri);
    }

  }

  return (
    <FullScreenView>
      <UploadImageFrame>
        <UploadImage onPress={pickImage} image={imgsrc} />
        <View style={{ flexGrow: 1, }}>
          <ThemedTextInput
            label={"학생 이름"}
            value={name}
            onChange={setName}
          />
          <ThemedTextInput
            label={"소속 학교명"}
            value={school}
            onChange={setSchool}
          />
        </View>
      </UploadImageFrame>
      <TwinInputs>
        <ThemedTwinInput
          inputMode="numeric"
          position={"left"}
          label={"나이"}
          value={age}
          onChange={setAge}
        />
        <ThemedTwinInput
          inputMode="numeric"
          position={"right"}
          label={"학년"}
          value={grade}
          onChange={setGrade}
        />
      </TwinInputs>
      <ThemedTextInput
        label={"배치유형"}
        value={setting}
        onChange={setSetting}
      />
      <ThemedTextInput
        label={"장애유형"}
        value={disability}
        onChange={setDisability}
      />
      <ButtonContainer>
        <ThemedButton text={"학생 코드 만들기"} type={"green"} onPress={handleSubmit} />
      </ButtonContainer>
      <CenterText style={{ marginTop: 28 }}>
        <LightTextVariable $size={"md"}>이미 코드가 있나요? </LightTextVariable>
        <Pressable onPress={onSelectInput}>
          <LinkText $size={"md"}> 학생 코드 입력하기</LinkText>
        </Pressable>
      </CenterText>
    </FullScreenView>
  )
}
