import { RowButtonContainer } from "@/components/ButtonContainer";
import { FullScreenView } from "@/components/FullScreenView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedTextArea, ThemedTextInput, ThemedTwinInput, UploadImage } from "@/components/ThemedInput";
import { TwinInputs, UploadImageFrame } from "@/components/ThemedView";
import { useSession } from "@/context/AuthContext";
import { useStudent } from "@/context/StudentContext";
import { theme } from "@/themes/global";
import { Student } from "@/types/student";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function EditStudent() {
  const { student, updateStudent } = useStudent();
  const [name, setName] = useState(student?.name)
  const [school, setSchool] = useState(student?.school)
  const [age, setAge] = useState(student?.age)
  const [grade, setGrade] = useState(student?.grade)
  const [setting, setSetting] = useState(student?.setting)
  const [disability, setDisability] = useState(student?.disability)
  const [communicationDetails, setCommunicationDetails] = useState(student?.communicationDetails)
  const [challengesDetails, setChallengesDetails] = useState(student?.challengesDetails)
  const [imgsrc, setImgsrc] = useState<string | null>(null);
  const router = useRouter()

  const { user } = useSession();

  const handleSubmit = () => {
    if (!name || !school || !age || !grade || !setting || !disability) {
      return
    }
    const editStudent: Student = {
      name,
      school,
      age,
      grade,
      setting,
      disability,
      communicationDetails,
      challengesDetails,
    }
    if (user && student?.studentId) {
      updateStudent(editStudent);
      router.dismissAll();
    }




  }

  const handleCancel = () => {
    router.dismissAll()
  }

  return (
    <FullScreenView style={{ backgroundColor: theme.colors.background }}>
      <UploadImageFrame>
        <UploadImage onPress={() => { console.log(imgsrc) }} preImage={student?.imagesrc} image={imgsrc} />
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
      <ThemedTextArea
        label={"주요 의사소통특성"}
        value={communicationDetails ? communicationDetails : ""}
        onChange={setCommunicationDetails}
        numberOfLines={5}
        multiline={true}
      />
      <ThemedTextArea
        label={"주요 도전행동 특성"}
        value={challengesDetails ? challengesDetails : ""}
        onChange={setChallengesDetails}
        numberOfLines={5}
        multiline={true}
      />
      <RowButtonContainer>
        <ThemedButton text={"저장"} row={true} type={"green"} onPress={handleSubmit} />
        <ThemedButton text={"취소"} row={true} type={"outline"} onPress={handleCancel} />
      </RowButtonContainer>

    </FullScreenView>
  )


}

