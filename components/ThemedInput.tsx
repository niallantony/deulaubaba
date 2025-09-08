import { StyleSheet, TextInput, View, type TextInputProps } from "react-native";
import { ErrorText, InfoLabel } from "./ThemedText";
import { theme } from "@/themes/global";

type ThemedInputProps = {
  label: string;
  value?: string;
  onChange: (text: string) => void;
  error?: string;
  variant?: "default" | "textarea" | "twin";
  twinPosition?: "left" | "right";
  rows?: number;
} & Omit<TextInputProps, "onChange" | "value">;

export const ThemedInput = ({
  label,
  error,
  value,
  onChange,
  variant = "default",
  twinPosition,
  rows,
  ...rest
}: ThemedInputProps) => {
  const isTextArea = variant === "textarea";
  const isTwin = variant === "twin";

  return (
    <View
      testID="container"
      style={[
        styles.container,
        isTwin && styles.twin,
        isTwin && twinPosition === "left" && styles.left,
      ]}
    >
      <InfoLabel>{label}</InfoLabel>
      <TextInput
        accessibilityLabel={label}
        textAlignVertical={isTextArea ? "top" : "center"}
        value={value}
        onChangeText={onChange}
        multiline={isTextArea}
        style={[
          styles.common,
          isTextArea && styles.textArea,
          error && styles.error,
          isTextArea && rows ? { height: rows * 32 } : null,
        ]}
        {...rest}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </View>
  );
};

export const ThemedTextInput = (props: ThemedInputProps) => (
  <ThemedInput variant="default" {...props} />
);

export const ThemedTextArea = (props: ThemedInputProps) => (
  <ThemedInput variant="textarea" {...props} />
);

export const ThemedTwinInput = (props: ThemedInputProps) => (
  <ThemedInput variant="twin" {...props} />
);



const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  twin: {
    flex: 1,
  },
  left: {
    marginRight: 12,
  },
  common: {
    backgroundColor: theme.colors.inputs,
    fontSize: theme.fontSizes.md,
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
  },
  text: {

  },
  textArea: {
    width: "100%"
  },
  error: {
    borderWidth: 1,
    borderColor: theme.colors.error
  },
})

