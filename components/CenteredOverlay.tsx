import { theme } from "@/themes/global";
import { PropsWithChildren } from "react";
import { Pressable, PressableProps, StyleSheet, View, ViewProps } from "react-native";

const Overlay = ({ children, onPress }: PressableProps) => (
  <Pressable style={styles.centeredOverlay} onPress={onPress}>
    {children}
  </Pressable>
);

const DialogBox = ({ children }: ViewProps) => (
  <View style={styles.dialogBox}>
    {children}
  </View>
);

export const CenteredOverlay = ({ children, onDismiss }: { onDismiss: () => void } & PropsWithChildren) => {
  return (
    <Overlay onPress={onDismiss}>
      <Pressable onPress={(e) => e.stopPropagation()}>
        <DialogBox>
          {children}
        </DialogBox>
      </Pressable>
    </Overlay>
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

