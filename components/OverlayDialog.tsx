import { PropsWithChildren, useState } from "react";
import { Modal, Pressable } from "react-native";
import { ButtonTextTheme } from "./ThemedText";
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
  border-radius: ${props => props.theme.radii.xl};
  width: 80%;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 4;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ModalButton = styled.Pressable`
  margin-top: ${props => props.theme.spacing.default};
  height: fit-content;
  padding: ${props => props.theme.spacing.small};
`;

type DialogProps = {
  onDismiss: () => void;
  buttons?: {
    text: string;
    onPress: () => void;
  }[];
  visible: boolean;
} & PropsWithChildren;



export const OverlayDialog = ({ children, onDismiss, buttons, visible }: DialogProps) => {
  const handlePress = (cb: () => void) => {
    cb()
  }

  const handleDismiss = () => {
    onDismiss();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleDismiss}
    >
      <CenteredOverlay onPress={onDismiss}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <DialogBox>
            {children}
            <ButtonContainer>
              {buttons && buttons.map((button) => (
                <ModalButton key={button.text} onPress={() => handlePress(button.onPress)}>
                  <ButtonTextTheme>{button.text}</ButtonTextTheme>
                </ModalButton>)
              )}
            </ButtonContainer>
          </DialogBox>
        </Pressable>
      </CenteredOverlay>
    </Modal>
  );
};


