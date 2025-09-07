import { ButtonContainer } from "@/components/ButtonContainer"
import { ThemedButton } from "@/components/ThemedButton"
import { CenterText, ErrorText, LightText, LinkText } from "@/components/ThemedText"
import { ThemedTextInput, ThemedTwinInput } from "@/components/ThemedInput"
import { TwinInputs, UploadImageFrame } from "@/components/ThemedView"
import { useState } from "react"
import { Pressable, View } from "react-native"
import { Student } from "@/types/student"
import { UploadImage } from "@/components/UploadImage"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { theme } from "@/themes/global"

type StudentFormErrors = {
  nameError?: string,
  schoolError?: string,
  ageError?: string,
  gradeError?: string,
  settingError?: string,
  disabilityError?: string,
}

export type StudentFormProps = {
  onSubmit: (student: Omit<Student, "communicationDetails" | "challengesDetails">) => void;
  onSelectInput: () => void;
  student?: Student;
}

export const StudentForm = ({ onSubmit, onSelectInput, student }: StudentFormProps) => {
  const [name, setName] = useState(student?.name)
  const [school, setSchool] = useState(student?.school)
  const [age, setAge] = useState(student?.age.toString)
  const [grade, setGrade] = useState(student?.grade.toString)
  const [setting, setSetting] = useState(student?.setting)
  const [disability, setDisability] = useState(student?.disability)
  const [imgsrc, setImgsrc] = useState(student?.imagesrc ?? null)
  const [errors, setErrors] = useState<StudentFormErrors>({})

  const validate = () => {
    const newErrors: StudentFormErrors = {}
    if (!name?.trim()) {
      newErrors.nameError = "학생 이름 입력해주세요"
    }
    if (!school?.trim()) {
      newErrors.schoolError = "학생 소속 학교명 입력해주세요"
    }
    if (!age) {
      newErrors.ageError = "학생 나이 입력해주세요"
    } else if (!parseInt(age.trim())) {
      newErrors.ageError = "학생 나이 숫자로 입력해주세요"
    }
    if (!grade) {
      newErrors.gradeError = "학생 학년 입력해주세요"
    } else if (!parseInt(grade.trim())) {
      newErrors.gradeError = "학생 학년 숫자로 입력해주세요"
    }
    if (!setting?.trim()) {
      newErrors.settingError = "배치유형 입력해주세요"
    }
    if (!disability?.trim()) {
      newErrors.disabilityError = "장애유형 학교명 입력해주세요"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) {
      return
    }
    const student: Omit<Student, "communicationDetails" | "challengesDetails"> = {
      name: name!,
      school: school!,
      age: parseInt(age!),
      grade: parseInt(grade!),
      setting: setting!,
      disability: disability!,
      imagesrc: imgsrc ? imgsrc : undefined,
    }
    onSubmit(student)
  }

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={80}
      contentContainerStyle={{ paddingHorizontal: 24, backgroundColor: theme.colors.background }}
    >
      <UploadImageFrame>
        <UploadImage setImage={setImgsrc} image={imgsrc} />
        <View style={{ flexGrow: 1, }}>
          <ThemedTextInput
            label={"학생 이름"}
            value={name}
            onChange={setName}
            error={errors.nameError}
          />
          <ThemedTextInput
            label={"소속 학교명"}
            value={school}
            onChange={setSchool}
            error={errors.schoolError}
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
          error={errors.ageError}
        />
        <ThemedTwinInput
          inputMode="numeric"
          position={"right"}
          label={"학년"}
          value={grade}
          onChange={setGrade}
          error={errors.gradeError}
        />
      </TwinInputs>
      <ThemedTextInput
        label={"배치유형"}
        value={setting}
        onChange={setSetting}
        error={errors.settingError}
      />
      <ThemedTextInput
        label={"장애유형"}
        value={disability}
        onChange={setDisability}
        error={errors.disabilityError}
      />
      <ButtonContainer width={150}>
        <ThemedButton text={"학생 코드 만들기"} type={"green"} onPress={handleSubmit} />
      </ButtonContainer>
      <CenterText style={{ marginTop: 28 }}>
        <LightText style={{ fontSize: 18 }}>이미 코드가 있나요? </LightText>
        <Pressable onPress={onSelectInput}>
          <LinkText> 학생 코드 입력하기</LinkText>
        </Pressable>
      </CenterText>
    </KeyboardAwareScrollView>
  )
}
