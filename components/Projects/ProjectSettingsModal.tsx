import { StyleSheet, Text, View } from "react-native"
import { CenteredOverlay } from "../CenteredOverlay"
import { ThemedButton } from "../ThemedButton"
import { useState } from "react";
import { RowButtonContainer } from "../ButtonContainer";
import { theme } from "@/themes/global";

export const ProjectSettingsModal = ({
  onEdit,
  onDelete,
  onAddUser,
}: {
  onEdit: () => void,
  onDelete: () => void,
  onAddUser: () => void,
}) => {
  const [deleteScreen, setDeleteScreen] = useState(false);

  return (
    <CenteredOverlay>
      {deleteScreen ? (
        <View style={styles.container}>
          <Text style={styles.text}>정말 프로젝트 삭제하겠습니까?</Text>
          <RowButtonContainer>
            <ThemedButton type="green" text="삭제" onPress={onDelete} row={true} />
            <ThemedButton type="outline" text="취소" onPress={() => setDeleteScreen(false)} row={true} />
          </RowButtonContainer>
        </View>

      ) : (
        <View>
          <ThemedButton type="bare" text="프로젝트 수정" onPress={onEdit} />
          <ThemedButton type="bare" text="팀구성원 추가" onPress={onAddUser} />
          <ThemedButton type="red" text="프로젝트 삭제" onPress={() => setDeleteScreen(true)} />
        </View>
      )}
    </CenteredOverlay>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignItems: 'center'

  },
  text: {
    fontSize: 16,
    marginBottom: 14,
    color: theme.colors.error
  }
})
