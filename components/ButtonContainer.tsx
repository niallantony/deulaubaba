import { StyleSheet, View } from "react-native";
import { theme } from "@/themes/global";
import { ReactNode } from "react";

export const RowButtonContainer = ({ children }: { children: ReactNode }) => (
  <View style={styles.row}>
    {children}
  </View>
);

export const ButtonContainer = ({
  width = 150,
  children,
}: {
  width?: number;
  children: ReactNode;
}) => {

  return (
    <View
      style={styles.outer}
      testID="outer-view"
    >
      <View style={{ width }} testID="inner-view">{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 12,
  },
  outer: {
    width: "100%",
    marginVertical: 24,
    alignItems: 'center',
  },
});
