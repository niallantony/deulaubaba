import { HasCode } from "@/features/student/HasCode";
import { InputStudentCode } from "@/features/student/InputCode";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { StudentForm } from "@/features/student/StudentForm";
import { useAddStudent } from "@/hooks/useAddStudent";
import { ConfirmStudent } from "@/features/student/ConfirmStudent";
import { CenterText, LightText, LinkText } from "@/components/ThemedText";
import { Pressable, View } from "react-native";


export default function AddStudent() {
  const {
    handleStudentCode,
    linkStudent,
    handleNewStudent,
    submitStudent,
    screen,
    reset,
    inputCode,
    makeCode,
    studentPreview,
    error,
  } = useAddStudent();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      reset();
    }, [reset])
  )


  if (studentPreview && screen === "confirm_new") {
    return (<ConfirmStudent student={studentPreview} onConfirm={() => {
      submitStudent();
      router.navigate('/student');
    }} />)
  }
  if (studentPreview && screen === "confirm_link") {
    return (<ConfirmStudent student={studentPreview} onConfirm={() => {
      linkStudent()
      router.navigate('/student');
    }} />)
  }
  if (screen === "add") {
    return (<HasCode
      inputCode={inputCode}
      makeCode={makeCode}
    />)
  } else if (screen === "code") {
    return (
      <InputStudentCode
        onSubmit={handleStudentCode}
        onBack={() => reset()}
        error={error.preview}
      />
    );
  } else if (screen === "register") {
    return (<StudentForm
      onSubmit={handleNewStudent}
      onCancel={reset}

    >
      <View style={{ marginVertical: 12 }}>
        <CenterText >
          <LightText style={{ fontSize: 18 }}>이미 코드가 있나요? </LightText>
          <Pressable onPress={inputCode}>
            <LinkText> 학생 코드 입력하기</LinkText>
          </Pressable>
        </CenterText>
      </View>
    </StudentForm>


    );
  }
}
