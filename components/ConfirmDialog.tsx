import { View } from "react-native"
import { RowButtonContainer } from "./ButtonContainer"
import { CenteredOverlay } from "./CenteredOverlay"
import { ThemedButton } from "./ThemedButton"
import { StyledText } from "./ThemedText"

export const ConfirmDialog = ({ onConfirm, text, onClose, confirmText = "확인" }: {
  onConfirm: () => void,
  text: string,
  onClose: () => void,
  confirmText?: string,
}) => {

  return (
    <CenteredOverlay>
      <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center', }}>
        <StyledText>{text}</StyledText>
        <RowButtonContainer>
          <ThemedButton
            text={confirmText}
            row={true}
            type="green"
            onPress={onConfirm}
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
