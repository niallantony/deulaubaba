import { RowButtonContainer } from "@/components/ButtonContainer"
import { ThemedButton } from "@/components/ThemedButton"
import { ThemedTextInput, ThemedTwinInput } from "@/components/ThemedInput"
import { TwinInputs, UploadImageFrame } from "@/components/ThemedView"
import { PropsWithChildren, useState } from "react"
import { View } from "react-native"
import { Student } from "@/types/student"
import { UploadImage } from "@/components/UploadImage"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { theme } from "@/themes/global"

type StudentFormErrors = Partial<Record<
  "name" | "school" | "age" | "grade" | "setting" | "disability",
  string
>>

export type StudentFormProps = {
  onSubmit: (student: Omit<Student, "communicationDetails" | "challengesDetails">) => void;
  onCancel: () => void;
  student?: Student;
}

export const StudentForm = ({ onSubmit, onCancel, student, children }: StudentFormProps & PropsWithChildren) => {
  const [name, setName] = useState(student?.name)
  const [school, setSchool] = useState(student?.school)
  const [age, setAge] = useState(student?.age.toString())
  const [grade, setGrade] = useState(student?.grade.toString())
  const [setting, setSetting] = useState(student?.setting)
  const [disability, setDisability] = useState(student?.disability)
  const [imgsrc, setImgsrc] = useState<string | null>(null)
  const [errors, setErrors] = useState<StudentFormErrors>({})

  const validate = () => {
    const newErrors: StudentFormErrors = {}
    if (!name?.trim()) {
      newErrors.name = "학생 이름 입력해주세요"
    }
    if (!school?.trim()) {
      newErrors.school = "학생 소속 학교명 입력해주세요"
    }
    if (!age) {
      newErrors.age = "학생 나이 입력해주세요"
    } else if (!parseInt(age.trim())) {
      newErrors.age = "학생 나이 숫자로 입력해주세요"
    }
    if (!grade) {
      newErrors.grade = "학생 학년 입력해주세요"
    } else if (!parseInt(grade.trim())) {
      newErrors.grade = "학생 학년 숫자로 입력해주세요"
    }
    if (!setting?.trim()) {
      newErrors.setting = "배치유형 입력해주세요"
    }
    if (!disability?.trim()) {
      newErrors.disability = "장애유형 입력해주세요"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) {
      return
    }

    const newStudent: Omit<Student, "communicationDetails" | "challengesDetails"> = {
      name: name!,
      school: school!,
      age: parseInt(age!),
      grade: parseInt(grade!),
      setting: setting!,
      disability: disability!,
      imagesrc: imgsrc ? imgsrc : undefined,
      studentId: student?.studentId ? student.studentId : undefined
    }
    onSubmit(newStudent)
  }

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={80}
      contentContainerStyle={{ paddingHorizontal: 24, backgroundColor: theme.colors.background }}
    >
      <UploadImageFrame>
        <UploadImage
          setImage={setImgsrc}
          image={imgsrc}
          preImage={student?.imagesrc}
        />
        <View style={{ flexGrow: 1, }}>
          <ThemedTextInput
            label={"학생 이름"}
            value={name}
            onChange={setName}
            error={errors.name}
          />
          <ThemedTextInput
            label={"소속 학교명"}
            value={school}
            onChange={setSchool}
            error={errors.school}
          />
        </View>
      </UploadImageFrame>
      <TwinInputs>
        <ThemedTwinInput
          inputMode="numeric"
          twinPosition={"left"}
          label={"나이"}
          value={age}
          onChange={setAge}
          error={errors.age}
        />
        <ThemedTwinInput
          inputMode="numeric"
          twinPosition={"right"}
          label={"학년"}
          value={grade}
          onChange={setGrade}
          error={errors.grade}
        />
      </TwinInputs>
      <ThemedTextInput
        label={"배치유형"}
        value={setting}
        onChange={setSetting}
        error={errors.setting}
      />
      <ThemedTextInput
        label={"장애유형"}
        value={disability}
        onChange={setDisability}
        error={errors.disability}
      />
      <RowButtonContainer>
        <ThemedButton text={"학생 등록"} row type={"green"} onPress={handleSubmit} />
        <ThemedButton text={"취소"} row type={"outline"} onPress={onCancel} />
      </RowButtonContainer>
      {children}

    </KeyboardAwareScrollView>
  )
}
