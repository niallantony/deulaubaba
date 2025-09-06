import { RowButtonContainer } from "@/components/ButtonContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedTextArea, ThemedTextInput, ThemedTwinInput } from "@/components/ThemedInput";
import { TwinInputs, UploadImageFrame } from "@/components/ThemedView";
import { theme } from "@/themes/global";
import { Student } from "@/types/student";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { useUpdateStudent } from "@/hooks/useUpdateStudent";
import { useSelectedStudent } from "@/hooks/useSelectedStudent";
import { UploadImage } from "@/components/UploadImage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function EditStudent() {
  const { data } = useSelectedStudent();
  const student = data?.student
  const { updateDetails } = useUpdateStudent();
  const [name, setName] = useState(student?.name)
  const [school, setSchool] = useState(student?.school)
  const [age, setAge] = useState(student?.age)
  const [grade, setGrade] = useState(student?.grade)
  const [setting, setSetting] = useState(student?.setting)
  const [disability, setDisability] = useState(student?.disability)
  const [imgsrc, setImgsrc] = useState<string | null>(null);
  const router = useRouter()


  const handleSubmit = () => {
    if (!name || !school || !age || !grade || !setting || !disability) {
      return
    }
    const editStudent: Omit<Student, "communicationDetails" | "challengesDetails"> = {
      studentId: student?.studentId,
      name,
      school,
      age,
      grade,
      setting,
      disability,
      imagesrc: imgsrc ? imgsrc : undefined,
    }
    if (student?.studentId) {
      updateDetails.mutate(editStudent);
      router.dismissAll();
    }
  }

  const handleCancel = () => {
    router.dismissAll()
  }

  return (
    <KeyboardAwareScrollView
      style={{ paddingHorizontal: 24, backgroundColor: theme.colors.background }}
      extraScrollHeight={60}
    >
      <UploadImageFrame>
        <UploadImage setImage={setImgsrc} preImage={student?.imagesrc} image={imgsrc} />
        <View style={{ flexGrow: 1, }}>
          <ThemedTextInput
            label={"학생 이름"}
            value={name ? name : ""}
            onChange={setName}
          />
          <ThemedTextInput
            label={"소속 학교명"}
            value={school ? school : ""}
            onChange={setSchool}
          />
        </View>
      </UploadImageFrame>
      <TwinInputs>
        <ThemedTwinInput
          inputMode="numeric"
          position={"left"}
          label={"나이"}
          value={age ? age.toString() : ""}
          onChange={(e) => setAge(parseInt(e))}
        />
        <ThemedTwinInput
          inputMode="numeric"
          position={"right"}
          label={"학년"}
          value={grade ? grade.toString() : ""}
          onChange={(e) => setGrade(parseInt(e))}
        />
      </TwinInputs>
      <ThemedTextInput
        label={"배치유형"}
        value={setting ? setting : ""}
        onChange={setSetting}
      />
      <ThemedTextInput
        label={"장애유형"}
        value={disability ? disability : ""}
        onChange={setDisability}
      />
      <RowButtonContainer>
        <ThemedButton text={"저장"} row={true} type={"green"} onPress={handleSubmit} />
        <ThemedButton text={"취소"} row={true} type={"outline"} onPress={handleCancel} />
      </RowButtonContainer>

    </KeyboardAwareScrollView>
  )


}

