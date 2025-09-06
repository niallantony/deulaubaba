import { theme } from "@/themes/global";
import { PropsWithChildren } from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";

const DialogBox = ({ children }: PressableProps) => (
  <Pressable onPress={(e) => e.stopPropagation()} accessibilityViewIsModal style={styles.dialogBox}>
    {children}
  </Pressable>
);

export const CenteredOverlay = ({ children }: PropsWithChildren) => {
  return (
    <DialogBox>
      {children}
    </DialogBox>
  )

}

const styles = StyleSheet.create({
  centeredOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    width: '100%',
  },
  dialogBox: {
    backgroundColor: theme.colors.inputs,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
});

