import { useSession } from "@/context/AuthContext"
import { useStudents } from "@/hooks/useStudents";
import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import { ButtonTextTheme, ErrorText } from "./ThemedText";
import { StudentAvatar } from "./StudentAvatar";
import styled from "styled-components/native";

const CenteredOverlay = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.4);
`;

const DialogBox = styled.View`
  background-color: ${props => props.theme.colors.inputs};
  padding: ${props => props.theme.spacing.default};
  border-radius: 12px;
  width: 80%;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 4;
`;

const ButtonContainer = styled.Pressable`
  margin-top: ${props => props.theme.spacing.default};
`;

export const ChangeStudentDialog = ({ onDismiss }: { onDismiss: () => void }) => {
  const [visible, setVisible] = useState(true); // or false to control visibility externally

  const handleStudentChange = () => {
    console.log("학생 선택 clicked");
    onDismiss();
  };


  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss} // Android back
    >
      <CenteredOverlay onPress={onDismiss}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <DialogBox>
            <Text style={{ marginBottom: 10, fontSize: 16 }}>현재 학생을 변경하시겠습니까?</Text>
            <ButtonContainer onPress={handleStudentChange}>
              <ButtonTextTheme>학생 선택</ButtonTextTheme>
            </ButtonContainer>
          </DialogBox>
        </Pressable>
      </CenteredOverlay>
    </Modal>
  );
};


export const StudentList = () => {

  const { user } = useSession();
  const { students, fetchStudents, loading, error } = useStudents();

  useEffect(() => {
    if (user?.userId) {
      fetchStudents(user?.userId);
    }
  }, [user])

  return (
    <>
      {loading && (
        <ActivityIndicator />
      )}
      {!loading && students && students.map((student) => {
        return (
          // TODO : Student List Styling 
          <View key={student.id}>
            <StudentAvatar url={student.imagesrc} width={24} height={24} style="full" />
            <Text >
              {student.name}
            </Text>
          </View>
        )
      }
      )}
      {error && (
        <ErrorText>{error}</ErrorText>
      )}

    </>
  )
}
