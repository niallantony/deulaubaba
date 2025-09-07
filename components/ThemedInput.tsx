import { StyleSheet, TextInput, View, type TextInputProps } from "react-native";
import { InfoLabel } from "./ThemedText";
import { theme } from "@/themes/global";

export type ThemedTextInputProps = {
  label: string;
  value?: string;
  onChange: (text: string) => void;
} & Omit<TextInputProps, 'onChange' | 'value'>;

export type ThemedTextAreaProps = {
  label: string;
  value?: string;
  onChange: (text: string) => void;
  error?: boolean;
  height: number;
} & Omit<TextInputProps, 'onChange' | 'value'>;

export type ThemedTwinInputProps = {
  position: "left" | "right";
} & ThemedTextInputProps




export const ThemedTextInput = ({ label, value, onChange, ...rest }: ThemedTextInputProps) => {
  return (
    <View style={styles.container}>
      <InfoLabel>{label}</InfoLabel>
      <TextInput style={[
        styles.common,
        styles.text,
      ]}
        accessibilityLabel={label}
        textAlignVertical={"center"}
        value={value}
        onChangeText={onChange}
        {...rest}
      />
    </View>
  )

}

export const ThemedTextArea = ({ label, value, onChange, error, height, ...rest }: ThemedTextAreaProps) => {
  return (
    <View style={styles.container}>
      <InfoLabel>{label}</InfoLabel>
      <TextInput
        accessibilityLabel={label}
        textAlignVertical={"top"}
        value={value}
        multiline={true}
        onChangeText={onChange}
        style={[
          styles.common,
          styles.textArea,
          error ? styles.error : null,
          { height: height * 32 }
        ]}
        {...rest}
      />
    </View>
  )

}

export const ThemedTwinInput = ({ position, label, value, onChange, ...rest }: ThemedTwinInputProps) => {
  return (
    <View style={[
      styles.container,
      position === "left" ? styles.left : null,
      styles.twin
    ]}>
      <InfoLabel>{label}</InfoLabel>
      <TextInput style={[
        styles.common,
        styles.text,
      ]}
        accessibilityLabel={label}
        textAlignVertical={"center"}
        value={value}
        onChangeText={onChange}
        {...rest}
      />
    </View>
  )

}

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

