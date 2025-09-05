import { theme } from "@/themes/global";
import { PropsWithChildren } from "react";
import { Modal, Pressable, PressableProps, StyleSheet, View, ViewProps } from "react-native";


export const CenteredOverlay = ({ children, onPress }: PressableProps) => (
  <Pressable style={styles.centeredOverlay} onPress={onPress}>
    {children}
  </Pressable>
);

export const DialogBox = ({ children }: ViewProps) => (
  <View style={styles.dialogBox}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  centeredOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  dialogBox: {
    backgroundColor: theme.colors.inputs,
    padding: 24,
    borderRadius: 16,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
});


type DialogProps = {
  onDismiss: () => void;
  visible: boolean;
} & PropsWithChildren;



export const OverlayDialog = ({ children, onDismiss, visible }: DialogProps) => {

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
          </DialogBox>
        </Pressable>
      </CenteredOverlay>
    </Modal>
  );
};


