import { RowButtonContainer } from "@/components/ButtonContainer"
import { CenteredOverlay } from "@/components/CenteredOverlay"
import { ThemedButton } from "@/components/ThemedButton"
import { theme } from "@/themes/global"
import { StyleSheet, Text, View } from "react-native"

// TODO: Check Korean
export const ChangeStatusModal = ({
  onChange,
  onClose,
  isCompleted,
}: {
  onChange: () => void,
  onClose: () => void,
  isCompleted: boolean
}) => {
  return (
    <CenteredOverlay>
      <View style={styles.container}>
        <Text style={styles.text}>
          {isCompleted ? "프로젝트를 완료하지 않은 상태로 바뀔까요?" : "프로젝트를 완료한 상태로 바뀔까요?"}
        </Text>
        <RowButtonContainer>

          <ThemedButton
            text="확인"
            row={true}
            onPress={onChange}
          />
          <ThemedButton
            text="취소"
            row={true}
            type="outline"
            onPress={onClose}
          />
        </RowButtonContainer>
      </View>
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
    color: theme.colors.light
  }
})
