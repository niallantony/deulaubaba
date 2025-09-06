import { theme } from "@/themes/global";
import { Pressable, PressableProps, StyleSheet } from "react-native";

export const CenteredOverlay = ({ children }: PressableProps) => {
  return (
    <Pressable onPress={(e) => e.stopPropagation()} accessibilityViewIsModal style={styles.dialogBox}>
      {children}
    </Pressable>
  )

}

const styles = StyleSheet.create({
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

